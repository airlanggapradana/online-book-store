"use client";
import React from "react";
import { Button } from "./ui/button";
import { useMutation } from "@tanstack/react-query";
import useToken from "@/hooks/useToken";
import { updateBorrow } from "@/utils/api";
import { useQueryClient } from "@tanstack/react-query";

interface MarkAsReturnedProps {
  id: string;
  peminjam: string;
  buku: string;
  author: string;
  tgl_pinjam: Date;
  tgl_kembali: Date;
  isReturned: boolean;
  isLate: boolean;
  status: string;
}

const MarkAsReturned = ({ data }: { data: MarkAsReturnedProps }) => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const queryClient = useQueryClient();
  const { token } = useToken();

  const { mutateAsync } = useMutation({
    mutationFn: async () => {
      setIsSubmitting(true);
      await updateBorrow(data.id, token as string, data);
    },
    onSuccess: () => {
      setIsSubmitting(false);
      queryClient.invalidateQueries({ queryKey: ["all-borrows"] });
    },
  });

  return (
    <Button
      variant={"outline"}
      onClick={() => mutateAsync()}
      disabled={isSubmitting}
    >
      {isSubmitting ? "Loading..." : "Mark as Returned"}
    </Button>
  );
};

export default MarkAsReturned;
