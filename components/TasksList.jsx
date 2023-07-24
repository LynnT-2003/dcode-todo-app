"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import RemoveBtn from "./RemoveBtn";
import { HiPencilAlt } from "react-icons/hi";

const getTasks = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/tasks", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch tasks");
    }
    return res.json();
  } catch (error) {
    console.log("Error fetching tasks");
    return []; // Return an empty array in case of an error
  }
};

const TasksList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const fetchedTasks = await getTasks();
      setTasks(fetchedTasks);
    };

    fetchTasks();
    console.log("Tasks fetched");
    console.log({ tasks });
  }, []);

  return (
    <>
      {tasks.map((t) => (
        <div
          key={t._id}
          className="p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start"
        >
          <div>
            <h2 className="font-bold text-2xl">{t.title}</h2>
            <h2>{t.memo}</h2>
            <h2>{t._id}</h2>
          </div>
          <div className="flex gap-2">
            <RemoveBtn id={t._id} />
            <Link href={`/editTask/${t._id}`}>
              <HiPencilAlt size={24} />
            </Link>
          </div>
        </div>
      ))}
    </>
  );
};

export default TasksList;
