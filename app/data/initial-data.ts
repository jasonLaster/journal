export interface Goal {
  id: string;
  text: string;
}

export interface Entry {
  id: string;
  date: string;
  text: string;
  summary: string;
  goalId: string;
}

export const initialGoals: Goal[] = [
  {
    id: "1",
    text: "Exercise for 30 minutes",
  },
  {
    id: "2",
    text: "Read for 20 minutes",
  },
  {
    id: "3",
    text: "Meditate for 10 minutes",
  },
  {
    id: "4",
    text: "Write in journal",
  },
  {
    id: "5",
    text: "Learn something new",
  },
];

export const initialEntries: Entry[] = [
  {
    id: '1',
    date: '2024-11-23',
    text: "Today I went for a bike ride in the park. The weather was perfect, and I managed to complete a 10-mile circuit. I felt energized and accomplished afterwards.",
    summary: "Biked for 10 miles",
    goalId: '1'
  },
  {
    id: '2',
    date: '2024-11-23',
    text: "I continued reading 'The Alchemist' today. The protagonist's journey is becoming more intriguing, and I'm finding parallels with my own life.",
    summary: "Read 'The Alchemist' for 20 minutes",
    goalId: '2'
  },
  {
    id: '3',
    date: '2024-11-22',
    text: "I used the Headspace app for a guided meditation session. I focused on breath awareness and felt much calmer afterwards.",
    summary: "Meditated for 10 minutes",
    goalId: '3'
  },
  {
    id: '4',
    date: '2024-11-23',
    text: "In my journal today, I reflected on my progress towards my goals this week. I noted areas where I've improved and identified challenges I need to work on.",
    summary: "Wrote journal entry on weekly progress",
    goalId: '4'
  },
  {
    id: '5',
    date: '2024-11-23',
    text: "I watched an online tutorial about machine learning algorithms and their applications in everyday technology. It's fascinating how these concepts are used in recommendation systems and image recognition.",
    summary: "Learned about machine learning basics",
    goalId: '5'
  },
  {
    id: '6',
    date: '2024-11-21',
    text: "I went for a run on the treadmill today. I started with a 5-minute warm-up, then ran for 25 minutes, and finished with a 5-minute cool-down. I increased my speed for the last 5 minutes of the run.",
    summary: "Ran for 35 minutes on treadmill",
    goalId: '1'
  },
  {
    id: '7',
    date: '2024-11-22',
    text: "I read two chapters of 'Dune' today. The world-building is incredibly detailed, and I'm getting more invested in the characters' stories. The political intrigue is particularly engaging.",
    summary: "Read two chapters of 'Dune'",
    goalId: '2'
  },
  {
    id: '8',
    date: '2024-11-20',
    text: "Completed a HIIT workout session at home. Did 4 rounds of burpees, mountain climbers, and jumping jacks. Really pushed myself today!",
    summary: "30-minute HIIT workout",
    goalId: '1'
  },
  {
    id: '9',
    date: '2024-11-20',
    text: "Started reading 'Project Hail Mary' by Andy Weir. The opening chapter is gripping - waking up alone in space with no memory? I'm hooked!",
    summary: "Started 'Project Hail Mary'",
    goalId: '2'
  },
  {
    id: '10',
    date: '2024-11-19',
    text: "Did a guided meditation focusing on gratitude. Found myself really appreciating the small things in life.",
    summary: "Gratitude meditation session",
    goalId: '3'
  },
  {
    id: '11',
    date: '2024-11-19',
    text: "Learned about quantum computing basics through an online course. The concept of qubits and superposition is mind-bending!",
    summary: "Quantum computing introduction",
    goalId: '5'
  },
  {
    id: '12',
    date: '2024-11-18',
    text: "Went swimming for 45 minutes. Did laps alternating between freestyle and breaststroke. Great full-body workout!",
    summary: "45-minute swim session",
    goalId: '1'
  },
  {
    id: '13',
    date: '2024-11-18',
    text: "Explored the basics of watercolor painting through an online tutorial. Created my first simple landscape!",
    summary: "Learned watercolor basics",
    goalId: '5'
  },
  {
    id: '14',
    date: '2024-11-17',
    text: "Deep dive into the history of Ancient Rome. Fascinating to learn about the political intrigues of the Senate.",
    summary: "Studied Ancient Roman history",
    goalId: '5'
  },
  {
    id: '15',
    date: '2024-11-17',
    text: "Practiced mindfulness while walking in nature. Focused on the sounds of birds and rustling leaves.",
    summary: "Walking meditation",
    goalId: '3'
  },
  {
    id: '16',
    date: '2024-11-16',
    text: "Read several chapters of 'Thinking, Fast and Slow'. The concept of cognitive biases is eye-opening.",
    summary: "Psychology reading session",
    goalId: '2'
  },
  {
    id: '17',
    date: '2024-11-16',
    text: "Wrote about my career goals and five-year plan. Really helped clarify my thoughts and priorities.",
    summary: "Career planning journal entry",
    goalId: '4'
  },
  {
    id: '18',
    date: '2024-11-15',
    text: "Yoga session focusing on flexibility. Held some challenging poses and felt a great stretch.",
    summary: "30-minute yoga practice",
    goalId: '1'
  },
  {
    id: '19',
    date: '2024-11-15',
    text: "Learned about sustainable living practices. Made a plan to reduce my plastic usage.",
    summary: "Studied sustainability",
    goalId: '5'
  },
  {
    id: '20',
    date: '2024-11-14',
    text: "Morning meditation focusing on breath work. Noticed improved focus throughout the day.",
    summary: "Breath-work meditation",
    goalId: '3'
  },
  {
    id: '21',
    date: '2024-11-14',
    text: "Reflected on recent challenges and how I overcame them. Writing helps process emotions.",
    summary: "Reflective journaling",
    goalId: '4'
  },
  {
    id: '22',
    date: '2024-11-13',
    text: "Intense cardio session on the elliptical. Maintained a steady pace for 40 minutes.",
    summary: "40-minute cardio workout",
    goalId: '1'
  },
  {
    id: '23',
    date: '2024-11-13',
    text: "Read about the basics of astronomy. The scale of the universe is mind-boggling!",
    summary: "Astronomy basics",
    goalId: '5'
  },
  {
    id: '24',
    date: '2024-11-12',
    text: "Finished 'The Midnight Library'. The concept of parallel lives really made me think.",
    summary: "Completed novel reading",
    goalId: '2'
  },
  {
    id: '25',
    date: '2024-11-12',
    text: "Journaled about my favorite memories from the past year. Feeling grateful.",
    summary: "Gratitude journaling",
    goalId: '4'
  }
];
