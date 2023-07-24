"use client"; // change this to a client component
import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Page = () => {
  const APP_URL = process.env.NEXT_PUBLIC_API_URL;

  const [title, setTitle] = useState("");
  const [memo, setMemo] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !memo) {
      alert("Both title and memo are required");
      return;
    }

    try {
      const res = await fetch(`${APP_URL}/api/tasks`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ title, memo }),
      });

      if (res.ok) {
        router.push("/");
      } else {
        throw new Error("Failed to create a topic");
      }
    } catch (error) {
      console.log("error");
    }
  };

  console.log("Hi");
  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          className="border border-slate-500 px-8 py-2 gap-3 form-control"
          type="text"
          placeholder="Task Title"
        />

        <input
          onChange={(e) => setMemo(e.target.value)}
          value={memo}
          className="border border-slate-500 px-8 py-2 gap-3 form-control"
          type="text"
          placeholder="Task Memo"
        />

        <button
          type="submit"
          className="bg-green-100 font-bold color-white py-2 px-6 w-fit "
        >
          Add Task
        </button>
      </form>
    </>
  );
};

export default Page;
