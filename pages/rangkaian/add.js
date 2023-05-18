import AddForm from "../../components/CrudForm/add";

export default function addForm(data) {
  const isi = [
    {
      namakolom: [
        {
          nama: "noUnit",
          label: "Nomer Unit",
          placeholder: "co: 800",
          type: "text",
        },
        {
          nama: "pm",
          label: "Primeover",
          placeholder: "co: PM-800",
          type: "text",
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
        {
          nama: "status",
          label: "Status",
          placeholder: "co: OPERASI CHR-BT",
          type: "text",
        },
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
          type: "text",
        },
        {
          nama: "tipeVessel",
          label: "Tipe Vessel",
          placeholder: "co: SST 82 - 82",
          type: "text",
        },
        {
          nama: "merkVessel",
          label: "Merk Vessel",
          placeholder: "co: Patria",
          type: "text",
        },
        {
          nama: "deviceFms",
          label: "Device FMS",
          placeholder: "co: Sudah Instal ",
          type: "text",
        },
      ],
      fetchhttps: [
        { http: `https://example.nusastory.com/pi/rangkaian/`, var: "" },
      ],
      modalHead: [" Add rangkaian unit"],
    },
  ];
  return (
    <div>
      <AddForm isi={isi} data={data} />
    </div>
  );
}

