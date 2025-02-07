import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export type BorrowsProps =
  | {
      id: string;
      peminjam: string;
      buku: string;
      author: string;
      tgl_pinjam: Date;
      tgl_kembali: Date;
      isReturned: boolean;
      isLate: boolean;
      status: string;
    }[]
  | undefined;

const ActiveBorrows = ({ data }: { data: BorrowsProps }) => {
  const filteredByStatus = data?.filter(
    (borrow) => borrow.status === "DIPINJAM",
  );
  return (
    <Card>
      <CardHeader>
        <CardTitle>Total Peminjaman</CardTitle>
      </CardHeader>
      <CardContent>
        {data && filteredByStatus ? (
          <>
            <h1 className="text-4xl font-bold">
              {filteredByStatus.length === 0 ? "0" : filteredByStatus.length}
            </h1>
            <p className="text-sm text-muted-foreground">
              {filteredByStatus.length === 0
                ? "Tidak ada peminjaman"
                : `Total ada ${filteredByStatus?.length} peminjaman`}
            </p>
          </>
        ) : (
          <p>Tidak ada Peminjaman</p>
        )}
      </CardContent>
    </Card>
  );
};

export default ActiveBorrows;
