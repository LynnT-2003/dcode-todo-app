import connectMongoDB from "@/app/libs/mongodb";
import Task from "@/models/Task";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  const { title, memo } = await req.body;
  await connectMongoDB();
  await Task.create({ title, description });
  return NextResponse.json({ message: "Topic Created" }, { status: 201 });
  // res.status(201).json(task);
}

export async function GET() {
  await connectMongoDB();
  const tasks = await Task.find();
  return NextResponse.json(tasks);
}

export async function DELETE(req) {
  const id = req.nextURL.searchParams.get("id");
  await connectMongoDB();
  await Task.findByAndDelete(id);
  return NextResponse.json({ message: "Task Deleted" }, { status: 200 });
}
