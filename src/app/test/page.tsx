import { TipTap } from "@/components/tiptap";
import { Button, Checkbox, Input, Label } from "@/components/ui";

export default async function TestPage() {
  return (
    <div className="flex h-dvh items-center justify-center">
      <section className="max-w-screen-md space-y-6 p-6">
        <h1>클라이언트</h1>
        <div className="flex flex-col gap-6 rounded-lg border bg-background p-6 shadow-sm">
          <Label title="제목">
            <Input placeholder="제목을 입력하세요." />
          </Label>
          <Label title="본문">
            <TipTap />
          </Label>
          <Label title="비밀글" side="left">
            <Checkbox />
          </Label>
          <div className="flex items-center justify-end gap-4">
            <Button variant={"outline"}>작성 취소</Button>
            <Button>작성 완료</Button>
          </div>
        </div>
      </section>
    </div>
  );
}
