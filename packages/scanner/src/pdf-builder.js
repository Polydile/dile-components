// Joins the scanned pages (JPEG) into a PDF. jsPDF embeds each JPEG as it is
// (DCTDecode), without encoding it again, so the PDF weighs about the same as
// the sum of its pages.
//
// Each PDF page takes the proportions of its image (a receipt stays narrow
// instead of being stretched to A4). The physical size is computed at
// PAGE_DPI, so a full-width scan of an A4 page prints at roughly A4 size.

const PAGE_DPI = 170;
const POINTS_PER_INCH = 72;

export async function buildPdf(pages, filename) {
  const { jsPDF } = await import("jspdf");
  let pdf;
  for (const page of pages) {
    const width = (page.width * POINTS_PER_INCH) / PAGE_DPI;
    const height = (page.height * POINTS_PER_INCH) / PAGE_DPI;
    const orientation = width > height ? "landscape" : "portrait";
    if (pdf) {
      pdf.addPage([width, height], orientation);
    } else {
      pdf = new jsPDF({ unit: "pt", format: [width, height], orientation });
    }
    const bytes = new Uint8Array(await page.blob.arrayBuffer());
    pdf.addImage(bytes, "JPEG", 0, 0, width, height, undefined, "NONE");
  }
  return new File([pdf.output("blob")], filename, {
    type: "application/pdf",
    lastModified: Date.now(),
  });
}
