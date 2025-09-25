"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterInput } from "../lib/validations/auth";

const RegistrationForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    reset,
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterInput) => {
    // Send validated data to the register API
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (!res.ok) {
        if (result?.error) {
          // Set form error for the API error
          setError("root", { message: typeof result.error === "string" ? result.error : "Registration failed" });
        }
      } else {
        reset();
        alert("Registration successful!");
      }
    } catch (err: any) {
      setError("root", { message: err.message || "An unexpected error occurred" });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full flex-col gap-4"
      noValidate
    >
      <label className="floating-label">
        <span>Your Name</span>
        <input
          {...register("name")}
          type="text"
          placeholder="John Doe"
          className="input input-md"
          autoComplete="name"
        />
        {errors.name && (
          <span className="text-red-500 text-xs">{errors.name.message}</span>
        )}
      </label>
      <label className="floating-label">
        <span>Your Email</span>
        <input
          {...register("email")}
          type="email"
          placeholder="mail@example.com"
          className="input input-md"
          autoComplete="email"
        />
        {errors.email && (
          <span className="text-red-500 text-xs">{errors.email.message}</span>
        )}
      </label>
      <label className="floating-label">
        <span>Your Password</span>
        <input
          {...register("password")}
          type="password"
          placeholder="Your Password"
          className="input input-md"
          autoComplete="new-password"
        />
        {errors.password && (
          <span className="text-red-500 text-xs">{errors.password.message}</span>
        )}
      </label>
      {errors.root && (
        <span className="text-red-500 text-xs">{errors.root.message}</span>
      )}
      <button
        type="submit"
        className="btn btn-primary w-fit"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Registering..." : "Register"}
      </button>
    </form>
  );
};

export default RegistrationForm;
