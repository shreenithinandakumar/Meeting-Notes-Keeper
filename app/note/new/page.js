'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import styles from '@/styles/NoteDetails.module.css'

export default function AddNewNote() {
  const router = useRouter()

  const [title, setTitle] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [tags, setTags] = useState([])
  const [tagInput, setTagInput] = useState('')
  const [meetingNotes, setMeetingNotes] = useState('')
  const [actionItems, setActionItems] = useState([])
  const [taskInput, setTaskInput] = useState('')
  const [errors, setErrors] = useState({})

  const handleAddTag = () => {
    if (tagInput.trim() !== '') {
      setTags([...tags, tagInput.trim()])
      setTagInput('')
    }
  }

  const handleAddTask = () => {
    if (taskInput.trim() !== '') {
      setActionItems([...actionItems, { taskName: taskInput.trim(), status: false }])
      setTaskInput('')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const newErrors = {}
    if (!title.trim()) newErrors.title = 'Title is required'
    if (!date.trim()) newErrors.date = 'Date is required'
    if (!meetingNotes.trim()) newErrors.meetingNotes = 'Meeting notes are required'

    if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors)
        return
    }

    const newNote = {
      title,
      date,
      time,
      tags,
      meetingNotes,
      actionItems,
    }

    // console.log('Note submitted:', newNote)
    // alert('Note added (demo only)')
    // router.push('/dashboard')

    try {
    const res = await fetch('/api/notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newNote),
    });

    if (res.ok) {
      alert('Note added successfully!');
      router.push('/dashboard');
    } else {
      const errorData = await res.json();
      alert(`Failed to add note: ${errorData.error}`);
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Something went wrong!');
  }
  }

  const handleCancel = ()=> {
    router.push('/')
  } 

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.headerRow}>
        <button className={styles.backButton} onClick={() => router.push('/dashboard')}>↩ Back to Notes</button>
      </div>

      <div className={styles.noteCard}>
        <h1 className={styles.title}>Add New Note</h1>

        <div className={styles.section}>
          <h3 className={styles.subheading}>📌 Title</h3>
          <input
            className={styles.input}
            value={title}
            onChange={(e) => {
                setTitle(e.target.value)
                setErrors(prev => ({ ...prev, title: '' })) // clear error on change
            }}
          />
          {errors.title && <p className={styles.errorText}>{errors.title}</p>}
        </div>

        <div className={styles.section}>
          <h3 className={styles.subheading}>📅 Date</h3>
          <input
            type="date"
            className={styles.input}
            value={date}
            onChange={(e) => {
                setDate(e.target.value)
                setErrors(prev => ({ ...prev, date: '' }))
            }}
          />
          {errors.date && <p className={styles.errorText}>{errors.date}</p>}
        </div>

        <div className={styles.section}>
          <h3 className={styles.subheading}>⏰ Time</h3>
          <input type="time" className={styles.input} value={time} onChange={(e) => setTime(e.target.value)} />
        </div>

        <div className={styles.section}>
          <h3 className={styles.subheading}>🏷 Tags</h3>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
            <input className={styles.input} value={tagInput} onChange={(e) => setTagInput(e.target.value)} placeholder="Enter tag" />
            <button type="button" className={styles.addButton} onClick={handleAddTag}>+</button>
          </div>
          <div className={styles.tagList}>
            {tags.map((tag, idx) => (
              <span key={idx} className={styles.tag}>{tag}</span>
            ))}
          </div>
        </div>

        <div className={styles.section}>
          <h3 className={styles.subheading}>📝 Meeting Notes</h3>
          <textarea
            className={styles.input}
            value={meetingNotes}
            onChange={(e) => {
                setMeetingNotes(e.target.value)
                setErrors(prev => ({ ...prev, meetingNotes: '' }))
            }}
            rows={6}
            placeholder="Write notes here..."
          />
          {errors.meetingNotes && <p className={styles.errorText}>{errors.meetingNotes}</p>}
        </div>

        <div className={styles.section}>
          <h3 className={styles.subheading}>🎯 Action Items</h3>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
            <input className={styles.input} value={taskInput} onChange={(e) => setTaskInput(e.target.value)} placeholder="Enter task" />
            <button type="button" className={styles.addButton} onClick={handleAddTask}>+</button>
          </div>
          <div className={styles.todoList}>
            {actionItems.map((item, idx) => (
              <div key={idx} className={styles.taskRow}>
                <span className={`${styles.checkbox} ${item.done ? styles.checked : ''}`}>{item.done ? '✔' : ''}</span>
                <span className={`${styles.taskText} ${item.done ? styles.striked : ''}`}>{item.task}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.AddNoteBtnsContainer}>
            <button className={styles.saveButton} onClick={handleCancel}>Cancel</button>
            <button className={styles.saveButton} onClick={handleSubmit}>Save Note</button>
        </div>
      </div>
    </div>
  )
}
