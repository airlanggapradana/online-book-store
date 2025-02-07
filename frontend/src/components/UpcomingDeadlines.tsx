import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { addDays, format, isWithinInterval } from "date-fns";
import { BorrowsProps } from "./ActiveBorrows";

const UpcomingDeadlines = ({ data }: { data: BorrowsProps }) => {
  const now = new Date();
  const filteredBorrows = data?.filter((borrow) =>
    isWithinInterval(new Date(borrow.tgl_kembali), {
      start: now,
      end: addDays(now, 3),
    }),
  );
  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Deadlines</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data ? (
            <>
              {filteredBorrows?.length === 0 ? (
                <>
                  <h1 className="text-4xl font-bold">0</h1>
                  <p className="text-sm text-muted-foreground">
                    Tidak ada deadline dalam 3 hari
                  </p>
                </>
              ) : (
                <>
                  {filteredBorrows?.map((borrow) => (
                    <div
                      key={borrow.id}
                      className="flex items-center justify-between"
                    >
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
                            borrow.status === "DIPINJAM"
                              ? "default"
                              : "secondary"
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
                </>
              )}
            </>
          ) : (
            <p>Data tidak ditemukan</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default UpcomingDeadlines;
