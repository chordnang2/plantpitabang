import moment from "moment";
import UpdateForm from "../../components/CrudForm/update";
export default function updateForm(item) {
  //   const tanggal = new Date(item.tanggal).toISOString().substring(0, 10); // new constant
  // console.log(item);
  const formattedDate = moment(item.tanggal).format("YYYY-MM-DD");

  const isi = [
    {
      namakolom: [
        {
          nama: "codeUnit",
          label: "Nomer Unit",
          placeholder: "co: 700",
          type: "number",
        },
        {
          nama: "tanggal",
          label: "Tanggal",
          placeholder: "",
          type: "date",
        },
        {
          nama: "vsl1",
          label: "Vessel 1",
          placeholder: "co: 1000",
          type: "text",
        },
        { nama: "dl", label: "Dolly", placeholder: "co: 1000", type: "text" },
        {
          nama: "vsl2",
          label: "Vessel 2",
          placeholder: "co: 1000",
          type: "text",
        },
      ],
      fetchhttps: [
        {
          http: `https://example.nusastory.com/pi/jadwal/`,
          var: item.id,
        },
      ],
      modalHead: [" Edit jadwal unit" + item.id],
      schemaExcludedItem: [""],
      includedFieldInt: [""],
    },
  ];
  const updatedItem = { ...item, tanggal: formattedDate };
  return (
    <div>
      <UpdateForm isi={isi} item={updatedItem} />
    </div>
  );
}

