"use client";
import type { Dispatch, ReactNode, SetStateAction } from "react";

import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";

type ModalProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  title: string;
  children: ReactNode;
};

export default function Modal({ open, setOpen, title, children }: ModalProps) {
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-60" />

        <Dialog.Content className="fixed top-1/2 left-1/2 z-60 w-[90%] max-w-md -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-2xl shadow-xl">
          <div className="relative mb-4 flex justify-center items-center">
            <Dialog.Title className="text-2xl uppercase font-black">
              {title}
            </Dialog.Title>

            <Dialog.Close asChild>
              <button className="absolute right-0 cursor-pointer hover:text-red-600 transition">
                <X size={20} />
              </button>
            </Dialog.Close>
          </div>

          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
