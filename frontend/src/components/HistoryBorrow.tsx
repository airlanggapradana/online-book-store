import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";
import { BorrowsProps } from "./ActiveBorrows";
import { format } from "date-fns";
import { id } from "date-fns/locale";

const HistoryBorrow = ({ data }: { data: BorrowsProps }) => {
  const filteredByStatus = data?.filter(
    (borrow) =>
      borrow.status === "DIKEMBALIKAN" || borrow.status === "TERLAMBAT",
  );
  return (
    <Card>
      <CardHeader>
        <CardTitle>History Peminjaman</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nama</TableHead>
              <TableHead>Buku</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Tanggal Peminjaman</TableHead>
              <TableHead>Tanggal Pengembalian</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data && filteredByStatus ? (
              <>
                {filteredByStatus.map((borrow) => (
                  <TableRow key={borrow.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center space-x-3">
                        <div>
                          <h1 className="font-medium">{borrow.peminjam}</h1>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{borrow.buku}</TableCell>
                    <TableCell>{borrow.author}</TableCell>
                    <TableCell>
                      {format(borrow.tgl_pinjam, "PPPP", { locale: id })}
                    </TableCell>
                    <TableCell>
                      {format(borrow.tgl_kembali, "PPPP", { locale: id })}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={borrow.isLate ? "destructive" : "default"}
                      >
                        {borrow.isLate
                          ? "Terlambat"
                          : "Tepat Waktu / Lebih Awal"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </>
            ) : (
              <TableRow>
                <TableCell colSpan={6}>No data available</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default HistoryBorrow;
