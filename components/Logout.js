import { useRouter } from "next/router";
import { useState } from "react";
import Swal from "sweetalert2";
export default function Logout() {
  const router = useRouter();
  const [count, setCount] = useState(5);
  const handleLogOut = () => {
    // event.preventDefault();
    sessionStorage.removeItem("nik");
    localStorage.clear();
    Swal.fire({
        icon: "success",
        title: "Anda berhasil logout!",
        html: `Anda akan diarahkan ke halaman login `,
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
          router.push("/");
        },
      });
  };

  return (
    <div className="mt-5">
      <button onClick={handleLogOut}  className="flex">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 mr-2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
          />
        </svg>
        Logout
      </button>
    </div>
  );
}

