"use client";

function Edit({ update }) {
  async function action(formData) {
    await update(formData);
  }
  return (
    <div>
      <form
        action={action}
        // onSubmit={() => }
        className="flex-1 flex flex-col justify-center items-center gap-12"
      >
        <input name="entry" type="text" defaultValue={entry} hidden />
        <input name="id" type="text" defaultValue={id} hidden />
        <input
          name="name"
          type="text"
          className="block py-2.5 px-0 w-1/2 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder="Name"
          defaultValue={name}
        />
        <textarea
          name="description"
          type="text"
          className="block py-2.5 px-0 w-1/2 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder="Description"
          defaultValue={description}
        />
        <input
          id="image"
          name="image"
          type="file"
          className="block py-2.5 px-0 w-1/2 text-sm text-neutral-700 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          defaultValue={image}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Edit;
