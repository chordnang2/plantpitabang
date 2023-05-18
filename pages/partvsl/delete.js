import DeleteForm from "../../components/CrudForm/delete";

export default function deleteForm(item) {
  const isi = [
    {
      fetchhttps: [
        {
          http: `https://example.nusastory.com/pi/partvsl/`,
          var: item.idComponent,
        },
      ],
    },
  ];
  return (
    <div>
      <DeleteForm isi={isi} item={item} />
    </div>
  );
}

