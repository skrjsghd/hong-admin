import { RegisterForm } from "@/components/_register/register-form";
import { Button, Input, Label } from "@/components/ui";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <section className="min-w-[400px] space-y-16">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-semibold">Create a Hong account</h1>
        <p className="text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="text-primary">
            Log in.
          </Link>
        </p>
      </div>
      <RegisterForm />
    </section>
  );
}
