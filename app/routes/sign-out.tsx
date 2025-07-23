import { redirect } from "react-router";
import { getLogtoSignOutUrl } from "~/lib/logto";

export function loader() {
  return redirect(getLogtoSignOutUrl(), {
    headers: {
      "Set-Cookie": "access_token=; HttpOnly; Path=/; Max-Age=0",
    },
  });
}