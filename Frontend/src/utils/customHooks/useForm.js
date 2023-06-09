import { useState } from "react";
import useSessionStorage from "./useLocalStorage";

const useForm = (name, initialForm, validationForm) => {
  const [form, setForm] = useSessionStorage(name, initialForm);
  const [errors, setErrors] = useState({});

  const changeHandler = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
    setErrors(validationForm(form));
  };

  const checkedHandler = (event) => {
    const { name, checked } = event.target;
    setForm({
      ...form,
      [name]: checked,
    });
    setErrors(validationForm(form));
  };

  const validationsHandler = () => {
    setErrors(validationForm(form));
  };

  const resetHandler = () => {
    setForm(initialForm);
  };

  return {
    form,
    errors,
    setForm,
    setErrors,
    changeHandler,
    checkedHandler,
    resetHandler,
    validationsHandler,
  };
};

export default useForm;
