"use client";

function Edit({ update, params: { id } }) {
  async function action(formData) {
    await update(formData);
  }

  console.log(id);
  return (
    <div>
      <form
        action={action}
        className="flex-1 flex flex-col justify-center items-center gap-12"
      >
        <input name="id" type="text" hidden />
        <input
          name="name"
          type="text"
          className="block py-2.5 px-0 w-1/2 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder="Name"
        />
        <textarea
          name="description"
          type="text"
          className="block py-2.5 px-0 w-1/2 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder="Description"
        />
        <input
          id="image"
          name="image"
          type="file"
          className="block py-2.5 px-0 w-1/2 text-sm text-neutral-700 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Edit;
