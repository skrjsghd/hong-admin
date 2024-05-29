"use server";

import { prisma } from "@/lib/prisma";
import { RegisterSchema } from "@/lib/schema";
import * as z from "zod";
import bcrypt from "bcrypt";

export async function registerAction(values: z.infer<typeof RegisterSchema>) {
  const result = RegisterSchema.safeParse(values);
  if (!result.success) {
    return {
      success: false,
      errors: result.error.errors.map((error) => error.message),
    };
  }
  try {
    // Call the register function with hashed password
    const hashedPassword = await bcrypt.hash(values.password, 10);
    await prisma.user.create({
      data: {
        name: values.name,
        email: values.email,
        password: hashedPassword,
      },
    });
    return {
      success: true,
      errors: [],
    };
  } catch (e) {
    console.log(e);
    return {
      success: false,
      errors: ["An error occurred while registering"],
    };
  }
}
