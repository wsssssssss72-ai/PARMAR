
import { AppData } from './types';

export const data: AppData = {
  courses: [
    {
      id: "PARMAR GK BATCH 4.0",
      name: "PARMAR GK BATCH 4.0",
      description: "unlocked",
      thumbnail: "https://appx-content-v2.classx.co.in/paid_course3/2025-09-29-0.06895000379516425.jpg",
      subjects: [
        {
          id: "subj-react-basics",
          name: "POLITY",
          description: "Introduction to components, props, and state.",
          icon: "⚛️",
          videos: [
            {
              id: "v1",
              title: "MAKING OF CONSTITUTION",
              duration: "1:45",
              url: "https://web-production-50ad7.up.railway.app/93?hash=AgADjB",
              thumbnail: "https://appx-content-v2.classx.co.in/paid_course3/2025-09-29-0.06895000379516425.jpg"
            },
            {
              id: "v2",
              title: "  SALIENT FEATURES OF CONSTITUTION",
              duration: "1:59",
              url: "https://web-production-50ad7.up.railway.app/94?hash=AgADkR",
              thumbnail: "https://appx-content-v2.classx.co.in/paid_course3/2025-09-29-0.06895000379516425.jpg"
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
              duration: "1:15",
              url: "",
              thumbnail: "https://appx-content-v2.classx.co.in/paid_course3/2025-09-29-0.06895000379516425.jpg"
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
