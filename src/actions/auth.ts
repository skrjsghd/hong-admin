"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function getUserSetting() {
  const session = await auth();
  return await prisma.setting.findUnique({
    where: {
      userId: session?.user?.id,
    },
  });
}
