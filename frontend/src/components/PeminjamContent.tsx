"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";
import { useQuery } from "@tanstack/react-query";
import { getAllBorrows } from "@/utils/api";
import useToken from "@/hooks/useToken";
import { format } from "date-fns";
import { DatePicker } from "@/lib/date-picker";

const PeminjamContent = () => {
  const { token } = useToken();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Fetch borrowers data
  const { data, isError, isLoading } = useQuery({
    queryKey: ["borrowers"],
    queryFn: async () => await getAllBorrows(token as string),
    enabled: !!token,
  });

  const res = data?.result?.borrows;

  const [mounted, setMounted] = React.useState(false);

  // Get filter values from URL params
  const nameFilter = searchParams.get("nama") || "";
  const borrowDateFilter = searchParams.get("borrowDate")
    ? new Date(searchParams.get("borrowDate")!)
    : undefined;
  const returnDateFilter = searchParams.get("returnDate")
    ? new Date(searchParams.get("returnDate")!)
    : undefined;
  const statusFilter = searchParams.get("status") || "";

  // Create a function to update URL params
  const updateFilters = React.useCallback(
    (updates: { [key: string]: string | Date | undefined }) => {
      const newParams = new URLSearchParams(searchParams);
      Object.entries(updates).forEach(([key, value]) => {
        if (value === undefined || value === "") {
          newParams.delete(key);
        } else if (value instanceof Date) {
          newParams.set(key, value.toISOString().split("T")[0] as string);
        } else {
          newParams.set(key, value);
        }
      });
      router.push(pathname + "?" + newParams.toString());
    },
    [searchParams, router, pathname],
  );

  // Filter borrowers based on current state
  const filteredBorrowers = res?.filter((borrower) => {
    const borrowDate = new Date(borrower.tgl_pinjam);
    const returnDate = new Date(borrower.tgl_kembali);
    return (
      borrower.peminjam.toLowerCase().includes(nameFilter.toLowerCase()) &&
      (!borrowDateFilter ||
        borrowDate.getTime() >= borrowDateFilter?.getTime()) &&
      (!returnDateFilter ||
        returnDate.getTime() <= returnDateFilter?.getTime()) &&
      (statusFilter === "" ||
        statusFilter === "all" ||
        borrower.status === statusFilter)
    );
  });

  // Reset all filters
  const resetFilters = () => {
    router.push(pathname);
  };

  // Update filters
  const updateFilter = (nama: string, value: string) => {
    updateFilters({ [nama]: value });
  };

  // Use useEffect to prevent hydration mismatch
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  if (!token) return null;
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error...</p>;
  if (!data) return <p>no data...</p>;
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Input
          type="text"
          placeholder="Filter berdasarkan nama"
          value={nameFilter}
          onChange={(e) => updateFilter("nama", e.target.value)}
        />
        <DatePicker
          date={borrowDateFilter}
          onSelect={(date) => updateFilters({ borrowDate: date })}
          placeholder="Tanggal pinjam dari"
        />
        <DatePicker
          date={returnDateFilter}
          onSelect={(date) => updateFilters({ returnDate: date })}
          placeholder="Tanggal kembali sampai"
        />
        <Select
          value={statusFilter}
          onValueChange={(value) => updateFilter("status", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Filter status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua Status</SelectItem>
            <SelectItem value="DIPINJAM">DIPINJAM</SelectItem>
            <SelectItem value="DIKEMBALIKAN">DIKEMBALIKAN</SelectItem>
            <SelectItem value="TERLAMBAT">TERLAMBAT</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={resetFilters}>Reset Filter</Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nama</TableHead>
              <TableHead>Buku</TableHead>
              <TableHead>Penulis</TableHead>
              <TableHead>Tanggal Pinjam</TableHead>
              <TableHead>Tanggal Kembali</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredBorrowers?.map((borrower) => (
              <TableRow key={borrower.id}>
                <TableCell className="font-medium">
                  {borrower.peminjam}
                </TableCell>
                <TableCell>{borrower.buku}</TableCell>
                <TableCell>{borrower.author}</TableCell>
                <TableCell>{format(borrower.tgl_pinjam, "PP")}</TableCell>
                <TableCell>{format(borrower.tgl_kembali, "PP")}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      borrower.status === "DIPINJAM"
                        ? "default"
                        : borrower.status === "DIKEMBALIKAN"
                          ? "default"
                          : "destructive"
                    }
                  >
                    {borrower.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default PeminjamContent;
