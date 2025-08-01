import styles from '@/styles/NotesEmpty.module.css'
import Link from 'next/link'

const NotesEmpty = () => {
    return (
        <div className={styles.NotesEmptyContainer}>
            <div className={styles.imageContainer}>
                <img src='https://www.kindpng.com/picc/m/366-3669937_transparent-plan-icon-png-icon-notes-png-download.png' className={styles.imageIcon}></img>
            </div>
            <p className={styles.heading}>No meeting notes yet</p>
            <p className={styles.sentence}>Start documenting your meetings and keep track of important discussions, decisions, and action items.</p>
            <Link href={`/note/new`} >
                <button className={styles.createButton} > + Create Your First Note </button>
            </Link>
        </div>
    )
}

export default NotesEmpty