import { NextRequest, NextResponse } from 'next/server';
import formidable from 'formidable';

export const config = {
  api: {
    bodyParser: false, // disable Next.js built-in body parsing for file upload
  },
};

const uploadDir = './public/uploads';

export async function POST(request: NextRequest) {
  const form = formidable({
    uploadDir,
    keepExtensions: true,
    filename: (_originalName, _ext, part) =>
      `${part.originalFilename?.split('.')[0] ?? 'file'}-${Date.now()}.${part.mimetype?.split('/')[1] ?? 'dat'}`,
  });

  // Promisify formidable parse
  const data = await new Promise<{ fields: formidable.Fields; files: formidable.Files }>((resolve, reject) => {
    form.parse(request as unknown as any, (err, fields, files) => {
      if (err) reject(err);
      else resolve({ fields, files });
    });
  });

  // Access files (assuming input named "file")
  const file = data.files.file;

  if (!file) {
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
  }

  // If multiple files, get the first
  const uploadedFile = Array.isArray(file) ? file[0] : file;

  return NextResponse.json({
    message: 'File uploaded successfully',
    filePath: uploadedFile.filepath,
  });
}
