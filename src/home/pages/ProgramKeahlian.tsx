import React, { useEffect } from "react";
import Navbar from "../components/navbar";
import Title from "../components/tiltle";
import DataJurusan from "../data/ProgramKeahlian.json";
import { useParams, useNavigate } from "react-router-dom";

const ProgramKeahlian: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const data = DataJurusan.find((item) => item.id === id);

  useEffect(() => {
    if (!id) {
      navigate('/notfound', { replace: true });
    }
  }, [id, navigate]);

  if (!data) return null;

  return (
    <div className="min-h-screen w-full bg-gray-50">
      <Navbar />
      <Title text="Program Keahlian" />
      <main className="w-full flex flex-col lg:flex-row gap-4 py-10 lg:py-16 px-6 lg:px-16">
        {/* Gambar kiri */}
        <div className="lg:w-1/3 w-full">
          <img
            src={data.content.images}
            alt={data.content.title}
            className="rounded-lg shadow-md w-full object-cover"
          />
        </div>

        {/* Konten kanan */}
        <div className="lg:w-2/3 w-full flex flex-col space-y-6">
          <h1 className="w-full px-2 py-1 text-xl uppercase font-semibold border-b-2 border-neutral-500">
            {data.content.title}
          </h1>

          <div className="px-2 space-y-4">
            {/* 🔹 Deskripsi bagian RPL (pakai struktur section JSON baru) */}
            {data.content.sections && data.content.sections.map((section: { type: string; text?: string; items?: string[] }, index: number) => (
              <div key={index}>
                {section.type === "heading" && section.text && (
                  <h3 className="font-semibold text-lg mt-4 mb-2">
                    {section.text}
                  </h3>
                )}

                {section.type === "paragraph" && section.text && (
                  <p className="text-gray-700 leading-relaxed mb-3">
                    {section.text}
                  </p>
                )}

                {section.type === "list" && section.items && (
                  <ol className="list-decimal pl-6 text-gray-700 leading-relaxed">
                    {section.items.map((item: string, i: number) => (
                      <li key={i} className="mb-1">
                        {item}
                      </li>
                    ))}
                  </ol>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProgramKeahlian;
