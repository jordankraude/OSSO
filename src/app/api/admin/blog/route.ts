import { revalidatePath } from 'next/cache';
import fs from 'node:fs/promises';
import path from 'path';
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface BlogParagraph {
  content: string;
  imagePosition: string;
  image?: string | null;
}

interface BlogSection {
  subheader: string;
  paragraphs: BlogParagraph[];
}

export async function GET() {
  try {
    const blogPosts = await prisma.blogPost.findMany();
    return NextResponse.json(blogPosts);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch blog posts' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const title = formData.get('title') as string;
    const sections: BlogSection[] = JSON.parse(formData.get('sections') as string);

    await Promise.all(
      Array.from(formData.entries()).map(async ([key, value]: [string, FormDataEntryValue]) => {
        if (key.startsWith('images[') && value instanceof File) {
          const file = value;

          const match = key.match(/\[(\d+)-(\d+)\]/);
          if (!match) return;

          const [, sectionIdStr, paragraphIdStr] = match;
          const sectionIndex = parseInt(sectionIdStr, 10) - 1;
          const paragraphIndex = parseInt(paragraphIdStr, 10) - 1;

          const arrayBuffer = await file.arrayBuffer();
          const buffer = Buffer.from(arrayBuffer);
          const filePath = path.join(process.cwd(), 'public', 'uploads', file.name);
          await fs.writeFile(filePath, buffer);

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

    const blogPost = await prisma.blogPost.create({
      data: {
        title,
        sections: {
          create: sections.map((section) => ({
            subheader: section.subheader,
            paragraphs: {
              create: section.paragraphs.map((paragraph) => ({
                content: paragraph.content,
                imagePosition: paragraph.imagePosition.toUpperCase(),
                image: paragraph.image || null,
              })),
            },
          })),
        },
      },
    });

    console.log('Data saved to Prisma:', blogPost);

    revalidatePath('/');
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
