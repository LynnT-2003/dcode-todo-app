import EditTopicForm from "@/components/EditTopicForm";

export default function EditTask() {
  return (
    <>
      <form className="flex flex-col gap-3">
        <input
          className="border border-slate-500 px-8 py-2 gap-3 form-control"
          type="text"
          placeholder="Task Title"
        />

        <input
          className="border border-slate-500 px-8 py-2 gap-3 form-control"
          type="text"
          placeholder="Task Memo"
        />

        <button className="bg-green-100 font-bold color-white py-2 px-6 w-fit ">
          Update Task
        </button>
      </form>
      ;
    </>
  );
}
