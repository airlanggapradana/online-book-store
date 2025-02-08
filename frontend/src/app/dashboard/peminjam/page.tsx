import PeminjamContent from "@/components/PeminjamContent";
import React from "react";

export default function PeminjamPage() {
  return (
    <main className="w-full px-6 py-4">
      <h1 className="mb-6 text-center text-3xl font-bold">
        Daftar Peminjam Buku Perpustakaan
      </h1>
      <PeminjamContent />
    </main>
  );
}
