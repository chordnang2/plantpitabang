import UpdateForm from "../../components/CrudForm/update";
export default function updateForm(item) {
  //   const tanggal = new Date(item.tanggal).toISOString().substring(0, 10); // new constant
  //   console.log(item.tanggal);
  const isi = [
    {
      namakolom: [
        // {
        //   nama: "idComponent",
        //   label: "ID Komponent",
        //   placeholder: "co: 1",
        //   type: "number",
        // },
        {
          nama: "namaComponent",
          label: "Nama Komponen",
          placeholder: "co : ENGINE",
          type: "text",
        },
      ],
      fetchhttps: [
        {
          http: `https://example.nusastory.com/pi/partpm/`,
          var: item.idComponent,
        },
      ],
      modalHead: [" Edit Component Primeover" + item.idComponent],
      schemaExcludedItem: [""],
      includedFieldInt: [""],
    },
  ];
  return (
    <div>
      <UpdateForm isi={isi} item={item} />
    </div>
  );
}

