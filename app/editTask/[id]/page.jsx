import EditTaskForm from "@/components/EditTaskForm";

const getTaskById = async (id) => {
  const APP_URL = process.env.NEXT_PUBLIC_API_URL;

  try {
    const res = await fetch(`${APP_URL}/api/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch Task");
    }

    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export default async function EditTask({ params }) {
  const { id } = params;
  const { task } = await getTaskById(id);
  const { title, memo } = task;
  console.log(title, memo);
  console.log(title, memo);
  return <EditTaskForm id={id} title={title} memo={memo} />;
}
