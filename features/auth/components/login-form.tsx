"use client";
import z from "zod";
import React, { useState } from "react";
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
import { Eye, EyeOff, Loader } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/features/auth/schemas";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const onSubmit = async (data: z.infer<typeof loginSchema>) => {
  console.log(data);
};

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  return (
    <Card className="shadow-none md:shadow-md rounded-none md:rounded-sm border-0 border-t md:border-t border-gray-200">
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
                        />
                      </FormControl>
                      <FormMessage className="text-xs text-red-500" />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  {/* <a
                    href="#"
                    className="ml-auto text-sm underline-offset-2 hover:underline"
                  >
                    Forgot your password?
                  </a> */}
                </div>
                <FormField
                  name="password"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative">
                          <Input
                            {...field}
                            className="w-full pr-10 shadow-none rounded-xs focus:shadow-none focus-visible:shadow-none focus:outline-0 focus-visible:outline-0 focus:ring-0 focus-visible:ring-0"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            autoComplete="off"
                            autoCorrect="off"
                            spellCheck="false"
                          />
                          <Button
                            variant="ghost"
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1 opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-0 cursor-pointer"
                          >
                            {showPassword ? (
                              <Eye className="h-4 w-4" />
                            ) : (
                              <EyeOff className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage className="text-xs text-red-500" />
                    </FormItem>
                  )}
                />
              </div>

              <Button
                type="submit"
                variant={"secondary"}
                className="w-full cursor-pointer rounded-xs bg-blue-500 text-white shadow-none hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 focus:ring-offset-background"
                // disabled={isPending}
              >
                {/* {isPending ? (
              <span className="flex items-center justify-center gap-2">
                <Loader className="h-4 w-4 animate-spin" />
                <span>Logging in...</span>
              </span>
            ) : (
              <span>Login</span>
            )} */}
                <span>Login</span>
              </Button>

              <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <Button
                  type="button"
                  variant="secondary"
                  className="w-full shadow-none cursor-pointer rounded-xs"
                >
                  <FcGoogle className="h-4 w-4" />
                  <span>Google</span>
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  className="w-full shadow-none cursor-pointer rounded-xs"
                >
                  <FaGithub className="h-4 w-4" />
                  <span>GitHub</span>
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
