"use client";

import { HiOutlineTrash } from "react-icons/hi";
import { useRouter } from "next/navigation";

export default function RemoveBtn({ id }) {
  const router = useRouter();
  const removeTask = async () => {
    const confirmed = confirm("Are you sure?");

    if (confirmed) {
      const res = await fetch(`http://localhost:3000/api/tasks?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        router.refresh();
      }
    }
  };

  return (
    <button onClick={removeTask} className="text-red-400">
      <HiOutlineTrash size={24} />
    </button>
  );
}

// "use client";

// import React from "react";
// import { HiOutlineTrash } from "react-icons/hi";

// const RemoveBtn = ({ id }) => {
//   const removeTask = async () => {
//     const confirmed = confirm("Are you sure you want to delete this task?");

//     if (confirmed) {
//       try {
//         const res = await fetch(`http://localhost:3000/api/tasks?id=${id}`, {
//           method: "DELETE",
//         });

//         if (res.ok) {
//           // Task deleted successfully, you may want to trigger a refresh of the tasks list here.
//         } else {
//           throw new Error("Failed to delete the task.");
//         }
//       } catch (error) {
//         console.log("Error deleting the task:", error);
//       }
//     }
//   };

//   return (
//     <button onClick={removeTask} className="text-red-400">
//       <HiOutlineTrash size={24} />
//     </button>
//   );
// };

// export default RemoveBtn;
