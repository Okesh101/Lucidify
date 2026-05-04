// utils/validation.ts

export function ValidateField(
  value: string,
  section: "miniBusiness" | "ltd_company",
  field: string,
  setErrors: any
) {
  let isValid = true;

  if (!value.trim()) {
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