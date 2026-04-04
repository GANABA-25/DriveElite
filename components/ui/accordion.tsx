"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import NavLinks from "../nav-links";

export default function AccordionHeader() {
  const [open, setOpen] = useState<string | undefined>(undefined);

  return (
    <Accordion.Root
      type="single"
      collapsible
      value={open}
      onValueChange={setOpen}
      className="md:hidden"
    >
      <Accordion.Item value="menu">
        <Accordion.Header>
          <Accordion.Trigger className="group flex items-center">
            <Menu className="group-data-[state=open]:hidden" />
            <X className="hidden group-data-[state=open]:block" />
          </Accordion.Trigger>
        </Accordion.Header>

        <Accordion.Content className="absolute top-20 left-0 w-full bg-white border-t border-gray-300 p-6 z-50">
          <NavLinks onNavigate={() => setOpen(undefined)} />

          <div className="mt-6 flex justify-center gap-4 text-black">
            <button className="p-2 px-8 rounded-md">Sign In</button>
            <button className="bg-[#FACC15] p-2 px-8 rounded-md font-black">
              Book Now
            </button>
          </div>
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  );
}
