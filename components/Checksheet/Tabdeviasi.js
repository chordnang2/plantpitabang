import { useState } from "react";

export default function Tabdeviasi({ item, options }) {
  const [sortingColumn, setSortingColumn] = useState("idParent");
  const [sortingDirection, setSortingDirection] = useState("ASC");
  const columns = {
    no: "NO",
    unit: "Unit",
    type: "Type",
    namaComponent: "Nama Component",
    itemInspeksi: "Item Inspeksi",
    temuanDeviasi: "Deviasi",
    keteranganDeviasi: "Keterangan Deviasi",
  };
  const [activeTab, setActiveTab] = useState(0);
  let rowCount = 1;

  return (
    <div>
      <div class="flex justify-center border-b border-gray-200">
        <button
          type="button"
          class={`${
            activeTab === 0
              ? "bg-primary text-white font-bold rounded-xl"
              : "text-gray-500 hover:text-gray-700"
          } px-6 py-3 w-full text-sm font-medium`}
          onClick={() => setActiveTab(0)}
        >
          VESSEL 1
        </button>
        <button
          type="button"
          class={`${
            activeTab === 1
              ? "bg-primary text-white font-bold rounded-xl"
              : "text-gray-500 hover:text-gray-700"
          } px-6 py-3 w-full text-sm font-medium`}
          onClick={() => setActiveTab(1)}
        >
          DOLLY
        </button>
        <button
          type="button"
          class={`${
            activeTab === 2
              ? "bg-primary text-white font-bold rounded-xl"
              : "text-gray-500 hover:text-gray-700"
          } px-6 py-3 w-full text-sm font-medium`}
          onClick={() => setActiveTab(2)}
        >
          VESSEL 2
        </button>
      </div>
      <div class="flex flex-col mt-2">
        {activeTab === 0 && (
          <div class="overflow-x-auto">
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
                    {options.map((option, index) => {
                      if (option.type === "vsl1") {
                        return (
                          <tr key={option.id}>
                            <td className="whitespace-nowrap px-6 py-4 font-medium">
                              {rowCount++}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {item.unitCode}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {option.type === "vsl1"
                                ? "VESSEL 1"
                                : option.type === "vsl2"
                                ? "VESSEL 2"
                                : option.type === "dl"
                                ? "DOLLY"
                                : option.type}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {option.namaComponent}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {option.itemInspeksi}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {option.temuanDeviasi}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {option.keteranganDeviasi}
                            </td>
                          </tr>
                        );
                      }
                      return null; // Skip rendering if option.type is not 'vsl1'
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
        {activeTab === 1 && (
          <div class="overflow-x-auto">
            {" "}
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
                    {options.map((option) => {
                      if (option.type === "dl") {
                        return (
                          <tr key={option.id}>
                            <td className="whitespace-nowrap px-6 py-4 font-medium">
                              {rowCount++}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {item.unitCode}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {option.type === "vsl1"
                                ? "VESSEL 1"
                                : option.type === "vsl2"
                                ? "VESSEL 2"
                                : option.type === "dl"
                                ? "DOLLY"
                                : option.type}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {option.namaComponent}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {option.itemInspeksi}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {option.temuanDeviasi}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {option.keteranganDeviasi}
                            </td>
                          </tr>
                        );
                      }
                      return null; // Skip rendering if option.type is not 'vsl1'
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
        {activeTab === 2 && (
          <div class="overflow-x-auto">
            {" "}
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
                    {options.map((option, index) => {
                      if (option.type === "vsl2") {
                        return (
                          <tr key={option.id}>
                            <td className="whitespace-nowrap px-6 py-4 font-medium">
                              {rowCount++}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {item.unitCode}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {option.type === "vsl1"
                                ? "VESSEL 1"
                                : option.type === "vsl2"
                                ? "VESSEL 2"
                                : option.type === "dl"
                                ? "DOLLY"
                                : option.type}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {option.namaComponent}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {option.itemInspeksi}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {option.temuanDeviasi}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {option.keteranganDeviasi}
                            </td>
                          </tr>
                        );
                      }
                      return null; // Skip rendering if option.type is not 'vsl1'
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
