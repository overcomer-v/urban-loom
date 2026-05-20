"use client";
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type FormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

export default function SignUpForm() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // clear field error on change
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  }

  function validate(): boolean {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
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
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setServerError(data.message || "Something went wrong");
        return;
      }

      router.push("/dashboard");
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

  <h2 className="text-3xl font-bold font-heading">
    Create Account
  </h2>

  {/* Name */}
  <div className="relative w-full">
    <input
      id="name"
      name="name"
      type="text"
      placeholder=" "
      value={formData.name}
      onChange={handleChange}
      disabled={isLoading}
      className={inputClass}
    />
    <label htmlFor="name" className={labelClass}>
      Name
    </label>
    {errors.name && (
      <p className="text-red-500 text-sm mt-1">{errors.name}</p>
    )}
  </div>

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

  {/* Confirm Password */}
  <div className="relative">
    <input
      id="confirmPassword"
      name="confirmPassword"
      type="password"
      placeholder=" "
      value={formData.confirmPassword}
      onChange={handleChange}
      disabled={isLoading}
      className={inputClass}
    />
    <label htmlFor="confirmPassword" className={labelClass}>
      Confirm Password
    </label>
    {errors.confirmPassword && (
      <p className="text-red-500 text-sm mt-1">
        {errors.confirmPassword}
      </p>
    )}
  </div>

  <button type="submit" disabled={isLoading} className={buttonClass}>
    {isLoading ? "Creating account..." : "Sign Up"}
  </button>
</form>
  );
}
