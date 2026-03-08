import type { Metadata } from "next"
import { RegisterForm } from "./register-form"

export const metadata: Metadata = {
  title: "Daftar",
  robots: { index: false },
}

export default function RegisterPage() {
  return <RegisterForm />
}
