import { redirect } from "react-router";

export function loader() {
  return redirect("/api/logto/sign-in");
}