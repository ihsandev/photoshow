import useAppContext from "@/contexts/AppContext";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Header() {
  const router = useRouter();
  const { state }: any = useAppContext();
  const { pathname } = router;
  return (
    <header className="flex items-center justify-between container mx-auto py-6 px-2 md:px-0">
      <div>
        <h1 className="font-bold text-lg">PhotoShow_</h1>
      </div>
      <nav className="flex items-center gap-4">
        <Link
          className={`py-1 px-2 ${
            pathname === "/" ? "bg-slate-950 rounded-sm text-white" : ""
          }`}
          href="/"
        >
          All Photos
        </Link>
        <Link
          className={`py-1 px-2 ${
            pathname === "/favorites"
              ? "bg-slate-950 rounded-sm text-white"
              : ""
          } relative`}
          href="/favorites"
        >
          Favorites
          {state.favorites?.length > 0 && (
            <span className="absolute -top-2 -right-1 bg-orange-600 text-xs text-white min-w-[16px] min-h-[16px] text-center rounded-full flex items-center justify-center">
              {state.favorites?.length}
            </span>
          )}
        </Link>
      </nav>
    </header>
  );
}
