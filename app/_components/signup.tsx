"use client";

import { signInWithCredentials } from "@/app/_actions";
import { useFormState } from "react-dom";

export const SignupForm = () => {
  const [error, dispatch] = useFormState<{ error?: string | null }>(
    signInWithCredentials as (state: {
      error?: string | null | undefined;
    }) => { error?: string | null | undefined } | Promise<{ error?: string | null | undefined }>,
    { error: null }
  );


  return (
    <form action={dispatch}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="email" placeholder="m@example.com" required />
            </div>
            <div className="grid gap-2">
              <label htmlFor="password">Password</label>
              <input id="password" name="password" type="password" />
            </div>
              <input hidden name="redirectTo" value="/" readOnly />
            <button type="submit" className="w-full">
              Create an account
            </button>
          </div>
    </form>
  );
};
export default SignupForm;
