

export type Lesson = {
    title: string;
    objective: string;
    standard?: string;
};

export type Topic = {
    topic: string;
    lessons: Lesson[];
};

export type Unit = {
    unit: string;
    topics: { [key: string]: Topic };
};

export type Curriculum = {
    units: { [key: string]: Unit };
}

export const curriculumData: {
  subjects: string[];
} = {
  subjects: ['AP Biology', 'NGSS Biology (OpenSciEd)', 'NV Biology', 'Chemistry (OpenSciEd)', 'NV Earth Science', 'Physics (OpenSciEd)', 'Health', 'ELA 9th Grade', 'ELA 10th Grade', 'ELA 11th Grade', 'ELA 12th Grade', 'Global History I (Grade 9)', 'Global History II (Grade 10)', 'US History & Government', 'Government & Economics', 'Illustrative Math Algebra 1', 'Illustrative Math Algebra 2', 'Illustrative Math Geometry'],
};
