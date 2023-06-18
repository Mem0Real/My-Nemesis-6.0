import Image from "next/image";

export default function Home() {
  async function handleFormAction(formData) {
    "use server";

    const name = formData.get("name");
    const id = formData.get("id");
    const description = formData.get("description");
    console.log(name, id, description);
    // do something
  }
  return (
    <div className="flex flex-col min-h-screen justify-center items-center">
      <form
        action={handleFormAction}
        className="flex flex-col items-center justify-between gap-4"
      >
        <div className="relative z-0 w-2/3 mb-6 group">
          <input
            type="text"
            name="name"
            id="name"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder="Name"
            required
          />
        </div>
        <div className="relative z-0 w-2/3 mb-6 group">
          <input
            id="id"
            name="id"
            type="text"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder="Short Name"
          />
        </div>

        <div className="relative z-0 w-2/3 mb-6 group">
          <textarea
            cols={5}
            rows={5}
            id="description"
            name="description"
            type="text"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder="Description"
          />
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Save
        </button>
      </form>
    </div>
  );
}
