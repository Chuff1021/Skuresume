import mammoth from "mammoth";

// POST /api/extract — accepts a PDF / DOCX / TXT resume file (multipart/form-data
// field name "file") and returns extracted plain text. Used by the AI Quick
// Start flow so the user can drop in their current resume and get a populated
// new resume in one click.
//
// Runs on Node (not Edge) because pdfjs-dist and mammoth both need Node APIs.

export const runtime = "nodejs";
export const maxDuration = 30;

const MAX_BYTES = 10 * 1024 * 1024; // 10MB — plenty for any sane resume

async function extractPdf(bytes: Uint8Array): Promise<string> {
  // unpdf is a pdfjs fork tuned for serverless / Node — no worker setup needed.
  const { extractText, getDocumentProxy } = await import("unpdf");
  const pdf = await getDocumentProxy(bytes);
  const { text } = await extractText(pdf, { mergePages: true });
  return text.replace(/\r\n/g, "\n").replace(/[ \t]+\n/g, "\n").replace(/\n{3,}/g, "\n\n").trim();
}

async function extractDocx(bytes: Buffer): Promise<string> {
  const result = await mammoth.extractRawText({ buffer: bytes });
  return result.value.replace(/\r\n/g, "\n").replace(/\n{3,}/g, "\n\n").trim();
}

function extFor(name: string, mime: string): "pdf" | "docx" | "txt" | null {
  const lower = name.toLowerCase();
  if (mime === "application/pdf" || lower.endsWith(".pdf")) return "pdf";
  if (
    mime === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    lower.endsWith(".docx")
  ) return "docx";
  if (mime.startsWith("text/") || lower.endsWith(".txt") || lower.endsWith(".md")) return "txt";
  return null;
}

export async function POST(request: Request) {
  try {
    const form = await request.formData();
    const file = form.get("file");
    if (!(file instanceof File)) {
      return Response.json({ error: "Upload a file under the 'file' field." }, { status: 400 });
    }
    if (file.size > MAX_BYTES) {
      return Response.json({ error: "File is too large (limit 10MB)." }, { status: 413 });
    }
    const kind = extFor(file.name, file.type);
    if (!kind) {
      return Response.json(
        { error: "Unsupported file. Upload a PDF, DOCX, or TXT file." },
        { status: 415 }
      );
    }

    const buf = Buffer.from(await file.arrayBuffer());

    let text = "";
    if (kind === "pdf") {
      text = await extractPdf(new Uint8Array(buf));
    } else if (kind === "docx") {
      text = await extractDocx(buf);
    } else {
      text = buf.toString("utf8");
    }

    text = text.trim();
    if (!text) {
      return Response.json(
        { error: "Couldn't read any text out of that file. If it's a scanned PDF, try exporting a text version." },
        { status: 422 }
      );
    }

    return Response.json({ text, bytes: buf.length, kind });
  } catch (err) {
    console.error("Extract failed:", err);
    return Response.json(
      { error: "Extraction failed. Try a different export format." },
      { status: 500 }
    );
  }
}
