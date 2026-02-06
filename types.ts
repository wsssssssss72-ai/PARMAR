
export interface Video {
  id: string;
  title: string;
  duration: string;
  url: string;
  thumbnail: string;
}

export interface Subject {
  id: string;
  name: string;
  description: string;
  icon: string;
  videos: Video[];
}

export interface Course {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  subjects: Subject[];
}

export interface AppData {
  courses: Course[];
}
