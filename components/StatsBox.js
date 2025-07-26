import styles from '@/styles/Statistics.module.css'

const StatsBox = ({StatsCount, StatsType}) => {
    return  (
        <div className={styles.StatsBox}>
            <h1 className={styles.StatsCount}>{StatsCount}</h1>
            <p className={styles.StatsType}>{StatsType}</p>
        </div>
    )
}

export default StatsBox