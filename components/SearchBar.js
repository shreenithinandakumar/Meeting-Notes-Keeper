'use client'
import styles from '@/styles/SearchBar.module.css'
import { useState, useEffect } from 'react'
import NotesData from '@/data/NotesData'

const SearchBar = () => {

    let [val, setVal] = useState('')
    const handleChange = (e) => {
        setVal(e.target.value)
    }
    useEffect(() => {
        console.log(val);
    }, [val]);

    return (
        <div className={styles.SearchBarContainer}>
            <input className={styles.inputBox} placeholder='Search notes by title, content or tags...' value={val} onChange={handleChange}></input>
        </div>
    )
}

export default SearchBar