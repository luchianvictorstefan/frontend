import { redirect } from "react-router";
import { getLogtoSignInUrl } from "~/lib/logto";

export function loader() {
  return redirect(getLogtoSignInUrl());
}