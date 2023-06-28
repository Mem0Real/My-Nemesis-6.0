import FormData from "form-data";

export default function formatData(data) {
  const formData = new FormData();

  console.log(data);
  if (data.entry !== "items") {
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });

    return formData;
  } else {
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
}
