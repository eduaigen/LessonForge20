
export type CurriculumContent = {
  [subject: string]: {
    units: {
      [unit: string]: {
        topics: {
          [topic: string]: {
            lessons: string[];
          }
        };
      };
    };
  };
};

export const curriculumData: {
  subjects: string[];
} = {
  subjects: ['AP Biology', 'NGSS Biology (OpenSciEd)', 'NV Biology', 'Chemistry', 'NV Earth Science', 'Physics', 'History', 'Health', 'Math', 'ELA 9th Grade', 'ELA 10th Grade', 'ELA 11th Grade', 'ELA 12th Grade', 'Global History I (Grade 9)', 'Global History II (Grade 10)', 'US History & Government', 'Government & Economics', 'Illustrative Math Algebra 1', 'Illustrative Math Algebra 2', 'Illustrative Math Geometry'],
};
