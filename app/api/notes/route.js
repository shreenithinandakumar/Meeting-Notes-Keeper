import {connectDB} from '@/lib/mongodb'
import Note from '@/models/Note'
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectDB()
    const notes = await Note.find({ userId: session.user.id }).sort({ createdAt: -1 })
    return Response.json({
        notes
    })
  } catch (err) {
        console.log(err);
        return Response.json({
            status: "failed",
            message: err.message,
        }, {status:500})
    }
}

export async function POST(req) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectDB()
    const body = await req.json()
    const newNote = await Note.create({
      ...body,
      userId: session.user.id, 
    })
    return Response.json(
        {newNote}, 
        {status: 200}
    )
  } catch {
    return Response.json({
        status: "failed",
        message: err.message
    }, {status: 500})
  }
}
