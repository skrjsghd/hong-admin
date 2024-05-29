import { Button, Input, Label } from "@/components/ui";
import { signIn } from "@/lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function LoginPage() {
  return (
    <section className="min-w-[400px] space-y-16">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold">Welcome to Hong</h1>
        <p className="text-muted-foreground">
          Did not have an account?{" "}
          <Link href="/register" className="text-primary">
            Create an account
          </Link>
        </p>
      </div>
      <div className="space-y-6">
        <form
          className="flex flex-col space-y-4"
          action={async (formData) => {
            "use server";
            await signIn("credentials", {
              email: formData.get("email") as string,
              password: formData.get("password") as string,
              redirectTo: "/",
            });
          }}
        >
          <Label title="Email">
            <Input
              name="email"
              type="email"
              placeholder="hong.admin@example.com"
            />
          </Label>
          <Label title="Password">
            <Input name="password" type="password" placeholder="*****" />
          </Label>
          <Button>Login</Button>
        </form>

        <div className="flex items-center gap-2">
          <hr className="flex-1" />
          <span className="text-sm text-muted-foreground">OR</span>
          <hr className="flex-1" />
        </div>

        <div className="mt-6 flex flex-col space-y-2">
          {/* <Button variant="secondary">Continue with Google</Button> */}
          <form
            action={async () => {
              "use server";
              await signIn("github", { redirectTo: "/" });
            }}
          >
            <Button type="submit" variant="secondary" className="w-full">
              Continue with Github
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
