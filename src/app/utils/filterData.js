export default function filterData(searchWord, data) {
  const firstArray = data[0].filter((val) => {
    let name = val.name.toLowerCase();
    let description = val.description?.toLowerCase();

    return (name || description).includes(searchWord);
  });

  const secondArray = data[1].filter((val) => {
    let name = val.name.toLowerCase();
    let description = val.description?.toLowerCase();

    return (name || description).includes(searchWord);
  });

  const thirdArray = data[2].filter((val) => {
    let name = val.name.toLowerCase();
    let description = val.description?.toLowerCase();

    return (name || description).includes(searchWord);
  });

  const fourthArray = data[3].filter((val) => {
    let name = val.name.toLowerCase();
    let brand = val.brand?.toLowerCase();
    let model = val.model?.toLowerCase();
    let description = val.description?.toLowerCase();

    return (name || brand || model || description).includes(searchWord);
  });

  return { firstArray, secondArray, thirdArray, fourthArray };
}
