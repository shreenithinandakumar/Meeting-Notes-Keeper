import styles from '@/styles/Note.module.css'

const Note = ({ title, date, time, tags, meetingNotes, actionItems }) => {
    return (
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
                    {actionItems.map((item, idx) => (
                        <div className={styles.Todo} key={idx}>
                            <input type="checkbox" checked={item.done} readOnly />
                            <span className={styles.TaskName}>{item}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        </div>
    )
}

export default Note