'use client'
import Header from "@/components/Header"
import Statistics from "@/components/Statistics"
import NotesSection from "@/components/NotesSection"

const Dashboard = () => {
    return (
        <div>
            <Header></Header>
            <Statistics></Statistics>
            <NotesSection></NotesSection>
        </div>
    )
}

export default Dashboard