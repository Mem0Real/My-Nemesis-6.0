export default function SearchResults({
  filteredCategoryData,
  filteredParentData,
  filteredChildData,
  filteredItemData,
}) {
  function isObjEmpty(obj) {
    return Object.keys(obj).length === 0;
  }

  return (
    <div className="absolute h-56 top-7 left-1 py-6 w-80 text-center mt-5 overflow-y-scroll no-scrollbar bg-neutral-900 border border-t-0 border-neutral-200 rounded-xl rounded-t-none">
      <div className="flex flex-col gap-6">
        {!isObjEmpty(filteredCategoryData) && (
          <div className="flex flex-col itmes-start gap-4 border-b border-neutral-200">
            <h1 className="text-start md:ms-3 text-lg font-semibold underline w-full">
              Categories
            </h1>
            {filteredCategoryData?.map((category) => {
              return <p key={category.id}>{category.name}</p>;
            })}
          </div>
        )}
        {!isObjEmpty(filteredParentData) && (
          <div className="flex flex-col itmes-start gap-4 border-b border-neutral-200">
            <h1 className="text-start md:ms-3 text-lg font-semibold underline w-full">
              Parents
            </h1>
            {filteredParentData?.map((parent) => {
              return <p key={parent.id}>{parent.name}</p>;
            })}
          </div>
        )}
        {!isObjEmpty(filteredChildData) && (
          <div className="flex flex-col itmes-start gap-4 border-b border-neutral-200">
            <h1 className="text-start md:ms-3 text-lg font-semibold underline w-full">
              Children
            </h1>
            {filteredChildData?.map((child) => {
              return <p key={child.id}>{child.name}</p>;
            })}
          </div>
        )}
        {!isObjEmpty(filteredItemData) && (
          <div className="flex flex-col itmes-start gap-4 border-b border-neutral-200">
            <h1 className="text-start md:ms-3 text-lg font-semibold underline w-full">
              Products
            </h1>
            {filteredItemData?.map((item) => {
              return <p key={item.id}>{item.name}</p>;
            })}
          </div>
        )}
      </div>
    </div>
  );
}
