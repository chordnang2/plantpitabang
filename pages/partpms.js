import { useState } from "react";
import Layout from "../components/Layout";
import { orderBy } from "lodash";
import Head from "next/head";
import AddPartpm from "./partpm/add";
import UpdatePartpm from "./partpm/update";
import DeletePartpm from "./partpm/delete";
import SessionValidation from "../components/SessionValidation";

export async function getStaticProps() {
  const res = await fetch("https://example.nusastory.com/pi/partpm");
  const rawData = await res.json();
  const data = rawData.data.map((item) => ({
    ...item,
  }));
  return {
    props: {
      data,
    },
  };
}

export default function PartPmPages({ data }) {
  SessionValidation();
  const [sortingColumn, setSortingColumn] = useState("idcomponent");
  const [sortingDirection, setSortingDirection] = useState("ASC");
  const columns = {
    idcomponent: "Id Component",
    namaComponent: "Nama Component",
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

  return (
    <div>
      <Head>
        <title>Part PM</title>
      </Head>
      <Layout>
        <div className="flex">
          <div>
            <h1 className="text-primary text-xl font-bold mb-4 pr-3">
              Data Component Primeover
            </h1>
          </div>
          <div>
            <AddPartpm {...data} />
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
            {sortedData.map((item) => (
              <tr key={item.idcomponent}>
                {Object.keys(item).map((key) => {
                  if (key === "menu") {
                    return <td key={key}>Menu</td>;
                  } else {
                    return <td key={key}>{item[key]}</td>;
                  }
                })}
                <td className="flex justify-center">
                  <UpdatePartpm {...item} />
                  <DeletePartpm {...item} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Layout>
    </div>
  );
}

