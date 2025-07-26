import styles from '@/styles/Statistics.module.css'
import StatsBox from './StatsBox'
import NotesData from '@/data/NotesData'

const Statistics = () => {
    const allTags = NotesData.flatMap(note => note.tags || []);
    const uniqueTags = new Set(allTags);
    const numberOfUniqueTags = uniqueTags.size;

    return (
        <div className={styles.StatisticsContainer}>
            <div></div>
            <div className={styles.StatisticsContent}>
                <StatsBox StatsCount={NotesData.length} StatsType="Total Notes"></StatsBox>
                <StatsBox StatsCount={numberOfUniqueTags} StatsType="Unique Tags"></StatsBox>
                <StatsBox StatsType="Pending Tasks"></StatsBox>
            </div>
            <div></div>
        </div>
    )
}

export default Statistics