"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("add");
  const [certs, setCerts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    id: "",
    fullName: "",
    project: "",
    issueDate: "",
  });
  const [pdfFile, setPdfFile] = useState(null);
  const [qrFile, setQrFile] = useState(null);

  useEffect(() => {
    if (sessionStorage.getItem("isAdmin") !== "true") {
      router.push("/admin");
    } else {
      fetchCertificates();
    }
  }, []);

  const fetchCertificates = async () => {
    try {
      const res = await fetch("/data", { cache: "no-store" });
      const data = await res.json();
      setCerts(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Məlumatlar çəkilərkən xəta:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isEditing) {
      handleUpdate();
      return;
    }

    const data = new FormData();
    data.append("id", formData.id);
    data.append("fullName", formData.fullName);
    data.append("project", formData.project);
    data.append("issueDate", formData.issueDate);
    data.append("pdf", pdfFile);
    data.append("qr", qrFile);

    try {
      const res = await fetch("/data", {
        method: "POST",
        body: data,
      });

      if (res.ok) {
        alert("✅ Sertifikat uğurla əlavə edildi!");
        resetForm();
        fetchCertificates();
        setActiveTab("list");
      }
    } catch (err) {
      alert("❌ Bağlantı xətası!");
    }
  };

  const handleUpdate = async () => {
    const data = new FormData();
    data.append("id", formData.id);
    data.append("fullName", formData.fullName);
    data.append("project", formData.project);
    data.append("issueDate", formData.issueDate);
    if (pdfFile) data.append("pdf", pdfFile);
    if (qrFile) data.append("qr", qrFile);

    try {
      const res = await fetch("/data", {
        method: "PUT",
        body: data,
      });

      if (res.ok) {
        alert("✅ Məlumatlar yeniləndi!");
        resetForm();
        fetchCertificates();
        setActiveTab("list");
      }
    } catch (err) {
      alert("❌ Yeniləmə zamanı xəta!");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Bu sertifikatı silməyə əminsiniz?")) return;
    try {
      const res = await fetch("/data", {
        method: "DELETE",
        body: JSON.stringify({ id }),
      });
      if (res.ok) fetchCertificates();
    } catch (err) {
      alert("Silinmə zamanı xəta!");
    }
  };

  const startEdit = (cert) => {
    setFormData({
      id: cert.id,
      fullName: cert.fullName,
      project: cert.project,
      issueDate: cert.issueDate,
    });
    setIsEditing(true);
    setActiveTab("add");
  };

  const resetForm = () => {
    setFormData({ id: "", fullName: "", project: "", issueDate: "" });
    setPdfFile(null);
    setQrFile(null);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white flex">
      <div className="w-64 bg-slate-900 p-8 border-r border-slate-800 shrink-0">
        <h2 className="text-2xl font-black italic mb-10 text-blue-500">
          WAY ADMIN
        </h2>
        <div className="flex flex-col gap-3">
          <button
            onClick={() => {
              setActiveTab("add");
              resetForm();
            }}
            className={`p-3 rounded-xl font-bold transition ${activeTab === "add" ? "bg-blue-600" : "bg-slate-800 hover:bg-slate-700"}`}
          >
            Sertifikat Əlavə Et
          </button>
          <button
            onClick={() => {
              setActiveTab("list");
              fetchCertificates();
            }}
            className={`p-3 rounded-xl font-bold transition ${activeTab === "list" ? "bg-blue-600" : "bg-slate-800 hover:bg-slate-700"}`}
          >
            Siyahıya Bax ({certs.length})
          </button>
        </div>
      </div>

      <div className="flex-1 p-10">
        {activeTab === "add" ? (
          <form
            onSubmit={handleSubmit}
            className="max-w-xl bg-slate-900 p-8 rounded-3xl border border-slate-800 space-y-4 mx-auto shadow-2xl"
          >
            <h1 className="text-2xl font-bold mb-4">
              {isEditing ? "Sertifikatı Redaktə Et" : "Yeni Sertifikat"}
            </h1>
            <input
              className={`w-full bg-slate-800 p-4 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 ${isEditing ? "opacity-50 cursor-not-allowed" : ""}`}
              placeholder="ID"
              value={formData.id}
              onChange={(e) => setFormData({ ...formData, id: e.target.value })}
              required
              disabled={isEditing}
            />
            <input
              className="w-full bg-slate-800 p-4 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ad Soyad"
              value={formData.fullName}
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
              required
            />
            <input
              className="w-full bg-slate-800 p-4 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Layihə"
              value={formData.project}
              onChange={(e) =>
                setFormData({ ...formData, project: e.target.value })
              }
              required
            />
            <input
              className="w-full bg-slate-800 p-4 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Tarix"
              value={formData.issueDate}
              onChange={(e) =>
                setFormData({ ...formData, issueDate: e.target.value })
              }
              required
            />

            <div className="grid grid-cols-2 gap-4 text-xs font-bold text-slate-400">
              <div>
                {isEditing ? "PDF-İ DƏYİŞ (OPSİONAL):" : "PDF:"}{" "}
                <input
                  type="file"
                  className="mt-1"
                  onChange={(e) => setPdfFile(e.target.files[0])}
                  required={!isEditing}
                />
              </div>
              <div>
                {isEditing ? "QR-I DƏYİŞ (OPSİONAL):" : "QR:"}{" "}
                <input
                  type="file"
                  className="mt-1"
                  onChange={(e) => setQrFile(e.target.files[0])}
                  required={!isEditing}
                />
              </div>
            </div>

            <button
              type="submit"
              className={`w-full py-4 rounded-xl font-black mt-4 transition-all uppercase ${isEditing ? "bg-orange-500 hover:bg-orange-600" : "bg-blue-600 hover:bg-blue-700"}`}
            >
              {isEditing ? "Məlumatları Yenilə" : "Məlumatları Yadda Saxla"}
            </button>
            {isEditing && (
              <button
                onClick={resetForm}
                type="button"
                className="w-full text-slate-400 text-sm font-bold mt-2 hover:text-white"
              >
                Ləğv Et
              </button>
            )}
          </form>
        ) : (
          <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl">
            <table className="w-full text-left">
              <thead className="bg-slate-800/50 text-slate-400 text-xs uppercase font-black">
                <tr>
                  <th className="p-4">ID</th>
                  <th className="p-4">Ad Soyad</th>
                  <th className="p-4">Layihə</th>
                  <th className="p-4 text-right">Əməliyyat</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {certs.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-800/20 transition">
                    <td className="p-4 font-mono text-blue-400">{c.id}</td>
                    <td className="p-4 font-bold">{c.fullName}</td>
                    <td className="p-4 text-slate-400">{c.project}</td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => startEdit(c)}
                        className="text-blue-500 hover:bg-blue-500/10 px-3 py-1 rounded-lg font-bold text-xs"
                      >
                        REDAKTƏ
                      </button>
                      <button
                        onClick={() => handleDelete(c.id)}
                        className="text-red-500 hover:bg-red-500/10 px-3 py-1 rounded-lg font-bold text-xs"
                      >
                        SİL
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {certs.length === 0 && (
              <p className="p-10 text-center text-slate-500">
                Sertifikat tapılmadı.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
