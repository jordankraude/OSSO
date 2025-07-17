import { revalidatePath } from 'next/cache';
import fs from 'node:fs/promises';
import path from 'path';
import { NextResponse, NextRequest } from 'next/server';
import { PrismaClient } from '@prisma/client'; // Assuming prisma is set up


const prisma = new PrismaClient();

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const formData = await req.formData();
    console.log('FormData received:', formData);

    const title = formData.get('title') as string;
    const sections = JSON.parse(formData.get('sections') as string);

    // Handle image uploads and map images to paragraphs
    await Promise.all(
      Array.from(formData.entries()).map(async ([key, value]) => {
        if (key.startsWith('images[')) {
          const file = value as File;
          console.log(`Received image: ${file.name}, size: ${file.size}, type: ${file.type}`);

          // Extract sectionId and paragraphId from the key (e.g., images[1-1])
          const match = key.match(/\[([a-fA-F0-9]{16,24}|\d+(\.\d+)?)-([a-fA-F0-9]{16,24}|\d+(\.\d+)?)\]/);
          if (!match) return; // Skip invalid keys
          

          // finds correct match
          const [, sectionId, paragraphId] = match;
          console.log(`Found sectionId: ${sectionId}, paragraphId: ${paragraphId}`);          
          console.log(`Processing image for section ${sectionId}, paragraph ${paragraphId}`);

          // Upload the image
          const arrayBuffer = await file.arrayBuffer();
          const buffer = Buffer.from(arrayBuffer);

          const filePath = path.join(process.cwd(), 'public', 'uploads', file.name);
          console.log(`Saving image to: ${filePath}`);

          // Ensure the uploads directory exists before writing the file
          await fs.mkdir(path.dirname(filePath), { recursive: true });

          await fs.writeFile(filePath, buffer);

          // Verify the image file is saved
          const fileExists = await fs.stat(filePath);
          console.log(`File exists: ${fileExists.isFile() ? 'Yes' : 'No'}`);

          // Assign the image path to the correct paragraph
          const sectionIndex = sections.findIndex((section: any) => section.mongoId === sectionId);
          if (sectionIndex === -1) {
            console.error('Section not found');
            return;
          }

          const paragraphIndex = sections[sectionIndex]?.paragraphs?.findIndex((paragraph: any) => {
            // If the paragraph mongoId is null, treat it as the correct paragraph based on index
            return paragraph.mongoId === paragraphId || paragraph.mongoId === null;
          });

          if (paragraphIndex === -1) {
            console.error('Paragraph not found');
            return;
          }
          console.log(paragraphIndex)

          // Log before assignment
          console.log('Before assignment:', sections[sectionIndex].paragraphs[paragraphIndex]);
          // If the paragraph doesn't have an image, assign the new image
          if (!sections[sectionIndex].paragraphs[paragraphIndex].image) {
            sections[sectionIndex].paragraphs[paragraphIndex].image = `/uploads/${file.name}`;
          }
          // Log after assignment
          console.log('After assignment:', sections[sectionIndex].paragraphs[paragraphIndex]);
        }
      })
    );

    console.log('Sections after image assignment:', JSON.stringify(sections, null, 2));

    // Create a new blog post
    const newBlogPost = await prisma.blogPost.create({
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

    console.log('New blog post created:', newBlogPost);

    // Delete the old blog post (and its associated data) after the new one is created
    await prisma.$transaction(async (prisma) => {
      // Delete paragraphs related to the old blog post
      await prisma.paragraph.deleteMany({
        where: {
          section: {
            blogPostId: id,
          },
        },
      });

      // Delete sections related to the old blog post
      await prisma.section.deleteMany({
        where: {
          blogPostId: id,
        },
      });

      // Delete the old blog post
      await prisma.blogPost.delete({
        where: { id },
      });
    });

    console.log('Old blog post deleted:', id);

    // Optional: Revalidate paths
    revalidatePath('/');

    // Respond with the new blog post data
    return NextResponse.json({ status: 'success', data: newBlogPost });
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

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;
  
    try {
        const blogPost = await prisma.blogPost.findUnique({
            where: { id: id },
            include: {
              sections: {
                include: {
                  paragraphs: true,
                },
              },
            },
          });
      if (!blogPost) {
        return NextResponse.json({ error: 'Blog post not found' }, { status: 404 });
      }
  
      return NextResponse.json(blogPost, { status: 200 });
    } catch (error) {
      console.error('Error fetching blog post:', error);
      return NextResponse.json({ error: 'Failed to fetch blog post' }, { status: 500 });
    }
  }

  
  export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    const { id } = params;
  
    try {
      // Start a transaction
      await prisma.$transaction(async (prisma) => {
        // Delete all paragraphs related to this blog post
        await prisma.paragraph.deleteMany({
          where: {
            section: {
              blogPostId: id,
            },
          },
        });
  
        // Delete all sections related to this blog post
        await prisma.section.deleteMany({
          where: {
            blogPostId: id,
          },
        });
  
        // Delete the blog post itself
        await prisma.blogPost.delete({
          where: { id },
        });
      });
  
      return NextResponse.json({ message: 'Blog post deleted successfully!' }, { status: 200 });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: 'Failed to delete blog post', details: error }, { status: 500 });
    }
  }
  


