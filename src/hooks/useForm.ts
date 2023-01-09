import { useState, ChangeEvent } from 'react';

type UseFormType = {
  [key: string]: string;
};

export function useForm(inputValues: UseFormType) {
  const [values, setValues] = useState<UseFormType>(inputValues);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setValues({ ...values, [name]: value });
  };
  return { values, handleChange, setValues };
}
