import { useState } from "react";
import Layout from "../components/Layout";
import { orderBy } from "lodash";
import Head from "next/head";
import UpdateRangkaian from "./rangkaian/update";
import AddRangkaian from "./rangkaian/add";
import DeleteRangkaian from "./rangkaian/delete";
import SessionValidation from "../components/SessionValidation";
import ReactPaginate from "react-paginate";
// import usePagination from "@mui/material/usePagination";
// import { TablePagination } from "@mui/material";

export async function getStaticProps() {
  try {
    const res = await fetch("https://example.nusastory.com/pi/rangkaian");
    const rawData = await res.json();
    const data = rawData.data.map((item, index) => ({
      id: index + 1,
      ...item,
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

export default function RangkaiansPage({ data }) {
  SessionValidation();

  const [sortingColumn, setSortingColumn] = useState("id");
  const [sortingDirection, setSortingDirection] = useState("ASC");
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const columns = {
    id: "ID",
    pm: "Primeover",
    vsl1: "Vessel 1",
    dl: "Dolly",
    vsl2: "Vessel 2",
    status: "Status",
    tipeDl: "TYPE DL",
    noUnit: "No Unit",
    merkPm: "Merk PM",
    tipeVessel: "Tipe Vessel",
    merkVessel: "Merk Vessel",
    deviceFms: "Device FMS",
    menu: "Menu",
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
  const currentPageData = filteredData.slice(offset, offset + perPage);

  const pageCount = Math.ceil(filteredData.length / perPage);

  function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage);
  }
  function handleSearchChange(event) {
    setSearchQuery(event.target.value);
    setCurrentPage(0); // reset to first page after each search query change
  }
  // console.log('parent',data);
  return (
    <div>
      <Head>
        <title>Rangkaian</title>
      </Head>
      <Layout>
        <div className="flex mb-2">
          <div>
            <h1 className="text-primary text-xl font-bold mb-4 pr-3">
              Data Rangkaian
            </h1>
          </div>
          <div>
            <AddRangkaian {...data} />
          </div>

          <div className="flex ml-auto justify-end items-center">
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={handleSearchChange}
              className=""
            />
          </div>
        </div>
        <table>
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
            {currentPageData.map((item) => (
              <tr key={item.id}>
                {Object.keys(item).map((key) => {
                  if (key === "id") {
                    return <td key={key}>{item[key]}</td>;
                  } else if (key === "menu") {
                    return <td key={key}>Menu</td>;
                  } else {
                    return <td key={key}>{item[key]}</td>;
                  }
                })}
                <td className="flex rounded">
                  <UpdateRangkaian {...item} />
                  <DeleteRangkaian {...item} />
                </td>
              </tr>
            ))}
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
          disabledClassName="opacity-50"
        />
      </Layout>
    </div>
  );
}

