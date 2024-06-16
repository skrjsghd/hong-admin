import { getUserSetting } from "@/actions/auth";
import { ConnectionForm } from "@/components/_setting/connection-form";

export default async function SettingConnectionsPage() {
  const userSetting = await getUserSetting();

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
      <ConnectionForm defaultURI={userSetting?.connectionUri} />
    </section>
  );
}
