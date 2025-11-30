import Link from "next/link";
import { Button } from "../ui/button";

export function Navbar() {
  return (
    <nav className=" py-5 flex items-center justify-between ">
      <div className=" flex items-center gap-6">
        <Link href="/" className="text-3xl font-semibold">
          Blog<span className="text-blue-500">Abdisa</span>
        </Link>

        <div className="hidden sm:flex items-center gap-6">
          <Link
            href="/"
            className="text-sm font-medium hover:text-blue-500 transition-colors"
          >
            Home
          </Link>
          <Link
            href="/dashboard"
            className="text-sm font-medium hover:text-blue-500 transition-colors"
          >
            Dashboard
          </Link>
        </div>
      </div>
      <div className="flex gap-6">
        <Button variant="outline">Log in</Button>
        <Button variant="outline">Sign Up</Button>
      </div>
    </nav>
  );
}
