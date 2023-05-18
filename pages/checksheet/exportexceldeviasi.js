import { useState } from "react";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import moment from "moment";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExcel } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
const { library, config } = require("@fortawesome/fontawesome-svg-core");

export default function Exportexceldeviasi() {
  library.add(faFileExcel);
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";
  const fileName = "DEVIASI TANGGAL " + moment().format("YYYY-MM-DD");
  const [loading, setLoading] = useState(false);
  const exportFile = async () => {
    setLoading(true);
    await axios
      .get(`https://example.nusastory.com/pi/exceldeviasi`)
      .then((response) => {
        const dataJson = response.data.data;
        // change dan replace
        const arrayObjekBaru = dataJson.map((objek) => {
          const date = moment(objek["DATE"]).format("YYYY-MM-DD");
          objek["DATE"] =
            date !== "Invalid date" ? date : objek["DATE"];

          return objek;
        });
        const ws = XLSX.utils.json_to_sheet(arrayObjekBaru);
        const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
        const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
        const data = new Blob([excelBuffer], { type: fileType });
        FileSaver.saveAs(data, fileName + fileExtension);
        setLoading(false);
      })
      .catch((error) => {
        alert("kesalahan server");
        // console.log(error.config);
        setLoading(false);
      });
  };
  return (
    <div>
      {" "}
      <button
        onClick={exportFile}
        disabled={loading}
        class="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded mr-3 mb-2 w-60"
      >
        <FontAwesomeIcon className="mr-1" icon={faFileExcel} />
        Export Excel Deviasi
      </button>
    </div>
  );
}
