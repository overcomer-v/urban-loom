import LoginForm from "@/components/auth/LogInForm";
import { Loader } from "lucide-react";
import { Suspense } from "react";

export default async function LoginPage() {
  return (
    <div className="m-auto py-32">
      <Suspense fallback={<Loader className="animate-spin" />}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
