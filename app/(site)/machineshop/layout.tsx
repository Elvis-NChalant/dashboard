import { IconHome2 } from "@tabler/icons-react";
import Link from "next/link";


export default function MachineshopLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <div>
        {children}
        {/* Sticky Home Button */}
        <Link href="/landing">
          <div className="fixed bottom-5 right-5 bg-blue-950 text-white rounded-full p-4 shadow-lg hover:bg-blue-950 transition-colors z-50">
            <IconHome2 size={28} stroke={2} />
          </div>
        </Link>
      </div>
    );
  }