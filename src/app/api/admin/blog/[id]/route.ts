import { revalidatePath } from 'next/cache';
import fs from 'node:fs/promises';
import path from 'path';
import { NextResponse, NextRequest } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface ParagraphInput {
  mongoId: string | null;
  content: string;
  imagePosition: 'LEFT' | 'RIGHT' | 'CENTER'; // Adjust as per your schema enum
  image?: string | null;
}

interface SectionInput {
  mongoId: string;
  subheader: string;
  paragraphs: ParagraphInput[];
}

type SectionsInput = SectionInput[];

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const formData = await req.formData();
    console.log('FormData received:', formData);

    const title = formData.get('title') as string;
    const sections: SectionsInput = JSON.parse(formData.get('sections') as string);

    await Promise.all(
      Array.from(formData.entries()).map(async ([key, value]) => {
        if (key.startsWith('images[')) {
          const file = value as File;
          console.log(`Received image: ${file.name}, size: ${file.size}, type: ${file.type}`);

          const match = key.match(/\[([a-fA-F0-9]{16,24}|\d+(\.\d+)?)-([a-fA-F0-9]{16,24}|\d+(\.\d+)?)\]/);
          if (!match) return;

          const [, sectionId, paragraphId] = match;
          console.log(`Found sectionId: ${sectionId}, paragraphId: ${paragraphId}`);

          const arrayBuffer = await file.arrayBuffer();
          const buffer = Buffer.from(arrayBuffer);

          const filePath = path.join(process.cwd(), 'public', 'uploads', file.name);
          await fs.mkdir(path.dirname(filePath), { recursive: true });
          await fs.writeFile(filePath, buffer);

          const fileExists = await fs.stat(filePath);
          console.log(`File exists: ${fileExists.isFile() ? 'Yes' : 'No'}`);

          const sectionIndex = sections.findIndex((section) => section.mongoId === sectionId);
          if (sectionIndex === -1) {
            console.error('Section not found');
            return;
          }

          const paragraphIndex = sections[sectionIndex].paragraphs.findIndex((paragraph) => {
            return paragraph.mongoId === paragraphId || paragraph.mongoId === null;
          });

          if (paragraphIndex === -1) {
            console.error('Paragraph not found');
            return;
          }

          const targetParagraph = sections[sectionIndex].paragraphs[paragraphIndex];
          console.log('Before assignment:', targetParagraph);

          if (!targetParagraph.image) {
            targetParagraph.image = `/uploads/${file.name}`;
          }

          console.log('After assignment:', targetParagraph);
        }
      })
    );

    console.log('Sections after image assignment:', JSON.stringify(sections, null, 2));

    const newBlogPost = await prisma.blogPost.create({
      data: {
        title,
        sections: {
          create: sections.map((section) => ({
            subheader: section.subheader,
            paragraphs: {
              create: section.paragraphs.map((paragraph) => ({
                content: paragraph.content,
                imagePosition: paragraph.imagePosition.toUpperCase() as 'LEFT' | 'RIGHT' | 'CENTER',
                image: paragraph.image || null,
              })),
            },
          })),
        },
      },
    });

    console.log('New blog post created:', newBlogPost);

    await prisma.$transaction(async (prisma) => {
      await prisma.paragraph.deleteMany({
        where: {
          section: { blogPostId: id },
        },
      });

      await prisma.section.deleteMany({
        where: { blogPostId: id },
      });

      await prisma.blogPost.delete({
        where: { id },
      });
    });

    console.log('Old blog post deleted:', id);

    revalidatePath('/');

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
      where: { id },
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
    await prisma.$transaction(async (prisma) => {
      await prisma.paragraph.deleteMany({
        where: {
          section: { blogPostId: id },
        },
      });

      await prisma.section.deleteMany({
        where: { blogPostId: id },
      });

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


