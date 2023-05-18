import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Swal from "sweetalert2";
import Select from "react-select";
import makeAnimated from "react-select/animated";

export default function addForm(data) {
  const [modal, setModal] = useState(false);
  const [isMutating, setIsMutating] = useState(false);
  const router = useRouter();
  const [axiosItem, setAxiosItem] = useState([]); // hook untuk menyimpan input
  const [tanggal, setTanggal] = useState("");
  const [options, setOptions] = useState([]); // state to store options
  // console.log(options.data);
  useEffect(() => {
    // Fetch data from the API using axios and update the options state
    axios
      .get("https://example.nusastory.com/pi/multiplerangkaian")
      .then((response) => {
        setOptions(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const animatedComponents = makeAnimated();
  function handleChange() {
    setAxiosItem([]); // clear input ketika modal dibuka, bisa di masukkan data yang akan di buka
    setModal(!modal);
  }

  // const options = [];

  console.log(axiosItem);
  async function handleCreate(e) {
    e.preventDefault();
    setIsMutating(true);

    const payloads = axiosItem.map((item) => {
      const payload = { noUnit: item.value, tanggal: tanggal };
      return axios.post(`https://example.nusastory.com/pi/jadwal`, payload);
    });

    try {
      await Promise.all(payloads);
      setIsMutating(false);
      router.replace(router.asPath);
      setModal(false);
    } catch (error) {
      console.error(error);
      setIsMutating(false);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Terjadi error!",
        customClass: {
          container: "always-on-top",
        },
      });
    }
  }
  return (
    <div>
      <button
        className="h-8 px-3 py  text-sm text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800"
        onClick={handleChange}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      </button>
      <input
        type="checkbox"
        checked={modal}
        onChange={handleChange}
        className="modal-toggle"
      />

      {modal && (
        <div className="modal">
          <div className="modal-box text-center">
            <h3 className="font-bold text-lg pb-3 text-gray-700">
              Add jadwal unit
              {/* {console.log(axiosItem)} */}
            </h3>
            <form onSubmit={handleCreate}>
              {/* case */}
              <div className="">
                <div class="md:flex md:items-center mb-6">
                  <div class="md:w-1/3">
                    <label class="text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                      Nomer Unit
                    </label>
                  </div>
                  <div class="md:w-2/3">
                    <Select
                      className="bg-gray-100 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                      closeMenuOnSelect={false}
                      components={animatedComponents}
                      isMulti
                      options={options.data}
                      value={data.noUnit}
                      onChange={setAxiosItem}
                    />
                  </div>
                </div>
                <div class="md:flex md:items-center mb-6">
                  <div class="md:w-1/3">
                    <label class="text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                      Tanggal
                    </label>
                  </div>
                  <div class="md:w-2/3">
                    <input
                      class="bg-gray-100 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                      type="date"
                      value={tanggal}
                      onChange={(e) => setTanggal(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="modal-action">
                <button
                  type="button"
                  onClick={handleChange}
                  className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                >
                  Close
                </button>
                {!isMutating ? (
                  <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                  >
                    Create
                  </button>
                ) : (
                  <button type="button" className="btn loading">
                    Creating...
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

