import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/router";

export default function SessionValidation() {
  const router = useRouter();
  const [count, setCount] = useState(5);

  useEffect(() => {
    const nikSession = sessionStorage.getItem("nik");

    if (!nikSession) {
      Swal.fire({
        icon: "error",
        title: "Anda belum login!",
        html: `Silahkan login terlebih dahulu`,
        timer: 3000,
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
    }
  }, []);
}
