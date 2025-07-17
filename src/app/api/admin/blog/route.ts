import { revalidatePath } from 'next/cache';
import fs from 'node:fs/promises';
import path from 'path';
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Fetch all blog posts from the database
    const blogPosts = await prisma.blogPost.findMany();

    // Return the blog posts in the response using NextResponse
    return NextResponse.json(blogPosts);
  } catch (error) {
    // Handle any errors and return a proper error response
    return NextResponse.json({ error: 'Failed to fetch blog posts' }, { status: 500 });
  }
}


export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const title = formData.get('title') as string;
    const sections = JSON.parse(formData.get('sections') as string);

    // Handle image uploads and map images to paragraphs
    await Promise.all(
      Array.from(formData.entries()).map(async ([key, value]) => {
        if (key.startsWith('images[')) {
          const file = value as File;

          // Extract sectionId and paragraphId from the key (e.g., images[1-1])
          const match = key.match(/\[(\d+)-(\d+)\]/);
          if (!match) return; // Skip invalid keys

          const [, sectionId, paragraphId] = match;

          // Upload the image
          const arrayBuffer = await file.arrayBuffer();
          const buffer = Buffer.from(arrayBuffer);

          const filePath = path.join(process.cwd(), 'public', 'uploads', file.name);
          await fs.writeFile(filePath, buffer);

          // Assign the image path to the correct paragraph
          const sectionIndex = parseInt(sectionId, 10) - 1; // Convert 1-based index to 0-based
          const paragraphIndex = parseInt(paragraphId, 10) - 1;

          if (
            sections[sectionIndex] &&
            sections[sectionIndex].paragraphs[paragraphIndex]
          ) {
            sections[sectionIndex].paragraphs[paragraphIndex].image = `/uploads/${file.name}`;
          }
        }
      })
    );

    console.log('Sections after image assignment:', JSON.stringify(sections, null, 2));

    // Save the blog post to the database using Prisma
    const blogPost = await prisma.blogPost.create({
      data: {
        title,
        sections: {
          create: sections.map((section: any) => ({
            subheader: section.subheader,
            paragraphs: {
              create: section.paragraphs.map((paragraph: any) => ({
                content: paragraph.content,
                imagePosition: paragraph.imagePosition.toUpperCase(), // Ensure it matches the enum
                image: paragraph.image || null,
              })),
            },
          })),
        },
      },
    });

    console.log('Data saved to Prisma:', blogPost);

    revalidatePath('/'); // Optional path revalidation
    return NextResponse.json({ status: 'success', data: blogPost });
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.error(e.message);
      return NextResponse.json({ status: 'fail', error: e.message });
    } else {
      console.error('Unknown error occurred:', e);
      return NextResponse.json({ status: 'fail', error: 'Unknown error occurred' });
    }
  }
}
