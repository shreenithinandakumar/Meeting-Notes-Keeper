import mongoose from 'mongoose'

const NoteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String },
  tags: [{ type: String }],
  meetingNotes: { type: String, required: true },
  actionItems: [{
    taskName: String,
    status: Boolean
  }]
}, { timestamps: true })

export default mongoose.models.Note || mongoose.model("Note", NoteSchema)
