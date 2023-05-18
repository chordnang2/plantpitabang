import UpdateForm from "../../components/CrudForm/update";

export default function updateForm(item) {
  const isi = [
    {
      namakolom: [
        { nama: "pm", label: "Primeover", placeholder: "co: PM-800" },
        { nama: "vsl1", label: "Vessel 1", placeholder: "co: 1000" },
        { nama: "dl", label: "Dolly", placeholder: "co: 1000" },
        { nama: "vsl2", label: "Vessel 2", placeholder: "co: 1000" },
        { nama: "status", label: "Status", placeholder: "co: OPERASI CHR-BT" },
        {
          nama: "tipeDl",
          label: "TYPE DL",
          placeholder: "co: DL 40",
          type: "text",
        },
        {
          nama: "merkPm",
          label: "Merk Primeover",
          placeholder: "co: Scania R 580 V8",
        },
        {
          nama: "tipeVessel",
          label: "Tipe Vessel",
          placeholder: "co: SST 82 - 82",
        },
        { nama: "merkVessel", label: "Merk Vessel", placeholder: "co: Patria" },
        {
          nama: "deviceFms",
          label: "Device FMS",
          placeholder: "co: Sudah Instal ",
        },
      ],
      fetchhttps: [
        {
          http: `https://example.nusastory.com/pi/rangkaian/`,
          var: item.noUnit,
        },
      ],
      modalHead: ["Edit rangkaian unit " + item.noUnit],
      schemaExcludedItem: ["tipeDl"],
      includedFieldInt: ["vsl1", "dl", "vsl2"],

    },
  ];
  return (
    <div>
      <UpdateForm isi={isi} item={item} />
    </div>
  );
}

