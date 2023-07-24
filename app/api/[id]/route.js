import connectMongoDB from "@/app/libs/mongodb";
import Task from "@/models/Task";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  const { id } = params;
  const {} = req.json();
  const { newTitle: title, newMemo: memo } = await req.json();
  await connectMongoDB();
  await Task.findByIdAndUpdate(id, { title, description });
  return NextResponse.json({ message: "Task Updated" }, { status: 200 });
}

export async function GET(req, { params }) {
  const { id } = params;
  await connectMongoDB();
  const Task = await Task.findOne({ _id: id });
  return NextResponse.json({ topic }, { status: 200 });
}
