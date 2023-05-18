import { useState } from "react";
import Layout from "../components/Layout";
import { orderBy } from "lodash";
import Head from "next/head";
import AddSubPartvsl from "./subpartvsl/add";
import UpdateSubPartvsl from "./subpartvsl/update";
import DeleteSubPartvsl from "./subpartvsl/delete";
import SessionValidation from "../components/SessionValidation";

export async function getStaticProps() {
  const res = await fetch("https://example.nusastory.com/pi/subpartvsl");
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

export default function SubPartVslPages({ data }) {
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


  const sortedData = orderBy(data, sortingColumn, [
    sortingDirection.toLowerCase(),
  ]);

  return (
    <div>
      <Head>
        <title>SubComponent Vsl</title>
      </Head>
      <Layout>
        <div className="flex">
          <div>
            <h1 className="text-primary text-xl font-bold mb-4 pr-3">
              Data SubComponent Vessel
            </h1>
          </div>
          <div>
            <AddSubPartvsl {...data} />
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
                <td className="">
                <td className="flex justify-center">
                  <UpdateSubPartvsl {...item} />
                  <DeleteSubPartvsl {...item} />
                </td>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Layout>
    </div>
  );
}

