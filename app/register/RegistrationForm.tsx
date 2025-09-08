"use client";
import { useForm } from "react-hook-form";
import React from "react";

const RegistrationForm = () => {
  return (
    <>
      <form
        action="/api/auth/register"
        method="post"
        className="flex w-full flex-col gap-4"
      >
        <label className="floating-label">
          <span>Your Name</span>
          <input
            type="text"
            placeholder="John Doe"
            className="input input-md"
          />
        </label>
        <label className="floating-label">
          <span>Your Email</span>
          <input
            type="email"
            placeholder="mail@example.com"
            className="input input-md"
          />
        </label>
        <label className="floating-label">
          <span>Your Password</span>
          <input
            type="password"
            placeholder="Your Password"
            className="input input-md"
          />
        </label>

        <button type="submit" className="btn btn-primary w-fit">
          Register
        </button>
      </form>
    </>
  );
};

export default RegistrationForm;
