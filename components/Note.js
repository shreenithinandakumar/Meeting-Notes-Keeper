import styles from '@/styles/Note.module.css'
import { useState } from 'react';
import Link from 'next/link';
const Note = ({ id, title, date, time, tags, meetingNotes, actionItems }) => {
    const [tasks, setTasks] = useState(actionItems);
    const toggleTask = (index) => {
        const updated = [...tasks];
        updated[index].done = !updated[index].done;
        setTasks(updated);
    };
    
    return (
        <Link href={`/note/${id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <div className={styles.NotesContainer}>

        <div className={styles.NoteContainer}>
            <h2 className={styles.NoteHeading}>{title}</h2> 
            <p className={styles.NoteDayDate}> 📅 {date} {"  "} {time} </p>
            {tags?.length > 0 && (
                <div className={styles.NoteTagContainer}>
                    {tags.map((tag, idx) => (
                    <p key={idx} className={styles.NoteTag}>{tag}</p>
                    ))}
                </div>
            )}
            <div>
                <p className={styles.NotePara}> {meetingNotes.length > 200 ? meetingNotes.slice(0, 200) + '...' : meetingNotes} </p>
            </div>
            <div className={styles.TodoContainer}>
                <p className={styles.ActionItems}>Action Items ({actionItems.filter(item => !item.done).length} remaining) </p>
                <div className={styles.TodoList}>
                    {tasks.slice(0, 3).map((item, idx) => (
                        <div key={idx} className={styles.TaskRow} onClick={() => toggleTask(idx)}>
                            <span className={`${styles.Checkbox} ${item.done ? styles.Checked : ''}`}>
                            {item.done ? '✔' : ''}
                            </span>
                            <span className={`${styles.TaskText} ${item.done ? styles.Striked : ''}`}>
                            {item.task}
                            </span>
                        </div>
                    ))}
                    {tasks.length > 3 && (
                        <div className={styles.MoreItemsText}>
                            + {tasks.length - 3} more items...
                        </div>
                    )}
                </div>
            </div>
        </div>

        </div>
        </Link>
    )
}

export default Note