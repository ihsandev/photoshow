import { ReactNode } from "react";
import Header from "./partials/Header";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

interface Ilayouts {
  children: ReactNode;
}

export default function Layouts({ children }: Ilayouts) {
  return (
    <main className={`${inter.className} text-slate-950`}>
      <Header />
      {children}
    </main>
  );
}
