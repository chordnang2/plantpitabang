import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { orderBy } from "lodash";
import Head from "next/head";
import AddJadwal from "./jadwal/add";
import UpdateJadwal from "./jadwal/update";
import DeleteJadwal from "./jadwal/delete";
import SessionValidation from "../components/SessionValidation";
import moment from "moment";

export async function getStaticProps() {
  try {
    const res1 = await fetch("https://example.nusastory.com/pi/jadwal");
    const rawData1 = await res1.json();

    const data = rawData1.data.map((item, index) => ({
      id: index + 1,
      ...item,
    }));

    const tanggalList = rawData1.tanggal;
    return {
      props: {
        data,
        tanggalList,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        data: [],
        tanggalList: [],
      },
    };
  }
}

export default function JadwalsPage({ data, tanggalList }) {
  const startDateOk = tanggalList.startDate;
  const endDateOk = tanggalList.endDate;
  const startDate = new Date(startDateOk);
  const endDate = new Date(endDateOk);
  let dateList = [];
  let currentDate = startDate;
  while (currentDate <= endDate) {
    dateList.push(currentDate.toISOString().slice(0, 10));
    currentDate = new Date(currentDate.getTime() + 86400000); // add 1 day in milliseconds
  }
  const [selectedDate, setSelectedDate] = useState(dateList[0]);
  function handleDateChange(e) {
    const value = e.target.value;
    setSelectedDate(value);
    if (value === "") {
      return;
    }
  }
  SessionValidation();
  const [sortingColumn, setSortingColumn] = useState("id");
  const [sortingDirection, setSortingDirection] = useState("ASC");
  const columns = {
    id: "ID",
    codeUnit: "Code Unit",
    vsl1: "Vessel 1",
    dl: "Dolly",
    vsl2: "Vessel 2",
    tanggal: "Tanggal",
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

  const filteredData =
    selectedDate === "showall"
      ? sortedData
      : sortedData.filter((item) => {
          return moment(item.tanggal).format("YYYY-MM-DD") === selectedDate;
        });
  return (
    <div>
      <Head>
        <title>Jadwal</title>
      </Head>
      <Layout>
        <div className="flex mb-2">
          <div>
            <h1 className="text-primary text-xl font-bold mb-4 pr-3">
              Data Jadwal PI
            </h1>
          </div>
          <div>
            <AddJadwal {...data} />
          </div>
          <div className="flex ml-auto justify-end items-center">
            <span className="mr-2">Filter Tanggal:</span>
            <div className="w-48">
              <select
                id="dates"
                value={selectedDate}
                onChange={handleDateChange}
                className="text-indigo text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-indigo-700 dark:border-indigo-600 dark:placeholder-indigo-400 dark:text-white"
              >
                <option value="showall">Show All</option>
                {dateList.map((date) => (
                  <option key={date} value={date}>
                    {moment(date).format("DD/MM/YYYY")}
                  </option>
                ))}
              </select>
            </div>
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
            {filteredData.map((item, index) => {
              let id = index + 1;

              return (
                <tr key={item.id}>
                  <td>{id}</td>
                  {Object.keys(item).map((key) => {
                    if (key === "id") {
                      return null;
                    } else if (key === "menu") {
                      return <td key={key}>Menu</td>;
                    } else if (key === "tanggal") {
                      const dateObj = new Date(item.tanggal);
                      const formattedDate = dateObj.toLocaleDateString("id-ID");

                      return <td key={key}>{formattedDate}</td>;
                    } else {
                      return <td key={key}>{item[key]}</td>;
                    }
                  })}
                  <td className="flex justify-center">
                    <UpdateJadwal {...item} />

                    <DeleteJadwal {...item} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Layout>
    </div>
  );
}

