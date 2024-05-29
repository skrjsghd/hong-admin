"use client";

import { registerAction } from "@/actions/register";
import { Button, Input, Label } from "@/components/ui";
import { RegisterSchema } from "@/lib/schema";
import { useRouter } from "next/navigation";
import { useState } from "react";
import * as z from "zod";

function RegisterForm() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string[]>([]);
  const [registerValue, setRegisterValue] = useState<
    z.infer<typeof RegisterSchema>
  >({
    name: "",
    email: "",
    password: "",
  });
  const disableSubmit =
    !registerValue.name || !registerValue.email || !registerValue.password;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterValue((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    const result = await registerAction(registerValue);
    if (!result.success) {
      setErrorMessage(result.errors);
      return;
    }
    router.replace("/login");
  };

  return (
    <form className="space-y-6">
      <div className="flex flex-col space-y-4">
        <Label title="Name">
          <Input
            name="name"
            placeholder="John Doe"
            onChange={handleInputChange}
          />
        </Label>
        <Label title="Email">
          <Input
            name="email"
            type="email"
            placeholder="hong.admin@example.com"
            onChange={handleInputChange}
          />
        </Label>
        <Label title="Password">
          <Input
            name="password"
            type="password"
            placeholder="*****"
            onChange={handleInputChange}
          />
        </Label>
      </div>
      {errorMessage.length > 0 && (
        <ul className="list-inside list-disc space-y-2 rounded-md bg-muted p-4">
          {errorMessage.map((error) => (
            <li key={error} className="text-destructive text-sm">
              {error}
            </li>
          ))}
        </ul>
      )}
      <Button
        className="w-full"
        disabled={disableSubmit}
        onClick={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        Create account
      </Button>
    </form>
  );
}

export { RegisterForm };
