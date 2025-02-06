import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const ActiveBorrows = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Total Peminjaman</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-4xl font-bold">3</div>
        <p className="text-sm text-muted-foreground">
          2 in progress, 1 completed
        </p>
      </CardContent>
    </Card>
  );
};

export default ActiveBorrows;
