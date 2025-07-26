import styles from '@/styles/Note.module.css'
import Note from './Note'
import NotesData from '@/data/NotesData'

const NotesSection = () => {
    return (
        <div className={styles.NotesPage}>
            <div className={styles.NotesSectionContainer}>
                {NotesData.map((note, index) => (
                    <Note
                        key={index}
                        title={note.title}
                        date={note.date}
                        time={note.time}
                        tags={note.tags}
                        meetingNotes={note.meetingNotes}
                        actionItems={note.actionItems}
                    />
                ))}
            </div>
        </div>
    )
}

export default NotesSection