import Link from "next/link";
import { BookOpen } from "lucide-react";

export function Brand({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className={`brand${light ? " brand-light" : ""}`}>
      <span className="brand-icon"><BookOpen size={17} strokeWidth={1.8} /></span>
      <span>story haven</span>
    </Link>
  );
}
