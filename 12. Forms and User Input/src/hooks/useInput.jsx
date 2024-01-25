import { useState } from 'react';

export const useInput = (defaultValue, validationFn) => {
  const [value, setValue] = useState(defaultValue);
  const [isEditing, setIsEditing] = useState(true);

  const isValid = isEditing || validationFn(value);

  const handleInputChange = (event) => {
    setValue(event.target.value);
    setIsEditing(true);
  };

  const handleInputBlur = () => {
    setIsEditing(false);
  };

  return {
    value,
    isValid,
    handleInputChange,
    handleInputBlur,
  };
};
