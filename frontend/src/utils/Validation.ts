// utils/validation.ts

export function ValidateField(
  value: string,
  section: "miniBusiness" | "ltd_company" | 'both',
  field: string,
  setErrors: any
) {
  let isValid = true;

  if (!value) {
    setErrors((prev: any) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: "This Field is required",
      },
    }));
    isValid = false;
  } else {
    setErrors((prev: any) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: "",
      },
    }));
  }

  return isValid;
}