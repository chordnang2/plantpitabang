import { useState } from "react";
import { useRouter } from "next/router";
import StyleForm from "../../components/AddUpdateForm";
import * as Yup from "yup";
import axios from "axios";
import Swal from "sweetalert2";
export default function UpdateForm(item) {
  // console.log(item);
  const [dataRangkaian, setDataRangkaian] = useState(item.item);
  const [modal, setModal] = useState(false);
  const [isMutating, setIsMutating] = useState(false);
  const router = useRouter();
  const namaKoloms = item.isi[0].namakolom;
  const fecthHttps = item.isi[0].fetchhttps;
  const modalHeads = item.isi[0].modalHead;
  const schemaExcludedItems = item.isi[0].schemaExcludedItem;

  const includedFieldInts = item.isi[0].includedFieldInt;
  const schemaItem = namaKoloms.reduce((acc, curr) => {
    if (schemaExcludedItems.includes(curr.nama)) {
      return acc;
    }

    let yupField = Yup.string().required();

    if (includedFieldInts.includes(curr.nama)) {
      yupField = yupField.matches(/^[0-9]+$/, {
        excludeEmptyString: true,
      });
    }

    return {
      ...acc,
      [curr.nama]: yupField,
    };
  }, {});
  // if (item.tanggal) {
  //   item.tanggal = item.tanggal.substring(0, 10); // change datetime to date
  //   console.log(item);
  // }
  const schema = Yup.object().shape(schemaItem);
  const axiosItem = {};
  namaKoloms.forEach((itemNamaKoloms) => {
    axiosItem[itemNamaKoloms.nama] = dataRangkaian[itemNamaKoloms.nama];
  });
  
  async function handleUpdate(e) {
    e.preventDefault();
    setIsMutating(true);

    try {
      await schema.validate(dataRangkaian);
      const response = await axios.patch(
        fecthHttps[0].http + fecthHttps[0].var,
        axiosItem
      );
      console.log(response);
      setIsMutating(false);
      router.replace(router.asPath);
      setModal(false);
    } catch (error) {
      console.error(error);
      setIsMutating(false);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Terjadi error atau ada kolom yang kosong!",
        customClass: {
          container: "always-on-top",
        },
      });
    }
  }

  function handleChange() {
    setModal(!modal);
  }
  function setRangkaianTransferData(item) {
    setDataRangkaian({ ...dataRangkaian, ...item });
  }
  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  const kolomForm = (() => {
    if ((namaKoloms.length > namaKoloms.length / 2) | 0) {
      return (
        <div>
          {namaKoloms
            .slice((namaKoloms.length / 2) | 0, namaKoloms.length)
            .map((item) => {
              return (
                <StyleForm
                  data={dataRangkaian[item.nama]}
                  datakolom={item}
                  onButtonPress={setRangkaianTransferData}
                />
              );
            })}
        </div>
      );
    }
  })();
  // console.log(item.item.tanggal);
  return (
    <div>
      <button className="update-button" onClick={handleChange}>
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
            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
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
          <div className="modal-box">
            <h3 className="font-bold text-lg pb-5">{modalHeads}</h3>
            <form onSubmit={handleUpdate}>
              {/* case */}
              <div className="flex">
                <div className="pr-10">
                  {namaKoloms
                    .slice(0, (namaKoloms.length / 2) | 0)
                    .map((item) => {
                      // Modify the tanggal property if it exists and is not in the desired format
                      const data = { ...dataRangkaian };
                      if (item.nama === "tanggal") {
                        const formattedTanggal = formatDate(
                          dataRangkaian.tanggal
                        );
                        data.tanggal = formattedTanggal;
                      }
                      return (
                        <StyleForm
                          data={data[item.nama]}
                          datakolom={item}
                          onButtonPress={setRangkaianTransferData}
                        />
                      );
                    })}
                </div>
                {kolomForm}
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
                    Update
                  </button>
                ) : (
                  <button type="button" className="btn loading">
                    Updating...
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

