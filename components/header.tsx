"use client";

import { useState } from "react";
import { Car, CircleUser } from "lucide-react";
import Link from "next/link";
import { useAuth } from "../store/authContext";
import Image from "next/image";

import NavLinks from "./nav-links";
import Accordion from "./ui/accordion";
import Button from "./button";
import Modal from "../components/ui/modal";

import UpdateProfile from "../app/authentication/updateProfile";

export default function Header() {
  const { token } = useAuth();
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="p-4 fixed top-0 w-full h-20 shadow-md bg-white z-50">
        <div className="max-w-360 mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-[#0F172A] p-2 rounded-xl">
              <Car color="#FACC15" />
            </div>
            <h1 className="text-2xl font-black">
              Drive<span className="text-[#FACC15]">Elite</span>
            </h1>
          </Link>

          <div className="hidden md:flex">
            <NavLinks />
          </div>

          <div className="hidden md:flex items-center gap-4">
            {token ? (
              <div
                onClick={() => setOpen(true)}
                className="bg-accent p-2 rounded-full"
              >
                <CircleUser className="text-white" />
              </div>
            ) : (
              <Link
                className="lg:hover:bg-gray-200 p-1 px-3 rounded-md transition-colors duration-300 ease-in-out"
                href="/authentication/signin"
              >
                Sign In
              </Link>
            )}

            <Link href="/fleet">
              <Button>Book Now</Button>
            </Link>
          </div>

          <div className="md:hidden">
            <Accordion />
          </div>
        </div>
      </div>

      <Modal open={open} setOpen={setOpen} title="Update Profile">
        <UpdateProfile />
      </Modal>
    </>
  );
}
