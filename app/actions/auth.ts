"use server";

import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from '@/app/lib/firebase';
import { redirect } from "next/navigation";

export async function loginAction(formData: FormData) {
    "use server";
  
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
  
    if (!email || !password) {
      return { error: "Email and password are required" };
    }
  
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in:", userCredential.user);
      return { success: "Login successful" };
    } catch (error) {
      console.error("Login error:", error);
  
      if (error instanceof Error) {
        return { error: error.message };
      }
      return { error: "An unexpected error occurred" };
    }
  }
  

export async function registerAction(formData: FormData) {
    "use server";
  
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;
  
    if (!email || !password || !confirmPassword) {
      return { error: "All fields are required" };
    }
  
    if (password !== confirmPassword) {
      return { error: "Passwords do not match" };
    }
  
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("User registered:", userCredential.user);
      return { success: "User registered successfully" };
    } catch (error) {
      console.error("Registration error:", error);
  
      if (error instanceof Error) {
        return { error: error.message };
      }
      return { error: "An unexpected error occurred" };
    }
  }
  