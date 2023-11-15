import React from "react";

export function useInput(initialValue) {
  const [values, setValues] = React.useState(initialValue);

  const onChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  return {
    values,
    onChange,
  };
}
