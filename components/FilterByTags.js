import styles from '@/styles/FilterByTags.module.css'

const FilterByTags = () => {
    return  (
        <div className={styles.FilterByTagsContainer}>
            <h4>🏷️ Filter By Tags</h4>
            <div className={styles.TagBox}>
                <p>daily</p>
            </div>
        </div>
    )
}

export default FilterByTags