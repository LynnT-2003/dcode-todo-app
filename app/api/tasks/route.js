import connectMongoDB from "@/app/libs/mongodb";
import Task from "@/models/Task";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { title, memo } = await req.json();
  await connectMongoDB();
  await Task.create({ title, memo });
  return NextResponse.json({ message: "Topic Created" }, { status: 201 });
  // res.status(201).json(task);
}

export async function GET() {
  await connectMongoDB();
  const tasks = await Task.find();
  return NextResponse.json(tasks);
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await Task.findByIdAndDelete(id);
  return NextResponse.json({ message: "Task deleted" }, { status: 200 });
}
