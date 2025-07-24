import { redirect } from "react-router";
import { logto } from "~/services/auth.server";

export async function loader({ request }: { request: Request }) {
  const { isAuthenticated } = await logto.getContext({
    getAccessToken: false,
  })(request);

  if (isAuthenticated) {
    return redirect("/travel-list");
  }

  return null;
}

export default function Index() {
  return (
    <div className="flex justify-between h-screen max-h-screen  bg-gray-200">
      <div className="h-screen my-auto mx-auto flex-column">

        <section className="container my-auto ">
          <div className="sub-container max-w-[496px] mx-auto text-center">
            <img
              src="/assets/icons/waffle-logo-full2.svg"

              alt="patient"
              className="mb-12 h-10 w-[200px] mx-auto"
            />

            <nav className="flex flex-col items-center space-y-8">
              <p className="flex flex-col items-center text-white">
                <a
                  href="/api/logto/sign-in"
                  className="px-4 py-2 mt-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                  Sign In
                </a>
              </p>
            </nav>

          </div>
        </section>
        <div className="text-14-regular mt-20 flex justify-between">
          <p className="justify-items-end text-dark-600 xl:text-left">
            &copy; 2022 Your Company Name. All rights reserved.
          </p>
          <a href="/?admin=true" className="text-green-500">Admin</a>
        </div>
      </div>

      <img
        src="/assets/images/waffle-icecream.png"
        height={1000}
        width={1000}
        alt="patient"
        className="side-img max-w-[50%] object-cover"
      />
    </div>
  );
}