import { createContext } from "react";
import { useState } from "react";
import { stages } from "../utils/constants";

export const FormDataContext = createContext({});

const FormDataProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    workTime: stages.workTime / 60,
    danceTime: stages.danceTime / 60,
    quietTime: stages.quietTime / 60,
  });
  const value = {
    formData,
    setFormData,
  };
  return (
    <FormDataContext.Provider value={value}>
      {children}
    </FormDataContext.Provider>
  );
};

export default FormDataProvider;
