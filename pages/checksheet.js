import Head from "next/head";
import Layout from "../components/Layout";
import { orderBy } from "lodash";
import { useState } from "react";
import moment from "moment";
import ReactPaginate from "react-paginate";

import ChecksheetForm from "../components/Checksheet/Checksheet";
import DeviasiForm from "../components/Checksheet/Deviasi";
import JobcardForm from "./checksheet/jobcard";

import axios from "axios";

import Exportexceldeviasi from "./checksheet/exportexceldeviasi";
import Exportexceljobcard from "./checksheet/exportexceljobcard";
import { useEffect } from "react";

export async function getStaticProps() {
  try {
    const res = await axios.get("https://example.nusastory.com/pi/checksheet");
    const rawData = res.data;
    const data = rawData.data.map((item) => ({
      ...item,
      date: moment(item.date).format("YYYY-MM-DD"),
    }));
    return {
      props: {
        data,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        data: [],
      },
    };
  }
}

export default function ChecksheetPage({ data }) {
  const [sortingColumn, setSortingColumn] = useState("date");
  const [sortingDirection, setSortingDirection] = useState("DESC");
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [options, setOptions] = useState([]); // state to store options
  const [selectedFilter, setSelectedFilter] = useState("showall");
  useEffect(() => {
    const availableDates = [...new Set(data.map((item) => item.date))];
    setOptions(["showall", ...availableDates]);
  }, [data]);
  const columns = {
    // idParent: "Nomer Checksheet",
    no: "No",
    unitCode: "Unit",
    vsl1: "Vessel 1",
    dl: "Dolly",
    vsl2: "Vessel 2",
    date: "Tanggal",
    hm: "HM",
    km: "KM",
    jamMulai: "Jam Mulai",
    jamSelesai: "Jam Selesai",
    mekanikName: "Mekanik",
    foremanName: "Foreman",
    supervisorName: "SPV",
    supervisorSign: "Status",
    typeChecksheet: "Type",
    detail: "Detail",
  };
  function updateSorting(column) {
    if (column === sortingColumn) {
      setSortingDirection((prev) => (prev === "ASC" ? "DESC" : "ASC"));
    }
    setSortingColumn(column);
  }
  const sortedData = orderBy(data, sortingColumn, [
    sortingDirection.toLowerCase(),
  ]);
  const filteredData = sortedData.filter((item) =>
    Object.values(item).some(
      (value) =>
        value &&
        value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );
  const offset = currentPage * perPage;
  const currentPageData = filteredData
    .filter(
      (item) =>
        selectedFilter === "showall" ||
        moment(item.date).format("YYYY-MM-DD") === selectedFilter
    )
    .slice(offset, offset + perPage);

  const pageCount = Math.ceil(filteredData.length / perPage);

  function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage);
  }

  function handleSearchChange(event) {
    setSearchQuery(event.target.value);
    setCurrentPage(0); // reset to first page after each search query change
  }

  return (
    <div>
      <Head>
        <title>Part PM</title>
      </Head>
      <Layout>
        <div className="flex mb-2">
          <div>
            <h1 className="text-primary text-xl font-bold mb-4 pr-3">
              Data Checksheet
            </h1>
          </div>
          <div>{/* <AddPartpm {...data} /> */}</div>
          <div className="flex ml-auto  justify-end items-center">
            <div>
              <Exportexceldeviasi />
              <Exportexceljobcard />
            </div>
            <div>
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={handleSearchChange}
                className=" mr-3 mb-2 w-80"
              />
              <div className="flex ml-auto justify-end items-center mr-3 mb-2 w-80">
                <span className="mr-2">Filter Tanggal:</span>
                <div className="w-48 mr-2">
                  <select
                    id="dates"
                    className="text-indigo text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-indigo-700 dark:border-indigo-600 dark:placeholder-indigo-400 dark:text-white"
                    value={selectedFilter}
                    onChange={(e) => setSelectedFilter(e.target.value)}
                  >
                    {options.map((date) => (
                      <option key={date} value={date}>
                        {date === "showall"
                          ? "Show All"
                          : moment(date).format("DD/MM/YYYY")}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              {Object.keys(columns).map((ck) => (
                <th key={ck} onClick={() => updateSorting(ck)}>
                  <div className="flex items-center justify-between">
                    {columns[ck]}
                    {sortingColumn === ck && (
                      <span>{sortingDirection === "DESC" ? " ▼" : " ▲"}</span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentPageData.map((item, index) => {
              let no = index + 1;
              return (
                <tr key={item.idcomponent}>
                  <td>{no}</td>
                  {Object.keys(item).map((key) => {
                    if (key === "detail") {
                      return <td key={key}>Detail</td>;
                    } else if (key === "date") {
                      return (
                        <td key={key}>
                          {moment(item[key]).format("DD/MM/YY")}
                        </td>
                      );
                    } else if (key === "version") {
                      return [];
                    } else if (key === "idJadwal") {
                      return [];
                    } else if (key === "supervisorName") {
                      return (
                        <td key={key}>
                          {item[key] != null ? item[key] : "KOSONG"}
                        </td>
                      );
                    } else if (key === "supervisorSign") {
                      return (
                        <td key={key}>
                          {item[key] === 0
                            ? "BELUM DI ACC"
                            : item[key] === 1
                            ? "SUDAH DI ACC"
                            : item[key]}
                        </td>
                      );
                    } else if (key === "typeChecksheet") {
                      return (
                        <td key={key} className="justify-items-center ">
                          <div
                            className={
                              item[key] === "pm"
                                ? " text-red-500 font-bold rounded-lg"
                                : item[key] === "vsl"
                                ? " text-yellow-500 font-bold rounded-lg"
                                : item[key]
                            }
                          >
                            {item[key] === "pm"
                              ? "PRIMEOVER"
                              : item[key] === "vsl"
                              ? "VESSEL"
                              : item[key]}
                          </div>
                        </td>
                      );
                    } else if (key === "idParent") {
                      return [];
                    } else {
                      return <td key={key}>{item[key]}</td>;
                    }
                  })}
                  <td className=" justify-center">
                    <ChecksheetForm {...item} />
                    <DeviasiForm {...item} />
                    <JobcardForm {...item} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <ReactPaginate
          pageCount={pageCount}
          onPageChange={handlePageClick}
          containerClassName="flex justify-center mt-6"
          pageClassName="mx-2 p-2 rounded-xl hover:bg-blue-400"
          activeClassName="bg-blue-400 text-white"
          previousClassName="mx-2 p-2 rounded-sm hover:bg-blue-400"
          nextClassName="mx-2 p-2 rounded-xl hover:bg-blue-400"
          disabledClassName="opacity-100"
        />
      </Layout>
    </div>
  );
}
