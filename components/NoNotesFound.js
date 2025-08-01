import styles from '@/styles/NoNotesFound.module.css'
import Image from 'next/image'

const NoNotesFound = () => {
    return (
        <div className={styles.NoNotesFounContainer}>
            <div className={styles.imageContainer}>
                <Image src='https://www.kindpng.com/picc/m/366-3669937_transparent-plan-icon-png-icon-notes-png-download.png' alt='no notes found' className={styles.imageIcon}></Image>
            </div>
            <p className={styles.heading}>No notes found</p>
            <p className={styles.sentence}>Try adjusting your search terms or removing tag filters to find more notes.</p>
        </div>
    )
}

export default NoNotesFound