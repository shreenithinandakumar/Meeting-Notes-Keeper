'use client'
import Header from "@/components/Header"
import Statistics from "@/components/Statistics"
import NotesSection from "@/components/NotesSection"
import NotesData from "@/data/NotesData"
import NotesEmpty from "@/components/NotesEmpty"
import NoNotesFound from "@/components/NoNotesFound"
import { useState } from "react"

const Dashboard = () => {

    const [searchQuery, setSearchQuery] = useState('');
    const [activeTag, setActiveTag] = useState(null);
    const query = searchQuery.trim().toLowerCase();

    const filteredNotes = NotesData.filter (note => {
        if (activeTag) {
            return note.tags?.includes(activeTag)
        } else if (query) {
            return (
                note.title.toLowerCase().includes(query) || 
                note.meetingNotes.toLowerCase().includes(query) ||
                (note.tags || []).some(tag=> tag.toLowerCase().includes(query))
            )
        } else {
            return true 
        }
    })

    const showStats = NotesData.length > 0 && filteredNotes.length > 0;

    return (
        <div>
            <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} setActiveTag={setActiveTag} activeTag={activeTag} ></Header>
            {showStats && <Statistics></Statistics>}
            {NotesData.length === 0 ? (
                <NotesEmpty />
            ) : filteredNotes.length === 0 ? (
                <NoNotesFound />
            ) : (
                <NotesSection filteredNotes={filteredNotes} />
            )}
        </div>
    )
}

export default Dashboard