"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  interface ILoginResponse {
    status: number;
    message: string;
  }
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userName, password }),
    })
      .then((res) => res.json())
      .then((data: ILoginResponse) => {
        if (data.status != 200) {
          console.log("not200");
          setError(data.message);
          setLoading(false);
        } else {
          console.log("200");
          router.push("/dashboard");
        }
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  };
  return (
    <div className="text-center  flex align-middle justify-center h-92">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto ">
        <div className="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Log in to your account
            </h1>
            {error && <p>{error}</p>}
            {loading && <p>Loading...</p>}
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Your email
                </label>
                <input
                  type="text"
                  name="userName"
                  id="email"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="name@company.com"
                  required={true}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  required={true}
                />
              </div>

              <button type="submit" className="secondary-button">
                Log in
              </button>
              <p className="text-sm font-light text-gray-500 ">
                Don’t have an account yet?{" "}
                <a
                  href="/register"
                  className="font-medium text-primary-600 hover:underline "
                >
                  Register
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
