import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";

import { useState } from "react";

export const HoverEffect = ({
  items,
  className,
}: {
  items: {
    title: string;
    description: string;
    link: string;
  }[];
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-10 gap-8",
        className
      )}
    >
      {items.map((item) => (
        <a href={item.link} key={item.link} className="block h-full w-full">
          <Card>
            <CardTitle>{item.title}</CardTitle>
          </Card>
        </a>
      ))}
    </div>
  );
};

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl h-60 w-full p-4 overflow-hidden bg-white hover:bg-gray-100 transition-colors duration-300 border border-blue-900 dark:border-blue-700 relative z-20 flex items-center justify-center",
        className
      )}
    >
      {children}
    </div>
  );
};
export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <motion.h4
      className={cn(
        "text-black text-xl md:text-2xl font-extrabold tracking-tight text-center",
        className
      )}
      whileHover={{ scale: 1.05 }}
    >
      {children}
    </motion.h4>
  );
};
export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p
      className={cn(
        "mt-8 text-zinc-400 tracking-wide leading-relaxed text-sm",
        className
      )}
    >
      {children}
    </p>
  );
};
