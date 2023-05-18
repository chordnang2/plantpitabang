import UpdateForm from "../../components/CrudForm/update";
export default function updateForm(item) {
  //   const tanggal = new Date(item.tanggal).toISOString().substring(0, 10); // new constant
  //   console.log(item.tanggal);
  const isi = [
    {
      namakolom: [
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
        {
          http: `https://example.nusastory.com/pi/subpartpm/`,
          var: item.idSubComponent,
        },
      ],
      modalHead: [" Edit SubComponent Primeover" + item.idSubComponent],
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

