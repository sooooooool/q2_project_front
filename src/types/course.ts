interface Course {
    id: number;
    name: string;
    description: string;
    credits: number;
}

const course: Course = {
    id: 1,
    name: "Introduction to Programming",
    description: "Learn the basics of programming",
    credits: 3,
};

export interface CourseSummary {
    id: number;
    title: string;
    userName: string;
    tags: string[];
    imageUrl: string;
    meanrating: number;
}


export interface CourseDetail {
    id: number;
    title: string;
    userName: string;
    tags: string[];
    imageUrl: string;
    time: number;
    comments: number;
    meanrating: number;
    ratingCount: number;
}



export default Course;