
import { nvBiologyCurriculum } from './nv-biology-curriculum';
import { earthScienceCurriculum } from './earth-science-curriculum';
import { chemistryCurriculum } from './chemistry-curriculum';
import { physicsCurriculum } from './physics-curriculum';
import { apBiologyCurriculum } from './ap-biology-curriculum';
import { healthCurriculum } from './health-curriculum';
import { anatomyPhysiologyCurriculum } from './anatomy-physiology-curriculum';
import { algebra1Curriculum } from './algebra1-curriculum';
import { algebra2Curriculum } from './algebra2-curriculum';
import { geometryCurriculum } from './geometry-curriculum';
import { ela9Curriculum } from './ela9-curriculum';
import { ela10Curriculum } from './ela10-curriculum';
import { ela11Curriculum } from './ela11-curriculum';
import { ela12Curriculum } from './ela12-curriculum';
import { globalHistory1Curriculum } from './global-history-1-curriculum';
import { globalHistory2Curriculum } from './global-history-2-curriculum';
import { usHistoryCurriculum } from './us-history-curriculum';
import { governmentEconomicsCurriculum } from './government-economics-curriculum';
import { ellCurriculum } from './ell-curriculum';

export type Lesson = {
  title: string;
  objective: string;
  standard?: string;
};

type Topic = {
  topic: string;
  lessons: Lesson[];
};

type Unit = {
  unit: string;
  topics: { [key: string]: Topic };
};

type Curriculum = {
  units: { [key: string]: Unit };
};

export const allCurriculums: { name: string, curriculum: Curriculum }[] = [
  { name: "NV Biology", curriculum: nvBiologyCurriculum },
  { name: "NV Earth Science", curriculum: earthScienceCurriculum },
  { name: "NGSS Chemistry", curriculum: chemistryCurriculum },
  { name: "NGSS Physics", curriculum: physicsCurriculum },
  { name: "AP Biology", curriculum: apBiologyCurriculum },
  { name: "Health", curriculum: healthCurriculum },
  { name: "Anatomy & Physiology", curriculum: anatomyPhysiologyCurriculum },
  { name: "Illustrative Math - Algebra 1", curriculum: algebra1Curriculum },
  { name: "Illustrative Math - Algebra 2", curriculum: algebra2Curriculum },
  { name: "Illustrative Math - Geometry", curriculum: geometryCurriculum },
  { name: "ELA 9th Grade", curriculum: ela9Curriculum },
  { name: "ELA 10th Grade", curriculum: ela10Curriculum },
  { name: "ELA 11th Grade", curriculum: ela11Curriculum },
  { name: "ELA 12th Grade", curriculum: ela12Curriculum },
  { name: "Global History I", curriculum: globalHistory1Curriculum },
  { name: "Global History II", curriculum: globalHistory2Curriculum },
  { name: "U.S. History & Government", curriculum: usHistoryCurriculum },
  { name: "Government & Economics", curriculum: governmentEconomicsCurriculum },
  { name: "ELL / ENL", curriculum: ellCurriculum },
];
