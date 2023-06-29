import FormData from "form-data";

export default function formatData(data) {
  const formData = new FormData();
  if (data.entry !== "items") {
    Object.entries(data).forEach(([key, value]) => {
      value && formData.append(key, value);
    });

    return formData;
  } else {
    Object.entries(data).forEach(([key, value]) => {
      if (key === "newImage" || key === "image") {
        value.forEach((image) => {
          image && formData.append(image.name, image);
        });
      }
      value && formData.append(key, value);
    });
    return formData;
  }
}
