"use client";

import { toast } from "sonner";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { signIn } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export const LoginForm = () => {
  const router = useRouter();
  async function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    const formData = new FormData(evt.target as HTMLFormElement);

    const email = String(formData.get("email"));
    if (!email) return toast.error("Please Enter your email");

    const password = String(formData.get("password"));
    if (!password) return toast.error("Please Enter your password");

    await signIn.email({
      email,
      password,
      fetchOptions: {
        onRequest: () => {},
        onResponse: () => {},
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
        onSuccess: () => {
          router.push("/profile");
          toast.success("Account created successfully");
        },
      },
    });
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-sm w-full space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" name="email" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input type="password" id="password" name="password" />
      </div>

      <Button type="submit" className="w-full">
        Login
      </Button>
    </form>
  );
};
