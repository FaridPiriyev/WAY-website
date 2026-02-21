export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";

const jsonPath = path.join(process.cwd(), "certificate", "id.json");

export async function GET() {
  try {
    if (!fs.existsSync(jsonPath)) return NextResponse.json([]);
    const fileContent = fs.readFileSync(jsonPath, "utf8");
    const certificates = JSON.parse(fileContent || "[]");
    return NextResponse.json(certificates);
  } catch (error) {
    return NextResponse.json([]);
  }
}

export async function POST(req) {
  try {
    const data = await req.formData();
    const id = data.get("id");
    const fullName = data.get("fullName");
    const project = data.get("project");
    const issueDate = data.get("issueDate");
    const pdfFile = data.get("pdf");
    const qrFile = data.get("qr");

    const pdfDir = path.join(process.cwd(), "public", "pdf");
    const qrDir = path.join(process.cwd(), "public", "qr");
    if (!fs.existsSync(pdfDir)) fs.mkdirSync(pdfDir, { recursive: true });
    if (!fs.existsSync(qrDir)) fs.mkdirSync(qrDir, { recursive: true });
    const pdfBuffer = Buffer.from(await pdfFile.arrayBuffer());
    const qrBuffer = Buffer.from(await qrFile.arrayBuffer());
    fs.writeFileSync(path.join(pdfDir, `${id}.pdf`), pdfBuffer);
    fs.writeFileSync(path.join(qrDir, `${id}.png`), qrBuffer);

    let certificates = [];
    if (fs.existsSync(jsonPath)) {
      const content = fs.readFileSync(jsonPath, "utf8");
      certificates = JSON.parse(content || "[]");
    }

    const newCert = {
      id,
      fullName,
      project,
      issueDate,
      status: "Valid",
      pdf: `/pdf/${id}.pdf`,
      qrCode: `/qr/${id}.png`,
    };

    certificates.push(newCert);
    fs.writeFileSync(jsonPath, JSON.stringify(certificates, null, 2));

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    const data = await req.formData();
    const id = data.get("id");
    const fullName = data.get("fullName");
    const project = data.get("project");
    const issueDate = data.get("issueDate");
    const pdfFile = data.get("pdf"); 
    const qrFile = data.get("qr");

    let certs = JSON.parse(fs.readFileSync(jsonPath, "utf8") || "[]");
    const certIndex = certs.findIndex((c) => c.id === id);

    if (certIndex === -1)
      return NextResponse.json({ message: "Tapılmadı" }, { status: 404 });


    const pdfDir = path.join(process.cwd(), "public", "pdf");
    const qrDir = path.join(process.cwd(), "public", "qr");

    if (pdfFile && typeof pdfFile !== "string") {
      const pdfBuffer = Buffer.from(await pdfFile.arrayBuffer());
      fs.writeFileSync(path.join(pdfDir, `${id}.pdf`), pdfBuffer);
    }

    if (qrFile && typeof qrFile !== "string") {
      const qrBuffer = Buffer.from(await qrFile.arrayBuffer());
      fs.writeFileSync(path.join(qrDir, `${id}.png`), qrBuffer);
    }

    certs[certIndex] = {
      ...certs[certIndex],
      fullName,
      project,
      issueDate,
    };

    fs.writeFileSync(jsonPath, JSON.stringify(certs, null, 2));
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}


export async function DELETE(req) {
  try {
    const { id } = await req.json();
    if (!fs.existsSync(jsonPath)) return NextResponse.json({ success: false });

    let certificates = JSON.parse(fs.readFileSync(jsonPath, "utf8") || "[]");


    const certToDelete = certificates.find((c) => c.id === id);
    if (certToDelete) {
      const pdfFilePath = path.join(process.cwd(), "public", certToDelete.pdf);
      const qrFilePath = path.join(
        process.cwd(),
        "public",
        certToDelete.qrCode,
      );
      if (fs.existsSync(pdfFilePath)) fs.unlinkSync(pdfFilePath);
      if (fs.existsSync(qrFilePath)) fs.unlinkSync(qrFilePath);
    }

    certificates = certificates.filter((cert) => cert.id !== id);
    fs.writeFileSync(jsonPath, JSON.stringify(certificates, null, 2));

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
