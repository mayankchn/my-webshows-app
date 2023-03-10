type Image = {
    medium: string; original: string
}

type Rating = {
    average?: number
}

export type Show = {
    id: number;
    image?: Image
    name: string;
    genres: string[];
    rating: Rating;
    summary?: string;
}

export type Cast = {
    id: number;
    image?: Image;
    name: string;
}