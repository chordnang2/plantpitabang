import { useEffect, useState } from "react";
import AddUpdateForm from "../../components/AddUpdateForm";
import { useRouter } from "next/router";
import axios from "axios";
import Swal from "sweetalert2";

export default function addForm(data) {
  const [dataRangkaian, setDataRangkaian] = useState(data);
  const [modal, setModal] = useState(false);
  const [isMutating, setIsMutating] = useState(false);
  const router = useRouter();
  const namaKoloms = data.isi[0].namakolom;
  const fecthHttps = data.isi[0].fetchhttps;
  const modalHeads = data.isi[0].modalHead;
  const kolomForm = (() => {
    if ((namaKoloms.length > namaKoloms.length / 2) | 0) {
      return (
        <div>
          {namaKoloms
            .slice((namaKoloms.length / 2) | 0, namaKoloms.length)
            .map((item) => {
              return (
                <AddUpdateForm
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
  function handleChange() {
    setAxiosItem([]) // clear input ketika modal dibuka, bisa di masukkan data yang akan di buka
    setModal(!modal);
  }
  
  // const axiosItem = {};
  // namaKoloms.forEach((itemNamaKoloms) => {
  //   axiosItem[itemNamaKoloms.nama] = dataRangkaian[itemNamaKoloms.nama];
  // });
  
  const [axiosItem, setAxiosItem] = useState([]) // hook untuk menyimpan input
  // useEffect(() => {
  //   let arr = []
  //   namaKoloms.forEach((itemNamaKoloms) => {
  //     arr.concat({[itemNamaKoloms.nama]: dataRangkaian[itemNamaKoloms.nama]})
  //   });
  //   setAxiosItem(arr)
  // }, [])
  
  console.log(axiosItem);
  function setRangkaianTransferData(data) {
    setAxiosItem({...axiosItem, ...data}) // simpan hasil input ke dalam sini, input yg ada di hook tinggal di panggil di axios
    // setDataRangkaian({ ...dataRangkaian.data, ...data });
  }
  
  async function handleCreate(e) {
    e.preventDefault();
    setIsMutating(true);

    try {
      await axios.post(fecthHttps[0].http + fecthHttps[0].var, axiosItem);
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
              {modalHeads}
              {/* {console.log(axiosItem)} */}
            </h3>
            <form onSubmit={handleCreate}>
              {/* case */}
              <div className="flex">
                <div className="pr-10">
                  {namaKoloms.slice(0, namaKoloms.length/2|0).map((data) => {
                    return (
                      <AddUpdateForm
                        data={dataRangkaian[data.nama]}
                        dataplaceholder={dataRangkaian[data.placeholder]}
                        datakolom={data}
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

