import { Header } from "@/components/header";
import { auth } from "@/lib/auth";

export default async function Page() {
  const session = await auth();
  return (
    <section className="h-svh">
      <Header />
      {/* <ConnectionForm /> */}
      <div>session data : {JSON.stringify(session)}</div>
    </section>
  );
}
