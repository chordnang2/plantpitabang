import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";

export default function jobcardForm(item) {
  const [sortingColumn, setSortingColumn] = useState("idParent");
  const [sortingDirection, setSortingDirection] = useState("ASC");
  const [modal, setModal] = useState(false);
  const [options, setOptions] = useState([]); // state to store options
  useEffect(() => {
    axios
      .get(`https://example.nusastory.com/pi/spv/jobcard/${item.idParent}`)
      .then((response) => {
        setOptions(response.data);
      })
      .catch((error) => {
        // console.log(error);
      });
  }, []);

  function handleChange() {
    setModal(!modal);
  }
  const message = `Jobcard dari checksheet ${
    item.typeChecksheet === "pm" ? "Primeover" : "Vessel"
  }, unit ${item.unitCode},Tanggal ${moment(item.date).format("DD/MM/YY")}`;

  const columns = {
    no: "NO",
    kodeMasalah: "Kode Masalah",
    deskripsiMasalah: "Deskripsi Masalah",
    kodeObyek: "Kode Obyek",
    deskripsiObject: "Deskripsi Obyek",
    kodePenyebab: "Kode Penyebab",
    deskripsiPenyebab: "Deskripsi Penyebab",
    kodeAktivitas: "Kode Aktifitas",
    deskripsiAktivitas: "Deskripsi Aktifitas",
  };
  return (
    <div className="mb-2">
      <button
        className="flex space-x-3 items-center px-5 py-1 bg-pink-500 hover:bg-pink-900 rounded-full drop-shadow-md w-36"
        onClick={handleChange}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="white"
          class="w-4 h-4"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span className="text-white text-right font-bold">Jobcard</span>
      </button>
      <input
        type="checkbox"
        checked={modal}
        onChange={handleChange}
        className="modal-toggle"
      />

      {modal && (
        <div className="modal">
          <div className="modal-box-jobcard modal-content">
            <div class="flex flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
              <h5
                class="text-xl font-medium leading-normal text-primary"
                id="exampleModalCenteredScrollableLabel"
              >
                {message}
              </h5>
              <button
                type="button"
                class="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                data-te-modal-dismiss
                aria-label="Close"
                onClick={handleChange}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="h-6 w-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div class="flex ">
              <div>
                <table class="">
                  <thead>
                    <tr>
                      {Object.keys(columns).map((ck) => (
                        <th key={ck} onClick={() => updateSorting(ck)}>
                          {columns[ck]}
                          {sortingColumn === ck
                            ? sortingDirection === "ASC"
                              ? "↓"
                              : "↑"
                            : ""}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {options.data.map((option, index) => (
                      <tr key={option.id}>
                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                          {index + 1}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {option.kodeMasalah}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {option.deskripsiMasalah}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {option.kodeObyek}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {option.deskripsiObject}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {option.kodePenyebab}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {option.deskripsiPenyebab}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {option.kodeAktivitas}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {option.deskripsiAktivitas}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4"></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
