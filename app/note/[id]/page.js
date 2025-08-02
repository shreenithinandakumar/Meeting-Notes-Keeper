'use client'

import styles from '@/styles/NoteDetails.module.css'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { use } from 'react'
// import NotesData from '@/data/NotesData'
import Loader from '@/components/Loader'

export default function NoteDetails(paramsPromise) {
  const { id } = use(paramsPromise.params)
  const router = useRouter()
  const [note, setNote] = useState(null)
  const [tasks, setTasks] = useState([])
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // useEffect(() => {
  //   const found = NotesData.find(n => n.id.toString() === id)
  //   if (found) {
  //     setNote(found)
  //     setTasks(found.actionItems || [])
  //   }
  // }, [id])

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await fetch(`/api/notes/${id}`)
        if (!res.ok) throw new Error('Note not found')
        const data = await res.json()
        setNote(data)
        setTasks(data.actionItems || [])
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchNote()
  }, [id])

  const toggleTask = (index) => {
    const updated = tasks.map((task, i) =>
      i === index ? { ...task, status: !task.status } : task
    )
    setTasks(updated)
  }

  // const handleDelete = () => {
  //   alert ("Note deleted successfully")
  //   setShowDeleteModal(false)
  //   router.push('/')
  // }

  const handleDelete = async () => {
    try {
      await fetch(`/api/notes/${id}`, { method: 'DELETE' })
      alert('Note deleted successfully')
      router.push('/')
    } catch (err) {
      alert('Failed to delete')
    }
  }

  // if (!note) return <div className={styles.loading}>Loading note...</div>

  if (loading) return <Loader />
  if (error) return <div className={styles.loading}>Error: {error}</div>
  if (!note) return null
  
  return (
    <div className={styles.pageWrapper}>
      <div className={styles.headerRow}>
        <button className={styles.backButton} onClick={() => router.push('/dashboard')}>↩  Back to Notes</button>
        <div className={styles.actionButtons}>
          <button className={styles.editButton} onClick={() => router.push(`/note/${id}/edit`)}>📝 Edit</button>
          <button className={styles.deleteButton} onClick={() => setShowDeleteModal(true)}> 🗑  Delete </button>
        </div>
      </div>

      <div className={styles.noteCard}>
        <h1 className={styles.title}>{note.title}</h1>
        <p className={styles.date}>📅 {note.date} {note.time}</p>

        <div className={styles.section}>
          <h3 className={styles.subheading}>🏷  Tags</h3>
          <div className={styles.tagList}>
            {note.tags?.map((tag, idx) => (
              <span key={idx} className={styles.tag}>{tag}</span>
            ))}
          </div>
        </div>

        <div className={styles.section}>
          <h3 className={styles.subheading}>📝 Meeting Notes</h3>
          <p className={styles.notesText}>{note.meetingNotes}</p>
        </div>

        <div className={styles.section}>
          <h3 className={styles.subheading}>🎯 Action Items ({tasks.filter(item => !item.status).length} remaining)</h3>
          <div className={styles.todoList}>
            {tasks.map((item, idx) => (
              <div key={idx} className={styles.taskRow} onClick={() => toggleTask(idx)}>
                <span className={`${styles.checkbox} ${item.status ? styles.checked : ''}`}>
                  {item.status ? '✔' : ''}
                </span>
                <span className={`${styles.taskText} ${item.status ? styles.striked : ''}`}>
                  {item.taskName}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showDeleteModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <p className={styles.modalHeading}>Are you sure?</p>
            <p>
              This action cannot be undone. This will permanently delete the note {note.title} and all its content.
            </p>
            <div className={styles.modalActions}>
              <button className={styles.cancelBtn} onClick={() => setShowDeleteModal(false)}>Cancel</button>
              <button className={styles.confirmBtn} onClick={handleDelete}>Delete Note</button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
