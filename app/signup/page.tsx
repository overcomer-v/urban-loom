import SignUpForm from "@/components/auth/SignUpForm";
import { Loader } from "lucide-react";
import { Suspense } from "react";

export default async function SignUp() {
  return (
    <div className="w-full m-auto py-32">
      <Suspense fallback={<Loader className="animate-spin" />}>
        <SignUpForm />
      </Suspense>
    </div>
  );
}
