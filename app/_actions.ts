"use server";
import { signIn } from "@/auth/config";
import { AuthError } from "next-auth";
import { isRedirectError } from "next/dist/client/components/redirect";

export async function signInWithCredentials(_prevState: { error?: string | null }, formData: FormData) {
    console.log("Signing in with credentials form data: ", {email: formData.get("email"), redirectTo: formData.get("redirectTo")});
    try {
      await signIn("credentials", formData);
    } catch (error) {
      if (isRedirectError(error)) throw error;
  
      if (error instanceof AuthError) {
        switch (error.type) {
          case "CredentialsSignin":
            return { error: "Invalid credentials." };
          default:
            return { error: "Something went wrong." };
        }
      }
      console.error("Uncaught error signing in", error);
      throw error;
    }
  }