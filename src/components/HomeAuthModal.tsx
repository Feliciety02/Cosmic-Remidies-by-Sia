"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AuthLanding from "@/components/AuthLanding";
import { Dialog, DialogContent } from "@/components/ui/dialog";

type AuthMode = "login" | "create";

interface HomeAuthModalProps {
  initialMode?: AuthMode;
  initialError?: string;
}

const HomeAuthModal = ({ initialMode, initialError }: HomeAuthModalProps) => {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [open, setOpen] = useState(Boolean(initialMode || initialError));

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setOpen(Boolean(initialMode || initialError));
  }, [initialMode, initialError]);

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);

    if (!nextOpen) {
      router.replace("/", { scroll: false });
    }
  };

  if (!isMounted) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-md border-0 bg-transparent p-0 shadow-none [&>button]:right-5 [&>button]:top-5 [&>button]:rounded-full [&>button]:bg-transparent [&>button]:p-1 [&>button]:text-slate-400 [&>button]:opacity-100 [&>button]:hover:bg-transparent [&>button]:hover:text-slate-600">
        <AuthLanding initialMode={initialMode ?? "login"} initialError={initialError} />
      </DialogContent>
    </Dialog>
  );
};

export default HomeAuthModal;
