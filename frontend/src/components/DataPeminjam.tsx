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
import { IGetAllBorrows } from "@/types/api.type";
import { format } from "date-fns";
import AddRecord from "./AddRecord";

const DataPeminjam = ({
  data,
  token,
}: {
  data?: IGetAllBorrows;
  token: string;
}) => {
  if (!data) return null;
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
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.borrows.map((borrow) => (
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
                <TableCell>{format(borrow.tgl_pinjam, "P")}</TableCell>
                <TableCell>{format(borrow.tgl_kembali, "P")}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      borrow.status === "DIPINJAM" ? "default" : "secondary"
                    }
                  >
                    {borrow.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default DataPeminjam;
