import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { IGetAllBorrows } from "@/types/api.type";
import { format } from "date-fns";

const UpcomingDeadlines = ({ data }: { data?: IGetAllBorrows }) => {
  if (!data) return null;
  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Deadlines</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data.borrows.map((borrow) => (
            <div key={borrow.id} className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-base font-medium leading-none">
                  {borrow.buku}
                </p>
                <p className="text-sm text-muted-foreground">
                  {borrow.peminjam}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Badge
                  variant={
                    borrow.status === "DIPINJAM" ? "default" : "secondary"
                  }
                >
                  {borrow.status}
                </Badge>
                <Badge variant={"destructive"}>
                  {format(borrow.tgl_kembali, "P")}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default UpcomingDeadlines;
