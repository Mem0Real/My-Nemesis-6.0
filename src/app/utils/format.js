import FormData from "form-data";

export default function formatData(data) {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    formData.append(key, value);
  });
  return formData;
}
