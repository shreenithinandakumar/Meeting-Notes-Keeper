'use client'

import styles from '@/styles/NoteDetails.module.css'
import { useRouter } from 'next/navigation'
import { use, useEffect, useState } from 'react'
import NotesData from '@/data/NotesData'

export default function EditNote(paramsPromise) {
  const { id } = use(paramsPromise.params)
  const router = useRouter()
  const [note, setNote] = useState(null)

  const [title, setTitle] = useState('')
  const [date, setDate] = useState('')
  const [participants, setParticipants] = useState([])
  const [participantInput, setParticipantInput] = useState('')
  const [tags, setTags] = useState([])
  const [tagInput, setTagInput] = useState('')
  const [content, setContent] = useState('')

  useEffect(() => {
    const found = NotesData.find(n => n.id.toString() === id)
    if (found) {
      setNote(found)
      setTitle(found.title)
      setDate(found.date)
      setParticipants(found.participants || [])
      setTags(found.tags || [])
      setContent(found.meetingNotes || '')
    }
  }, [id])

  const handleAddParticipant = () => {
    if (participantInput.trim() !== '') {
      setParticipants([...participants, participantInput.trim()])
      setParticipantInput('')
    }
  }

  const handleRemoveParticipant = (name) => {
    setParticipants(participants.filter(p => p !== name))
  }

  const handleAddTag = () => {
    if (tagInput.trim() !== '') {
      setTags([...tags, tagInput.trim()])
      setTagInput('')
    }
  }

  const handleRemoveTag = (tag) => {
    setTags(tags.filter(t => t !== tag))
  }

  const handleSave = () => {
    // TODO: Update in DB or local mock data
    console.log('Save note with data:', {
      id,
      title,
      date,
      participants,
      tags,
      meetingNotes: content,
    })
    router.push(`/note/${id}`)
  }

  if (!note) return <div className={styles.loading}>Loading note...</div>

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.headerRow}>
        <button className={styles.backButton} onClick={() => router.push(`/note/${id}`)}>← Back to Note</button>
        <button className={styles.deleteButton} onClick={handleSave}>💾 Save Changes</button>
      </div>

      <div className={styles.noteCard}>
        <h1 className={styles.title}>Edit Note</h1>

        <div className={styles.section}>
          <label className={styles.subheading}>Title</label>
          <input
            type="text"
            value={title}
            className={styles.input}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className={styles.section}>
          <label className={styles.subheading}>Date</label>
          <input
            type="date"
            value={date}
            className={styles.input}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className={styles.section}>
          <label className={styles.subheading}>Participants</label>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
            <input
              type="text"
              placeholder="Add participant..."
              value={participantInput}
              onChange={(e) => setParticipantInput(e.target.value)}
              className={styles.input}
            />
            <button className={styles.editButton} onClick={handleAddParticipant}>+</button>
          </div>
          <div className={styles.tagList}>
            {participants.map((p, idx) => (
              <span key={idx} className={styles.tag}>
                {p} <span onClick={() => handleRemoveParticipant(p)} style={{ cursor: 'pointer', marginLeft: '6px' }}>×</span>
              </span>
            ))}
          </div>
        </div>

        <div className={styles.section}>
          <label className={styles.subheading}>Tags</label>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
            <input
              type="text"
              placeholder="Add tag..."
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              className={styles.input}
            />
            <button className={styles.editButton} onClick={handleAddTag}>+</button>
          </div>
          <div className={styles.tagList}>
            {tags.map((tag, idx) => (
              <span key={idx} className={styles.tag}>
                {tag} <span onClick={() => handleRemoveTag(tag)} style={{ cursor: 'pointer', marginLeft: '6px' }}>×</span>
              </span>
            ))}
          </div>
        </div>

        <div className={styles.section}>
          <label className={styles.subheading}>Content</label>
          <textarea
            rows="8"
            className={styles.input}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
      </div>
    </div>
  )
}
