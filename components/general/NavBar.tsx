import Link from "next/link";
import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { buttonVariants } from "../ui/button";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
export async function Navbar() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
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
      
        {" "}
        {user ? (
          <div className="flex items-center gap-4">
            <h1 className="text-blue-600">{user.given_name}</h1>
            <LogoutLink className={buttonVariants({ variant: "secondary" })}>
              Logout
            </LogoutLink>
          </div>
        ) : (
          <div className="flex gap-6">
            <LoginLink className={buttonVariants()}>Log in</LoginLink>
            <RegisterLink className={buttonVariants({ variant: "secondary" })}>
              Sign Up
            </RegisterLink>
          </div>
        )}
     
    </nav>
  );
}
