import {
  SettingMenuItem,
  SettingMenuLabel,
} from "@/components/_setting/setting-menu";
import { SettingTopBar } from "@/components/_setting/setting-top-bar";
import { BackButton } from "@/components/back-button";

export default function SettingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="grid h-svh grid-cols-[250px_1fr]">
      <aside className="flex flex-col gap-6 border-r px-4 py-6">
        <BackButton>settings</BackButton>
        <SettingMenuLabel title="My Account" icon="UserCircleIcon">
          <SettingMenuItem href="/setting/connections">
            connections
          </SettingMenuItem>
        </SettingMenuLabel>
      </aside>
      <div className="grid grid-rows-[auto_1fr]">
        <SettingTopBar />
        <div className="flex items-center justify-center">
          <div className="min-w-[400px] p-10">{children}</div>
        </div>
      </div>
    </main>
  );
}
