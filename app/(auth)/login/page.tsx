"use client";
import React, { useTransition } from "react";
import LoginForm from "@/features/auth/components/login-form";
import { authClient } from "@/lib/auth-client";
import { useToast } from "@/hooks/useToast";

const LoginPage = () => {
  const toast = useToast();
  const [isGitHubPending, startGitHubTransition] = useTransition();
  async function loginWithGithub() {
    startGitHubTransition(async () => {
      await authClient.signIn.social({
        provider: "github",
        callbackURL: "/",
        fetchOptions: {
          onSuccess: () => {
            toast.showToast(
              "Success",
              "You have successfully signed in with GitHub",
              "success"
            );
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
  }
  return <LoginForm />;
};

export default LoginPage;
