"use client";
import z from "zod";
import React, { use, useState, useTransition } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Loader } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/features/auth/schemas";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useToast } from "@/hooks/useToast";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/auth";

const LoginForm = () => {
  const toast = useToast();
  const router = useRouter();
  const { setEmail } = useAuthStore();
  const [isGitHubPending, startGitHubTransition] = useTransition();
  const [isGooglePending, startGoogleTransition] = useTransition();
  const [isSinginWithEmailPending, startSigninWithEmailTransition] = useTransition();

  const isPending =
    isGitHubPending || isGooglePending || isSinginWithEmailPending;

  async function loginWithGithub() {
    startGitHubTransition(async () => {
      await authClient.signIn.social({
        provider: "github",
        callbackURL: "/",
        fetchOptions: {
          onError: (error) => {
            toast.showToast(
              "Error",
              error.error.message || "An unknown error occurred",
              "error"
            );
          },
        },
      });
    });
  }

  async function loginWithGoogle() {
    startGoogleTransition(async () => {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
        fetchOptions: {
          onError: (error) => {
            toast.showToast(
              "Error",
              error.error.message || "An unknown error occurred",
              "error"
            );
          },
        },
      });
    });
  }

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    startSigninWithEmailTransition(async () => {
      await authClient.emailOtp.sendVerificationOtp({
        email: data.email,
        type: "sign-in",
        fetchOptions: {
          onSuccess: async () => {
            toast.showToast(
              "Success",
              "Verification OTP has been sent to your email",
              "success"
            );
            setEmail(data.email);
            router.push(`/verify-otp`);
          },
          onError: (error) => {
            toast.showToast(
              "Error",
              error.error.message || "An unknown error occurred",
              "error"
            );
          },
        },
      });
    });
  };
  return (
    <Card className="shadow-none md:shadow-md rounded-none md:rounded-sm border-0 border-t md:border-t border-gray-200 dark:border-gray-700">
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Welcome back</CardTitle>
        <CardDescription>
          Login with your Email or Google account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-3">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <FormField
                  name="email"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter your email"
                          autoComplete="off"
                          autoCorrect="off"
                          spellCheck="false"
                          className="w-full shadow-none rounded-xs focus:shadow-none focus-visible:shadow-none focus:outline-0 focus-visible:outline-0 focus:ring-0 focus-visible:ring-0"
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage className="text-xs text-red-500" />
                    </FormItem>
                  )}
                />
              </div>

              <Button
                type="submit"
                variant={"secondary"}
                className="w-full cursor-pointer rounded-xs bg-blue-500 hover:bg-blue-600 dark:bg-blue-900 dark:hover:bg-blue-950 text-white shadow-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 focus:ring-offset-background"
                disabled={isPending}
              >
                {isSinginWithEmailPending ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader className="h-4 w-4 animate-spin" />
                    <span>Loading...</span>
                  </span>
                ) : (
                  <span>Continue with Email</span>
                )}
              </Button>

              <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-card px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <Button
                  type="button"
                  variant="secondary"
                  className="w-full shadow-none cursor-pointer rounded-xs"
                  disabled={isPending}
                  onClick={loginWithGoogle}
                >
                  {isGooglePending ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader className="h-4 w-4 animate-spin" />
                      <span>Loading...</span>
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <FcGoogle className="h-4 w-4" />
                      <span>Google</span>
                    </span>
                  )}
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  className="w-full shadow-none cursor-pointer rounded-xs"
                  onClick={loginWithGithub}
                  disabled={isPending}
                >
                  {isGitHubPending ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader className="h-4 w-4 animate-spin" />
                      <span>Loading...</span>
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <FaGithub className="h-4 w-4" />
                      <span>GitHub</span>
                    </span>
                  )}
                </Button>
              </div>

              <div className="text-center text-sm">
                Don&apos;t have an account yet?{" "}
                <Link
                  href="/sign-up"
                  prefetch={false}
                  className="underline text-blue-500 hover:text-blue-600"
                >
                  Register
                </Link>
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
