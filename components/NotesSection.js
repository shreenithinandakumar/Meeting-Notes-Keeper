import styles from '@/styles/Note.module.css'
import Note from './Note'
import NotesData from '@/data/NotesData'
// import NoNotesFound from './NoNotesFound';

const NotesSection = ({filteredNotes}) => {

    const displayNotes = filteredNotes;

    // If notes are still loading or not provided
    if (!displayNotes) {
        return <p style={{ padding: '1rem' }}>Loading notes...</p>;
    }

    // If fetched notes array is completely empty
    if (Array.isArray(displayNotes) && displayNotes.length === 0) {
        return <NoNotesFound />;
    }

    return (
        <div className={styles.NotesPage}>
            <div className={styles.NotesSectionContainer}>
                {displayNotes.map((note) => (
                    <Note
                        key={note._id}
                        id={note._id}
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