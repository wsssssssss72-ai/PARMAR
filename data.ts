
import { AppData } from './types';

export const data: AppData = {
  courses: [
    {
      id: "course-web-dev",
      name: "Modern Web Development",
      description: "Master React, Tailwind, and modern architecture in 2024.",
      thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
      subjects: [
        {
          id: "subj-react-basics",
          name: "React Fundamentals",
          description: "Introduction to components, props, and state.",
          icon: "⚛️",
          videos: [
            {
              id: "v1",
              title: "Getting Started with React",
              duration: "10:24",
              url: "https://web-production-50ad7.up.railway.app/93?hash=AgADjB",
              thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=400&q=80"
            },
            {
              id: "v2",
              title: "Understanding JSX",
              duration: "15:45",
              url: "https://web-production-50ad7.up.railway.app/94?hash=AgADkR",
              thumbnail: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&w=400&q=80"
            }
          ]
        },
        {
          id: "subj-tailwind",
          name: "Advanced Tailwind CSS",
          description: "Styling like a pro with utility classes.",
          icon: "🎨",
          videos: [
            {
              id: "v4",
              title: "The Utility-First Approach",
              duration: "12:00",
              url: "https://www.w3schools.com/html/movie.mp4",
              thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=400&q=80"
            }
          ]
        }
      ]
    },
    {
      id: "course-data-science",
      name: "Data Science Specialization",
      description: "Learn Python, Pandas, and Machine Learning algorithms.",
      thumbnail: "https://images.unsplash.com/photo-1551288049-bbda48242175?auto=format&fit=crop&w=800&q=80",
      subjects: [
        {
          id: "subj-python",
          name: "Python for Data Analysis",
          description: "Core syntax and library ecosystem.",
          icon: "🐍",
          videos: [
            {
              id: "v6",
              title: "Python Data Structures",
              duration: "18:20",
              url: "https://www.w3schools.com/html/mov_bbb.mp4",
              thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=400&q=80"
            }
          ]
        }
      ]
    }
  ]
};
