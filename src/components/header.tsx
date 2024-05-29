import { auth, signOut } from "@/lib/auth";
import { Button } from "./ui";

async function Header() {
  const session = await auth();

  const signOutAction = async () => {
    "use server";
    await signOut({ redirectTo: "/login" });
  };

  return (
    <header className="flex items-center justify-between border-b px-14 py-3">
      <div></div>
      {session?.user && (
        <div className="flex items-center gap-4">
          {session.user.image ? (
            <img
              src={session.user.image}
              alt=""
              className="size-9 rounded-full bg-muted object-cover"
            />
          ) : null}
          <form action={signOutAction}>
            <Button type="submit" variant="ghost">
              Sign out
            </Button>
          </form>
        </div>
      )}
    </header>
  );
}

export { Header };
