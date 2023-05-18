import AddForm from "../../components/CrudForm/add";

export default function addForm(data) {
  const isi = [
    {
      namakolom: [
        {
          nama: "idSubComponent",
          label: "ID Sub Komponent",
          placeholder: "co: 1",
          type: "number",
        },
        {
          nama: "itemInspeksi",
          label: "Item Inspeksi",
          placeholder: "co : ENGINE",
          type: "text",
        },
        {
          nama: "idComponent",
          label: "Id Part Utama",
          placeholder: "co : ENGINE",
          type: "text",
        },
      ],
      fetchhttps: [
        { http: `https://example.nusastory.com/pi/subpartvsl`, var: "" },
      ],
      modalHead: [" Add SubComponent Vessel"],
    },
  ];
  return (
    <div>
      <AddForm isi={isi} data={data} />
    </div>
  );
}

