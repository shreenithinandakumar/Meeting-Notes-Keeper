import styles from '@/styles/Statistics.module.css'
import StatsBox from './StatsBox'
// import NotesData from '@/data/NotesData'

const Statistics = ({notes}) => {
    const allTags = notes.flatMap(note => note.tags || []);
    const uniqueTags = new Set(allTags);
    const numberOfUniqueTags = uniqueTags.size;
    const totalPending = notes.reduce((count, note) => {
        const pendingInNote = note.actionItems.filter(item => !item.status).length;
        return count + pendingInNote;
    }, 0)

    return (
        <div className={styles.StatisticsContainer}>
            <div></div>
            <div className={styles.StatisticsContent}>
                <StatsBox StatsCount={notes.length} StatsType="Total Notes"></StatsBox>
                <StatsBox StatsCount={numberOfUniqueTags} StatsType="Unique Tags"></StatsBox>
                <StatsBox StatsCount= {totalPending} StatsType="Pending Tasks"></StatsBox>
            </div>
            <div></div>
        </div>
    )
}

export default Statistics