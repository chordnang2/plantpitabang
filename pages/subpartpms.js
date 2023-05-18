import { useState } from "react";
import Layout from "../components/Layout";
import { orderBy } from "lodash";
import Head from "next/head";
import AddSubPartpm from "./subpartpm/add";
import UpdateSubPartpm from "./subpartpm/update";
import DeleteSubPartpm from "./subpartpm/delete";
import SessionValidation from "../components/SessionValidation";


export async function getStaticProps() {
  const res = await fetch("https://example.nusastory.com/pi/subpartpm");
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

export default function SubPartPmPages({ data }) {
  SessionValidation();
  const [sortingColumn, setSortingColumn] = useState("idSubComponent");
  const [sortingDirection, setSortingDirection] = useState("ASC");
  const columns = {
    idSubComponent: "Id Sub Component",
    itemInspeksi: "Item Inspeksi",
    idComponent: "Id Component",
    menu: "Menu",
  };

  function updateSorting(column) {
    if (column === sortingColumn) {
      setSortingDirection((prev) => (prev === "ASC" ? "DESC" : "ASC"));
    }
    setSortingColumn(column);
  }

  function handleUpdate(id) {
    console.log(`Update item with ID ${id}`);
  }

  const sortedData = orderBy(data, sortingColumn, [
    sortingDirection.toLowerCase(),
  ]);

  return (
    <div>
      <Head>
        <title>SubComponent PM</title>
      </Head>
      <Layout>
      <div className="flex">
          <div>
            <h1 className="text-primary text-xl font-bold mb-4 pr-3">
              Data SubComponent Primeover
            </h1>
          </div>
          <div>
            <AddSubPartpm {...data} />
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
              <tr key={item.idSubComponent}>
                {Object.keys(item).map((key) => {
                  if (key === "menu") {
                    return <td key={key}>Menu</td>;
                  } else {
                    return <td key={key}>{item[key]}</td>;
                  }
                })}
                <td className="flex justify-center">
                  <UpdateSubPartpm {...item} />
                  <DeleteSubPartpm {...item} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Layout>
    </div>
  );
}

