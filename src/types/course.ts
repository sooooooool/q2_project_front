import { spotUseCourse } from "./spot";

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

export type CourseDetail = {
  id: number;
  nickname: string;
  title: string;
  location: string;
  meanStarPoint: number;
  countStarPoint: number;
  stops: string[];
  imageUrlList?: string[];
  content: string;
  updatedAt: string;
  comments: {
    comment_content: string;
    createdAt: string;
    nickname: string;
    starPoint: number;
  }[];
  spots: spotUseCourse[]; // 핫플레이스에 사용할 spots 추가
};

export default Course;
