"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { signOut } from "@/lib/auth-client";
import { toast } from "sonner";

export const SignOutButton = () => {
  const router = useRouter();

  async function handleLogout() {
    await signOut({
      fetchOptions: {
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
        onSuccess: () => {
          router.push("/auth/login");
        },
      },
    });
  }

  return <Button onClick={handleLogout}>Logout</Button>;
};
