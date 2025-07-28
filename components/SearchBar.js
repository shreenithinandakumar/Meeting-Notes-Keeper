'use client'
import styles from '@/styles/SearchBar.module.css'

const SearchBar = ({ searchQuery, setSearchQuery, disabled }) => {

    const handleChange = (e) => {
        if (!disabled) setSearchQuery(e.target.value)
    }

    return (
        <div className={styles.SearchBarContainer}>
            <input className={styles.inputBox} placeholder='Search notes by title, content or tags...' value={searchQuery} onChange={handleChange} disabled={disabled} ></input>
        </div>
    )
}

export default SearchBar