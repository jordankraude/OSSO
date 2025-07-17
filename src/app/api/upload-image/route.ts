import { NextRequest, NextResponse } from "next/server";
import { createRouter } from "next-connect";
import formidable, { IncomingForm } from "formidable";
import { IncomingMessage, ServerResponse } from "http";

// Define the upload directory
const uploadDir = './public/uploads';

// Extend IncomingMessage to include files and fields
interface IncomingMessageWithFiles extends IncomingMessage {
  files?: any; // Add the 'files' property that formidable attaches
  fields?: any; // Add the 'fields' property that formidable attaches
}

// Create the router with createRouter
const router = createRouter<IncomingMessageWithFiles, ServerResponse>();

// Middleware to handle the file upload using formidable
const uploadMiddleware = (req: IncomingMessageWithFiles, res: ServerResponse, next: () => void) => {
  const form = new formidable.IncomingForm({
    uploadDir,
    keepExtensions: true,
    filename: (name, ext) => `${name}-${Date.now()}${ext}`,
  });

  // Parse the form and call next() once done
  form.parse(req, (err, fields, files) => {
    if (err) {
      res.statusCode = 500;
      res.end(JSON.stringify({ error: "File upload failed", details: err }));
    } else {
      // Attach the parsed fields and files to the request object
      req.files = files;
      req.fields = fields;
      next(); // Call the next handler in the chain
    }
  });
};

// Use the middleware in your router
router.use(uploadMiddleware);

// Define POST handler
router.post((req: IncomingMessageWithFiles, res: ServerResponse) => {
  const files = req.files;
  if (files && files.file) {
    const filePath = files.file[0].filepath;
    res.statusCode = 200;
    res.end(JSON.stringify({ message: 'File uploaded successfully', filePath }));
  } else {
    res.statusCode = 400;
    res.end(JSON.stringify({ error: 'No file uploaded' }));
  }
});

// Function to handle POST requests
export async function POST(request: NextRequest) {
  // Convert NextRequest to IncomingMessage (for compatibility with formidable)
  const req = request as unknown as IncomingMessageWithFiles;

  // Create a native Node.js response object
  const res = {
    statusCode: 200,
    statusMessage: '',
    setHeader: (name: string, value: string) => {},
    end: (data: string) => {
      console.log(data); // You can handle the response data here
    },
  } as ServerResponse;

  return router.run(req, res);
}
