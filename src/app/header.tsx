import { getUserDetails } from "@/app/actions";
import { stackServerApp } from "@/stack";
import Link from "next/link";
import Image from "next/image";

export async function Header() {
  const user = await stackServerApp.getUser();
  const app = stackServerApp.urls;
  const userProfile = await getUserDetails(user?.id);

  return (
    <header className="w-full flex justify-between items-center p-5 z-10">
      <div className="">
        <Link href="/">Neon Auth</Link>
      </div>
      {user ? (
        <div className="flex items-center gap-5">
          <span className="">
            {userProfile?.name && (
              <span className="bg-primary-1">
                {`Hello, ${userProfile?.name.split(" ")[0]}`}
              </span>
            )}
            <Link href={app.signOut} className="">
              Sign Out
            </Link>
          </span>
          {userProfile?.raw_json.profile_image_url && (
            <Image
              src={userProfile?.raw_json.profile_image_url}
              alt="User avatar"
              width={32}
              height={32}
              className="rounded-full"
            />
          )}
        </div>
      ) : (
        <div className="flex items-center gap-3">
          <Link href={app.signIn} className="">
            Log In
          </Link>
          <Link href={app.signUp} className="">
            Sign Up
          </Link>
        </div>
      )}
    </header>
  );
}
