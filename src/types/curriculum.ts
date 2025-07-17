
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

export type Quarter = {
    quarter: string;
    units: { [key: string]: Unit };
};

export type Curriculum = {
    units: { [key: string]: Unit };
};

export type QuarterBasedCurriculum = {
    quarters: { [key: string]: Quarter };
};
