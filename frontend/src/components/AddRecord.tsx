"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createBookSchema, CreateBookSchema } from "@/utils/schema";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "./ui/calendar";
import { format } from "date-fns";
import { useQueryClient } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { createBorrow } from "@/utils/api";

const AddRecord = ({ token }: { token: string }) => {
  const queryClient = useQueryClient();
  const [open, setOpen] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<CreateBookSchema>({
    resolver: zodResolver(createBookSchema),
    defaultValues: {
      peminjam: "",
      buku: "",
      author: "",
      tgl_kembali: new Date(),
    },
  });

  const { mutateAsync } = useMutation({
    mutationFn: async (data: CreateBookSchema) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await createBorrow(data, token);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-borrows"] });
      form.reset();
      setOpen(false);
      setIsSubmitting(false);
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    setIsSubmitting(true);
    mutateAsync(data);
  });
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">Tambah Record</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Buat Record Baru</DialogTitle>
          <DialogDescription>
            Isi detail untuk record baru. Klik simpan jika sudah selesai.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-4" onSubmit={onSubmit}>
            <FormField
              control={form.control}
              name="peminjam"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Peminjam</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="buku"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Buku yang Dipinjam</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="The Psychology of Money"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="author"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Author Buku</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Morgan Housel" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tgl_kembali"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Tanggal Pengembalian</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={`w-full pl-3 text-left font-normal ${!field.value && "text-muted-foreground"}`}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pilih Tanggal</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" onClick={onSubmit} disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Save New Record"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddRecord;
