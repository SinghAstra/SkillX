"use server";
import { db } from "@/lib/db";
import { loginSchema } from "@/lib/validations/auth";
import { compare } from "bcryptjs";
import { z } from "zod";

export async function login(values: z.infer<typeof loginSchema>) {
  try {
    const validatedFields = loginSchema.parse(values);

    console.log("validatedFields is ", validatedFields);

    const user = await db.user.findUnique({
      where: { email: validatedFields.email },
    });

    console.log("user is ", user);

    if (!user) {
      return {
        success: false,
        message: "Invalid Credentials",
      };
    }

    // Verify password
    const passwordsMatch = await compare(
      validatedFields.password,
      user.password
    );

    if (!passwordsMatch) {
      return {
        success: false,
        message: "Invalid Credentials",
      };
    }

    if (!user.isVerified) {
      return {
        success: false,
        message: "Please verify your email before logging in",
        code: "EMAIL_NOT_VERIFIED",
        email: user.email,
      };
    }

    if (!user.isApproved) {
      return {
        success: false,
        error: "Your account is pending approval",
        code: "APPROVAL_PENDING",
        redirectUrl: "/auth/approval-status",
      };
    }

    return {
      success: true,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        name: user.name,
        image: user.image,
      },
    };
  } catch (error) {
    console.log("Login error:", error);

    return {
      success: false,
      error: "An unexpected error occurred",
      code: "INTERNAL_ERROR",
    };
  }
}
