import { useState } from "react";

function useInput(property) {
  const [value, setValue] = useState(property);
  function onChange(event) {
    setValue(event.target.value);
  }

  function clearInput() {
    setValue("");
  }
  return { value, onChange, clearInput };
}

export default useInput;
