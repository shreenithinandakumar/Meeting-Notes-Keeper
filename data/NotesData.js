const NotesData = [
  {
    id: 1,
    title: "Team Sync-up",
    date: "2025-07-25",
    time: "10:00 AM",
    tags: ["project", "weekly"],
    meetingNotes: " Discussed project updates and blockers. m",
    actionItems: [
      { task: "Design login page", done: false },
      { task: "Fix navbar bug", done: false },
      {task: "Test product walkthrough", done: false }
    ]
  },
  {
    id: 2,
    title: "Marketing Strategy Meeting",
    date: "2025-07-20",
    tags: ["marketing"],
    meetingNotes: "Discussed Q3 marketing campaigns. Focus on social media.",
    actionItems: []
  },
  {
    id: 3,
    title: "Product Demo Prep",
    date: "2025-07-18",
    time: "4:30 PM",
    meetingNotes: "Reviewed demo flow. Assigned parts to each member.",
    actionItems: [
      {task:"Update demo script", done: false },
      {task: "Test product walkthrough", done: false }
    ]
  },
  {
    id: 4,
    title: "Client Feedback Session",
    date: "2025-07-15",
    meetingNotes: "Client gave positive feedback. Need to fix minor bugs.",
    actionItems: [],
    tags: ["client", "feedback"]
  }
];

export default NotesData;
