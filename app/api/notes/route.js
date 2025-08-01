import {connectDB} from '@/lib/mongodb'
import Note from '@/models/Note'

export async function GET() {
  try {
    await connectDB()
    const notes = await Note.find().sort({ createdAt: -1 })
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
  try {
    await connectDB()
    const body = await req.json()
    const newNote = await Note.create(body)
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
