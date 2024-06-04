import { auth } from "@/auth/config";
import SignupForm from "../_components/signup";

export default async function Page() {
    const session = await auth()
    const user = session?.user?.name;

return (
    <section>
      <h1>Signin</h1>
<SignupForm />
    </section>
  )
}