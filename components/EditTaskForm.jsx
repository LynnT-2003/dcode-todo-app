"use client"; // client component
import { headers } from "next/dist/client/components/headers";
import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";

const EditTaskForm = ({ id, title, memo }) => {
  const APP_URL = process.env.NEXT_PUBLIC_API_URL;

  const [newTitle, setNewTitle] = useState(title);
  const [newMemo, setNewMemo] = useState(memo);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${APP_URL}/api/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newTitle, newMemo }),
      });

      if (!res.ok) {
        throw new Error("Failed to Update Task");
      }

      router.refresh();
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          onChange={(e) => setNewTitle(e.target.value)}
          value={newTitle}
          className="border border-slate-500 px-8 py-2"
          type="text"
          placeholder="Task Title"
        />

        {/* <input
          onChange={(e) => setNewTitle(e.target.value)}
          value={newTitle}
          className="border border-slate-500 px-8 py-2 gap-3 form-control"
          type="text"
          placeholder={"Task Title"}
        /> */}

        <input
          onChange={(e) => setNewMemo(e.target.value)}
          value={newMemo}
          className="border border-slate-500 px-8 py-2 gap-3 form-control"
          type="text"
          placeholder="Task Memo"
        />

        <button className="bg-green-100 font-bold color-white py-2 px-6 w-fit ">
          Update Task
        </button>
      </form>
    </>
  );
};

export default EditTaskForm;
