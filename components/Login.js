import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import axios from "axios";
import Swal from "sweetalert2";

export default function Login() {
  const [nik, setNik] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [count, setCount] = useState(5);

  useEffect(() => {
    const nikSession = sessionStorage.getItem("nik");

    if (nikSession) {
      Swal.fire({
        icon: "success",
        title: "Anda sudah login!",
        html: `Anda akan diarahkan ke halaman rangkaian `,
        timer: 5000,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();

          const timerInterval = setInterval(() => {
            setCount((prevCount) => prevCount - 1);
          }, 1000);
          return () => clearInterval(timerInterval);
        },
        willClose: () => {
          router.push("/rangkaians");
        },
      });
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://example.nusastory.com/pi/spv/login",
        { nik, password }
      );

      if (response.data.nik) {
        sessionStorage.setItem("nik", response.data.nik);
        Swal.fire({
          icon: "success",
          title: "Anda berhasil login!",
          html: `Anda akan diarahkan ke halaman rangkaian `,
          timer: 2000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();

            const timerInterval = setInterval(() => {
              setCount((prevCount) => prevCount - 1);
            }, 1000);
            return () => clearInterval(timerInterval);
          },
          willClose: () => {
            router.push("/rangkaians");
          },
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Login Gagal!",
          html: `Cek nik dan password anda..`,
          timer: 2000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();

            const timerInterval = setInterval(() => {
              setCount((prevCount) => prevCount - 1);
            }, 1000);
            return () => clearInterval(timerInterval);
          },
          willClose: () => {},
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "failed",
        title: "Login Gagal!",
        html: `Cek user dan password anda..`,
        timer: 2000,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();

          const timerInterval = setInterval(() => {
            setCount((prevCount) => prevCount - 1);
          }, 1000);
          return () => clearInterval(timerInterval);
        },
        willClose: () => {},
      });
      console.error(error);
    }
  };

  return (
    <div>
      {" "}
      <section class="bg-primary-50 dark:bg-primary-900">
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <Image
            class="w-8 h-8 mr-2"
            src="https://mha.co.id/hogo/assets/images/brand/logo_long.png"
            width="400px"
            height="150px"
            alt="logo"
            onContextMenu={(e) => e.preventDefault()}
          />
          <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <h3 className="ext-xl font-bold leading-tight tracking-tight text-primary-900 md:text-2xl dark:text-white mb-5 mt-5 text-center">
              PLANT PERIODIC INSPECTION
            </h3>
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Login untuk masuk
              </h1>
              <form class="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label
                    for="email"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    NIK anda
                  </label>
                  <input
                    type="text"
                    name="nik"
                    id="nik"
                    value={nik}
                    onChange={(e) => setNik(e.target.value)}
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="contoh : 6885"
                    required=""
                  />
                </div>
                <div>
                  <label
                    for="password"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
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
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                  />
                </div>
                <div class="flex items-center justify-between">
                  <div class="flex items-start">
                    <div class="flex items-center h-5">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                        required=""
                      />
                    </div>
                    <div class="ml-3 text-sm">
                      <label
                        for="remember"
                        class="text-gray-500 dark:text-gray-300"
                      >
                        ingat saya
                      </label>
                    </div>
                  </div>
                  {/* <a
                    href="#"
                    class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Forgot password?
                  </a> */}
                </div>
                <button
                  type="submit"
                  class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-slate-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Sign in
                </button>
                {/* <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don’t have an account yet?{" "}
                  <a
                    href="#"
                    class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Sign up
                  </a>
                </p> */}
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

