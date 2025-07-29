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
  const [tags, setTags] = useState([])
  const [tagInput, setTagInput] = useState('')
  const [content, setContent] = useState('')
  const [actionItems, setActionItems] = useState([])
  const [newAction, setNewAction] = useState('')

  useEffect(() => {
    const found = NotesData.find(n => n.id.toString() === id)
    if (found) {
      setNote(found)
      setTitle(found.title)
      setDate(found.date)
      setTags(found.tags || [])
      setContent(found.meetingNotes || '')
      setActionItems(found.actionItems || [])
    }
  }, [id])

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
      tags,
      meetingNotes: content,
      actionItems,
    })
    router.push(`/note/${id}`)
  }

  if (!note) return <div className={styles.loading}>Loading note...</div>

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.headerRow}>
        <button className={styles.backButton} onClick={() => router.push(`/note/${id}`)}>↩  Back to Note</button>
        <button className={styles.saveButton} onClick={handleSave}>💾  Save Changes</button>
      </div>

      <div className={styles.noteCard}>
        <h1 className={styles.title}>Edit Note</h1>

        <div className={styles.section}>
          <h3 className={styles.subheading}>Title</h3>
          <input
            type="text"
            value={title}
            className={styles.input}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className={styles.section}>
          <h3 className={styles.subheading}>Date</h3>
          <input
            type="date"
            value={date}
            className={styles.input}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className={styles.section}>
          <h3 className={styles.subheading}>Tags</h3>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
            <input
              type="text"
              placeholder="Add tag..."
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              className={styles.input}
            />
            <button className={styles.addButton} onClick={handleAddTag}>+</button>
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
          <h3 className={styles.subheading}>Content</h3>
          <textarea
            rows="8"
            className={styles.input}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <div className={styles.section}>
        <h3 className={styles.subheading}>🎯 Action Items</h3>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
          <input
            type="text"
            placeholder="Add action item..."
            value={newAction}
            onChange={(e) => setNewAction(e.target.value)}
            className={styles.input}
          />
          <button className={styles.addButton} onClick={() => {
            if (newAction.trim() !== '') {
              setActionItems([...actionItems, { task: newAction.trim(), done: false }])
              setNewAction('')
            }
          }}>+</button>
        </div>

        <div className={styles.todoList}>
          {actionItems.map((item, idx) => (
            <div key={idx} className={styles.taskRow}>
              <span
                className={`${styles.checkbox} ${item.done ? styles.checked : ''}`}
                onClick={() => {
                  const updated = actionItems.map((it, i) =>
                    i === idx ? { ...it, done: !it.done } : it
                  )
                  setActionItems(updated)
                }}
              >
                {item.done ? '✔' : ''}
              </span>
              <span className={`${styles.taskText} ${item.done ? styles.striked : ''}`}>
                {item.task}
              </span>
              <span
                onClick={() => setActionItems(actionItems.filter((_, i) => i !== idx))}
                style={{ marginLeft: 'auto', cursor: 'pointer', color: '#999' }}
              >
                ✕
              </span>
            </div>
          ))}
        </div>
      </div>

      </div>
    </div>
  )
}
