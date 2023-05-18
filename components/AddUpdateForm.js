import { useState } from "react";
function AddUpdateForm(props) {
  const d = props.data;
  const [data, setData] = useState(d);

  // const ph = props.dataplaceholder;
  // const [dataplaceholder, setDataPlaceholder] = useState(ph);
  function buttonClick(item) {
    props.onButtonPress({ [props.datakolom.nama]: item });
  }
  // console.log(props.datakolom.placeholder)
  return (
    <div class="md:flex md:items-center mb-6">
      <div class="md:w-1/3">
        <label class="text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
          {props.datakolom.label}
        </label>
      </div>
      <div class="md:w-2/3">
        <input
          class="bg-gray-100 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
          type={props.datakolom.type}
          value={data}
          onChange={(e) => {
            setData(e.target.value);
            buttonClick(e.target.value);
          }}
          placeholder={props.datakolom.placeholder}
        />
      </div>
    </div>
  );
}

export default AddUpdateForm;

