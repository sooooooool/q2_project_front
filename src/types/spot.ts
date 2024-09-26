interface Spot {
    id: number;
    name: string;
    location: string;
    rating: number;
}

export default Spot;

export interface spotUseCourse {
    id: number;
    Spot_Name: string;
    Category: string;
    icon: string;
  }