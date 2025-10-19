import { redirect } from "next/navigation"

export default function DashboardPage() {
  // Redirect to students page by default
  redirect("/dashboard/students")
}
