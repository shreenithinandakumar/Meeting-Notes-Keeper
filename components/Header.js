'use client'

import styles from '@/styles/Header.module.css'
import ProfileDropDown from './ProfileDropDown';
import FilterByTags from './FilterByTags';
import { useState } from 'react';
import SearchBar from './SearchBar';
import Link from 'next/link';

const Header = ({ searchQuery, setSearchQuery, setActiveTag, activeTag }) => {

    const [showMenu, setShowMenu] = useState(false);
    const toggleMenu = () => setShowMenu(!showMenu);


    return  (
        <div className={styles.Header} >
            <div></div>
            <div className={styles.headerContent}>
                <div className={styles.TopLine}>
                    <div className={styles.Heading}>
                        <h1>Meeting Notes</h1>
                    </div>
                    <Link href={`/note/new`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <button className={styles.newNoteBtn} > + New Note </button>
                    </Link>
                </div>

                <div className={styles.secondLine}>
                    <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} disabled={!!activeTag} ></SearchBar>
                    <FilterByTags setActiveTag={setActiveTag} activeTag={activeTag} ></FilterByTags>
                </div>
            </div>
            <div> <ProfileDropDown> </ProfileDropDown></div>
        </div>
    )
}

export default Header