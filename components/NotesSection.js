import styles from '@/styles/Note.module.css'
import Note from './Note'
import NotesData from '@/data/NotesData'
import NoNotesFound from './NoNotesFound';

const NotesSection = ({filteredNotes}) => {

    const displayNotes = filteredNotes !== null ? filteredNotes : NotesData;

    if (!NotesData || NotesData.length === 0) {
        return <p style={{ padding: '1rem' }}>Notes is empty.</p>;
    }

    if (filteredNotes !== null && filteredNotes.length === 0) {
        return <NoNotesFound></NoNotesFound>
    }

    return (
        <div className={styles.NotesPage}>
            <div className={styles.NotesSectionContainer}>
                {displayNotes.map((note, index) => (
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