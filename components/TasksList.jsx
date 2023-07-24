"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import RemoveBtn from "./RemoveBtn";
import { HiPencilAlt } from "react-icons/hi";
import { CgUndo } from "react-icons/cg";
import { MdOutlineDownloadDone } from "react-icons/md";

const getTasks = async () => {
  const APP_URL = process.env.NEXT_PUBLIC_API_URL;

  try {
    const res = await fetch(`${APP_URL}/api/tasks`, {
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
  const [loading, setLoading] = useState(true);
  const [completed, setCompleted] = useState([]);

  const fetchTasks = async () => {
    const fetchedTasks = await getTasks();
    setTasks(fetchedTasks);
    setLoading(false);
  };

  useEffect(() => {
    fetchTasks();
    console.log("Tasks fetched");
    console.log({ tasks });
  }, []);

  const handleCompleteTask = (task) => {
    setCompleted((prevCompleted) => [...prevCompleted, task]);
  };

  const handleUnCompleteTask = (task) => {
    setCompleted((prevCompleted) =>
      prevCompleted.filter((t) => t._id !== task._id)
    );
  };

  // Filter out the completed tasks from the tasks list
  const nonCompletedTasks = tasks.filter((t) => !completed.includes(t));

  const [clickedItemIds, setClickedItemIds] = useState([]);

  const handleItemClick = (taskId) => {
    setClickedItemIds((prevClickedItemIds) =>
      prevClickedItemIds.includes(taskId)
        ? prevClickedItemIds.filter((id) => id !== taskId)
        : [...prevClickedItemIds, taskId]
    );
  };

  if (loading) {
    // Render the loading GIF while fetching tasks
    return (
      <div className="flex justify-center items-center">
        <img src="/loading.gif" alt="Loading..." />
      </div>
    );
  }

  return (
    <>
      {nonCompletedTasks.length === 0 ? (
        <div className="px-12 py-4 border border-slate-300 my-3 ">
          <p className="text-xl">No tasks found!</p>
          <p className="text-gray-500">
            Add tasks from the Navbar to see them here.
          </p>
        </div>
      ) : (
        nonCompletedTasks.map((t) => (
          <div
            key={t._id}
            className="px-12 p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start"
            onClick={() => handleItemClick(t._id)}
            style={{
              cursor: "pointer",
              opacity: clickedItemIds.includes(t._id) ? 0.3 : 1,
            }}
          >
            <div>
              <h2
                className="text-2xl"
                // onClick={() => handleCompleteTask(t)}
                // style={{ cursor: "pointer" }}
              >
                {/* <label className="px-4">
              <span style={{ transform: "scale(10)" }}>
                <input type="checkbox" />
              </span>
            </label> */}
                {t.title}
              </h2>
              <h2 className="px12">{t.memo}</h2>
              <p className="text-xs pt-3 text-blue-400">
                Last Updated At: {new Date(t.updatedAt).toLocaleString()}
              </p>
            </div>
            <div className="flex gap-2 items-center">
              <div className="items-center"></div>
              <Link href={`/editTask/${t._id}`}>
                <HiPencilAlt size={24} />
              </Link>
              <RemoveBtn id={t._id} />
            </div>
          </div>
        ))
      )}

      {completed.length > 0 && (
        <>
          <h2 className="text-2xl pt-5">Completed Tasks</h2>
          {completed.map((t) => (
            <div
              key={t._id}
              className="p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start"
            >
              <div>
                <h2 className="font-bold text-2xl">
                  {/* <label className="px-4">
                    <span style={{ transform: "scale(10)" }}>
                      <input type="checkbox" />
                    </span>
                  </label> */}
                  {t.title}
                </h2>
                <h2 className="px12">{t.memo}</h2>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleUnCompleteTask(t)}>
                  <CgUndo size={27} />
                </button>
                <RemoveBtn id={t._id} />
              </div>
            </div>
          ))}
        </>
      )}
    </>
  );
};

export default TasksList;
