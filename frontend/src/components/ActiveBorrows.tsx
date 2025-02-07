import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const ActiveBorrows = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Total Peminjaman</CardTitle>
      </CardHeader>
      <CardContent>
        <h1 className="text-4xl font-bold">0</h1>
        <p className="text-sm text-muted-foreground">tidak ada peminjaman</p>
      </CardContent>
    </Card>
  );
};

export default ActiveBorrows;
