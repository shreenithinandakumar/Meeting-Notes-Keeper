import {connectDB} from '@/lib/mongodb'
import Note from '@/models/Note'

export async function GET(_, { params }) {
  try {
    await connectDB()
    const note = await Note.findById(params.id)
    return Response.json(note)
  } catch (err) {
        return Response.json({
            status: "failed",
            message: err.message,
        }, {status:500})
    }
}

export async function PUT(req, { params }) {
  try{
    await connectDB()
    const body = await req.json()
    const updated = await Note.findByIdAndUpdate(params.id, body, { new: true })
    return Response.json(updated)
  } catch (err) {
        return Response.json({
            status: "failed",
            message: err.message,
        }, {status:500})
    }
}

export async function DELETE(_, { params }) {
  try {
    await connectDB()
    await Note.findByIdAndDelete(params.id)
    return Response.json({ message: "Deleted" })
  } catch (err) {
        return Response.json({
            status: "failed",
            message: err.message,
        }, {status:500})
    }
}
