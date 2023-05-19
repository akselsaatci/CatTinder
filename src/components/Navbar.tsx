import { verifyJwtToken } from "@/lib/auth";
import { cookies } from "next/dist/client/components/headers";
import Image from "next/image";

export default function Navbar() {
  const nextCookies = cookies(); // Get cookies object
  const token = nextCookies.get("token");
  var isValid = null;
  if(token){
    isValid = verifyJwtToken(token.value);
  }
  return (
    <nav className="flex align-middle justify-between p-4 px-6 sticky top-0">
      <div className="inline-flex gap-4 my-auto">
        <a href="/">
          <Image
            src="/catinder-logo.png"
            alt="catinder-logo"
            className="logo"
            width={64}
            height={64}
          />
        </a>
        <a href="/most-voted" className="my-auto ms-3 hidden lg:block">
          <h1 className="text-xl font-bold text-white">Top Voted Cats</h1>
        </a>
      </div>
      <ul className="inline-flex gap-4 my-auto">
        <li>
          {!isValid && (
            <a className="primary-button" href="/login">
              Log in
            </a>
          )}
          {isValid && ( <a className="primary-button" href="/dashboard">
              Swipe!
            </a>)}
        </li>
      </ul>
    </nav>
  );
}
