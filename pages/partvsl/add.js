import AddForm from "../../components/CrudForm/add";

export default function addForm(data) {
  const isi = [
    {
      namakolom: [
        {
          nama: "idComponent",
          label: "ID Komponent",
          placeholder: "co: 1",
          type: "number",
        },
        {
          nama: "namaComponent",
          label: "Nama Komponen",
          placeholder: "co : ENGINE",
          type: "text",
        },
      ],
      fetchhttps: [
        { http: `https://example.nusastory.com/pi/partvsl`, var: "" },
      ],
      modalHead: [" Add Component Vessel"],
    },
  ];
  return (
    <div>
      <AddForm isi={isi} data={data} />
    </div>
  );
}

