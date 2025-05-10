"use client";
import React from "react";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { motion } from "framer-motion";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { Departments } from "@/metadata";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import Link from "next/link";



export default function landing() {
  return (
    <div>
      <header className="w-full h-40 bg-blue-950 shadow-md fixed top-0 left-0 z-50 flex items-center justify-between px-6 py-6">
        <div className="flex items-center space-x-4">
          <img
            src="/logo.png"
            alt="Company Logo"
            className="h-15 w-40 "
          />
          <span className="text-white text-2xl font-semibold">HOME</span>
        </div>
      </header>

      <div className="mb-10"></div>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-4 items-center justify-center px-4 pt-40"
      >
        <div className="max-w-5xl mx-auto px-8">
          <HoverEffect items={Departments} />
        </div>
      </motion.div>
    </div>
  );
}
