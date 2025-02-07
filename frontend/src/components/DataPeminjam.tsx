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
import { format } from "date-fns";
import AddRecord from "./AddRecord";
import { BorrowsProps } from "./ActiveBorrows";
import MarkasReturned from "./MarkasReturned";

const DataPeminjam = ({
  data,
  token,
}: {
  data: BorrowsProps;
  token: string;
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Daftar Peminjam
          <span>
            <AddRecord token={token} />
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nama</TableHead>
              <TableHead>Buku yang Dipinjam</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Tanggal Peminjaman</TableHead>
              <TableHead>Tanggal Pengembalian</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data ? (
              data.map((borrow) => (
                <TableRow key={borrow.id}>
                  <TableCell className="font-medium">
                    <h1 className="font-medium">{borrow.peminjam}</h1>
                  </TableCell>
                  <TableCell>{borrow.buku}</TableCell>
                  <TableCell>{borrow.author}</TableCell>
                  <TableCell>{format(borrow.tgl_pinjam, "P")}</TableCell>
                  <TableCell>{format(borrow.tgl_kembali, "P")}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        borrow.status === "DIPINJAM"
                          ? "default"
                          : borrow.status === "TERLAMBAT"
                            ? "destructive"
                            : "secondary"
                      }
                    >
                      {borrow.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="flex items-center gap-3">
                    <MarkasReturned borrowId={borrow.id} />
                  </TableCell>
                </TableRow>
              ))
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

export default DataPeminjam;
