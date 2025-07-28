import styles from '@/styles/FilterByTags.module.css'
import NotesData from '@/data/NotesData';

const FilterByTags = ({ setActiveTag, activeTag }) => {
    const allTags = NotesData.flatMap(note => note.tags || []);
    const uniqueTags = [...new Set(allTags)].reverse();

    const handleClick = (tag) => {
        setActiveTag(tag === activeTag ? null : tag) 
    }

    return  (
        <div className={styles.FilterByTagsContainer}>
            <h4>🏷️ Filter By Tags</h4>
            <div className={styles.TagsWrapper}>
                {uniqueTags.map((tag, index) => (
                <div key={index} 
                    className={`${styles.TagBox} ${tag === activeTag ? styles.active : ''}`}
                    onClick={() => handleClick(tag)} 
                >
                    <p>{tag}</p>
                </div>
                ))}
            </div>
        </div>
    )
}

export default FilterByTags