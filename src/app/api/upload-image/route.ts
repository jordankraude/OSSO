import { NextRequest } from "next/server";
import { createRouter } from "next-connect";
import formidable from "formidable";
import { IncomingMessage, ServerResponse } from "http";
import { File as FormidableFile, Files, Fields } from "formidable";

const uploadDir = './public/uploads';

// --- Define proper types ---
interface IncomingMessageWithFiles extends IncomingMessage {
  files?: Files;
  fields?: Fields;
}

// --- Router setup ---
const router = createRouter<IncomingMessageWithFiles, ServerResponse>();

// --- Middleware ---
const uploadMiddleware = (
  req: IncomingMessageWithFiles,
  res: ServerResponse,
  next: () => void
) => {
  const form = new formidable.IncomingForm({
    uploadDir,
    keepExtensions: true,
    filename: (_originalName, _ext, part) =>
      `${part.originalFilename?.split('.')[0] ?? 'file'}-${Date.now()}.${part.mimetype?.split('/')[1] ?? 'dat'}`
  });

  form.parse(req, (err, fields, files) => {
    if (err) {
      res.statusCode = 500;
      res.end(JSON.stringify({ error: "File upload failed", details: err }));
    } else {
      req.files = files;
      req.fields = fields;
      next();
    }
  });
};

router.use(uploadMiddleware);

// --- POST handler ---
router.post((req: IncomingMessageWithFiles, res: ServerResponse) => {
  const files = req.files;

  if (files && files.file && Array.isArray(files.file)) {
    const filePath = (files.file[0] as FormidableFile).filepath;
    res.statusCode = 200;
    res.end(JSON.stringify({ message: "File uploaded successfully", filePath }));
  } else {
    res.statusCode = 400;
    res.end(JSON.stringify({ error: "No file uploaded" }));
  }
});

// --- API route function ---
export async function POST(request: NextRequest) {
  const req = request as unknown as IncomingMessageWithFiles;

  const res = {
    statusCode: 200,
    statusMessage: '',
    end: (data: string) => {
      console.log(data);
    },
  } as ServerResponse;

  return router.run(req, res);
}
