'use client'
import Header from "@/components/Header"
import Statistics from "@/components/Statistics"
import NotesSection from "@/components/NotesSection"
// import NotesData from "@/data/NotesData"
import NotesEmpty from "@/components/NotesEmpty"
import NoNotesFound from "@/components/NoNotesFound"
import { useState, useEffect } from "react"
import Loader from "@/components/Loader"

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const Dashboard = () => {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [notes, setNotes] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTag, setActiveTag] = useState(null);

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login"); 
        }
    }, [status, router]);

    useEffect(() => {
        if (status === "authenticated") {
            const fetchNotes = async () => {
            try {
                const res = await fetch('/api/notes')
                const data = await res.json()
                setNotes(data.notes)
            } catch (err) {
                console.error('Failed to fetch notes', err)
            } finally {
                setLoading(false)
            }
            }
            fetchNotes()
        }
    }, [status])

    const query = searchQuery.trim().toLowerCase();

    const filteredNotes = notes.filter (note => {
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

    const showStats = notes.length > 0 && filteredNotes.length > 0;

    if (status === "loading" || loading) return <Loader />

    return (
        <div>
            <Header 
                searchQuery={searchQuery} 
                setSearchQuery={setSearchQuery} 
                setActiveTag={setActiveTag} 
                activeTag={activeTag} 
                notes={notes}
            >
            </Header>
            {showStats && <Statistics notes={notes}></Statistics>}
            {notes.length === 0 ? (
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