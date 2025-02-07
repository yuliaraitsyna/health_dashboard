"use server";

import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from '@/app/lib/firebase';
import { addUserToDB, getUserFromDB } from "../lib/database";

export async function loginAction(formData: FormData) {
  "use server";

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Email and password are required" };
  }

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const firebaseUid = userCredential.user.uid;

    await getUserFromDB(firebaseUid)

    return { success: "Login successful" };
  } catch (error) {
    console.error("Login error:", error);
    return { error: error instanceof Error ? error.message : "An unexpected error occurred" };
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

    const firebaseUid = userCredential.user.uid;
    const firebaseEmail = userCredential.user.email as string;

    await addUserToDB(firebaseUid, firebaseEmail);

    return { success: "User registered successfully" };
  } catch (error) {
    console.error("Registration error:", error);

    if (error instanceof Error) {
      return { error: error.message };
    }
    return { error: "An unexpected error occurred" };
  }
}

export async function logoutAction() {
  "use server";

  try {
    await auth.signOut()
    .then(() => console.log("User logged out"))
    .catch(error => console.error("Error logging out:", error));
    return { success: "Logout successful" };
  } catch (error) {
    console.error("Logout error:", error);
    return { error: error instanceof Error ? error.message : "An unexpected error occurred" };
  }
}
