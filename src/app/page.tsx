import { ConnectionForm } from "@/components/connection-form";
import Link from "next/link";

export default async function Page() {
  return (
    <section className="h-svh">
      <Link
        href="https://docs.google.com/presentation/d/1fKkMOrrrQmYmlC-Ft2caGVw7qLFzV45A0tC67xUfj_c/edit?usp=sharing"
        target="_blank"
      >
        발표자료로
      </Link>
      <ConnectionForm />
    </section>
  );
}
