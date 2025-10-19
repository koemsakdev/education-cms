"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { otpSchema } from "@/features/auth/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { useAuthStore } from "@/stores/auth";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { authClient } from "@/lib/auth-client";
import { useToast } from "@/hooks/useToast";
import { useRouter } from "next/navigation";
import LoginForm from "@/features/auth/components/login-form";

const VerifyOtpPage = () => {
  const toast = useToast();
  const { email } = useAuthStore();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof otpSchema>>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });
  const onSubmit = async (data: z.infer<typeof otpSchema>) => {
    startTransition(async () => {
      await authClient.signIn.emailOtp({
        email: email,
        otp: data.otp,
        fetchOptions: {
          onSuccess: () => {
            toast.showToast(
              "Success",
              "You have successfully logged in",
              "success"
            );
            router.push("/");
          },
          onError: (error) => {
            form.setError("otp", {
              type: "manual",
              message: error.error.message || "Invalid OTP code",
            });
          },
        },
      });
    });
  };

  useEffect(() => {
    if (!email) {
      router.push("/login");
    }
  }, [email, router]);

  return (
    <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
      <Card className="shadow-none md:shadow-md rounded-none md:rounded-sm border-0 border-t md:border-t border-gray-200 dark:border-gray-700">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Verify OTP</CardTitle>
          <CardDescription>
            Enter the OTP sent to your email <strong>{email}</strong>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid gap-3">
                <div className="grid gap-2">
                  <FormField
                    name="otp"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <FormControl>
                          <div className="flex flex-col gap-4 items-center">
                            <InputOTP maxLength={6} {...field}>
                              <InputOTPGroup className="flex gap-2">
                                {[...Array(6)].map((_, i) => {
                                  const hasValue = field.value?.[i];
                                  const isError = fieldState.error;
                                  const isFilled = field.value?.length === 6;

                                  // Determine background color
                                  let bgClass = "";
                                  if (hasValue) {
                                    if (isError && isFilled) {
                                      bgClass =
                                        "!bg-red-100 dark:!bg-red-900/30"; // Wrong OTP - red background
                                    } else {
                                      bgClass =
                                        "!bg-blue-100 dark:!bg-blue-900/30"; // Filled - blue background
                                    }
                                  }

                                  // Determine border color
                                  let borderClass = "border-input";
                                  if (isError) {
                                    if (isFilled) {
                                      borderClass =
                                        "!border-red-500 dark:!border-red-400"; // Wrong OTP - red border
                                    } else {
                                      borderClass =
                                        "!border-red-500 dark:!border-red-400"; // Empty with error - red border only
                                    }
                                  }

                                  return (
                                    <InputOTPSlot
                                      key={i}
                                      index={i}
                                      className={`!rounded-xs [&>input]:!outline-none [&>input]:!shadow-none [&>input]:!ring-0 [&>input]:focus:!outline-none [&>input]:focus:!shadow-none [&>input]:focus:!ring-0 !outline-none !shadow-none !ring-0 focus:!outline-none focus:!shadow-none focus:!ring-0 data-[state=active]:!ring-0 data-[state=active]:!shadow-none data-[state=active]:!outline-none data-[state=selected]:!ring-0 data-[state=selected]:!shadow-none data-[state=selected]:!outline-none transition-all duration-150 border w-10 h-12 text-center text-lg font-semibold ${borderClass} focus:${borderClass} data-[state=active]:${borderClass} data-[state=selected]:${borderClass} ${bgClass}`}
                                    />
                                  );
                                })}
                              </InputOTPGroup>
                            </InputOTP>
                            <div className="text-center text-sm text-muted-foreground">
                              Enter the OTP code sent to your email.
                            </div>
                          </div>
                        </FormControl>
                        <FormMessage className="text-xs text-red-500 text-center mt-2" />
                      </FormItem>
                    )}
                  />
                </div>

                <Button
                  type="submit"
                  variant={"secondary"}
                  className="cursor-pointer rounded-xs bg-blue-500 hover:bg-blue-600 dark:bg-blue-900 dark:hover:bg-blue-950 text-white shadow-none focus:ring-0 focus:ring-blue-500 focus:ring-offset-0 focus:ring-offset-background"
                  disabled={isPending || !form.formState.isValid}
                >
                  {isPending ? (
                    <Loader className="animate-spin" />
                  ) : (
                    "Verify OTP"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Button
          variant="link"
          className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 px-0 mb-4"
        >
          <Link href="/login">&larr; Back to Login</Link>
        </Button>
      </div>
    </div>
  );
};

export default VerifyOtpPage;
