import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const ActiveBorrows = ({ total }: { total: number }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Total Peminjaman</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-4xl font-bold">{total}</div>
        <p className="text-sm text-muted-foreground">
          Total ada {total} peminjaman yang sedang berlangsung.
        </p>
      </CardContent>
    </Card>
  );
};

export default ActiveBorrows;
