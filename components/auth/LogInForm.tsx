"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type FormData = {
  email: string;
  password: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

export default function LoginForm() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  }

  function validate(): boolean {
    const newErrors: FormErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setServerError("");

    if (!validate()) return;

    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setServerError(data.message || "Invalid email or password");
        console.log(data.error)
        return;
      }

      router.push("/");
    } catch {
      setServerError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  const inputClass =
    "peer w-full border border-gray-300 h-16 rounded-lg px-4 pt-6 pb-2 outline-none focus:border-black transition";

  const labelClass =
    `absolute left-4 top-2 text-sm text-gray-500 transition-all
     peer-placeholder-shown:top-5
     peer-placeholder-shown:text-base
     peer-placeholder-shown:text-gray-400
     peer-focus:top-2
     peer-focus:text-sm`;

  const buttonClass =
    "w-full bg-black text-white py-3 rounded-lg hover:opacity-90 transition disabled:opacity-50";

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5 w-100">
      {serverError && (
        <p className="text-red-500 text-sm">{serverError}</p>
      )}

      <h2 className="text-3xl font-bold font-heading">Welcome Back</h2>

      {/* Email */}
      <div className="relative">
        <input
          id="email"
          name="email"
          type="email"
          placeholder=" "
          value={formData.email}
          onChange={handleChange}
          disabled={isLoading}
          className={inputClass}
        />
        <label htmlFor="email" className={labelClass}>
          Email
        </label>
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email}</p>
        )}
      </div>

      {/* Password */}
      <div className="relative">
        <input
          id="password"
          name="password"
          type="password"
          placeholder=" "
          value={formData.password}
          onChange={handleChange}
          disabled={isLoading}
          className={inputClass}
        />
        <label htmlFor="password" className={labelClass}>
          Password
        </label>
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password}</p>
        )}
      </div>

      <div className="text-right">
        <a href="/forgot-password" className="text-sm text-gray-500 hover:text-black transition">
          Forgot password?
        </a>
      </div>

      <button type="submit" disabled={isLoading} className={buttonClass}>
        {isLoading ? "Signing in..." : "Log In"}
      </button>
    </form>
  );
}