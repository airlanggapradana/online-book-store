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
import { useMutation } from "@tanstack/react-query";
import useToken from "@/hooks/useToken";
import { deleteBorrow } from "@/utils/api";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "./ui/button";
import { Icons } from "./icons";

const HistoryBorrow = ({ data }: { data: BorrowsProps }) => {
  const { token } = useToken();
  const queryClient = useQueryClient();
  const filteredByStatus = data?.filter(
    (borrow) =>
      borrow.status === "DIKEMBALIKAN" || borrow.status === "TERLAMBAT",
  );

  const { mutateAsync: deleteItem, isPending } = useMutation({
    mutationFn: async (id: string) => {
      await deleteBorrow(id, token as string);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-borrows"] });
    },
  });
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
              <TableHead>Tanggal Dikembalikan</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {!data || !filteredByStatus || filteredByStatus.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6}>No data available</TableCell>
              </TableRow>
            ) : (
              filteredByStatus.map((borrow) => (
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
                  <TableCell className="flex items-center gap-3">
                    <Badge variant={borrow.isLate ? "destructive" : "default"}>
                      {borrow.isLate ? "Terlambat" : "Tepat Waktu / Lebih Awal"}
                    </Badge>
                    <Button
                      onClick={() => deleteItem(borrow.id)}
                      variant="outline"
                      disabled={isPending}
                    >
                      <Icons.trash className="h-5 w-5" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default HistoryBorrow;
