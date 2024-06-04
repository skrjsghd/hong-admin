import { ConnectionForm } from "@/components/_setting/connection-form";
import { auth } from "@/lib/auth";

export default async function SettingConnectionsPage() {
  const session = await auth();
  const connectionURI = session?.user.connectionString;

  return (
    <section className="space-y-16">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-semibold">
          Connect to Database
          <br />
          Just in a few minute
        </h1>
        <p className="text-muted-foreground">
          Write your DB URI to access the database
        </p>
      </div>
      <ConnectionForm defaultURI={connectionURI} />
    </section>
  );
}
