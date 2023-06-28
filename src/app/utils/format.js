import FormData from "form-data";

export default function formatData(data) {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (key === "newImage") {
      value.forEach((image) => {
        formData.append(image.name, image);
      });
    }
    formData.append(key, value);
  });
  return formData;
}
