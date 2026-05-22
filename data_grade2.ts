
import { Grade } from './types';
import { hisLessonsB1, hisLessonsB2, hisLessonsB3, hisLessonsB4 } from './data_grade2_historia';
import { geoLessonsB1, geoLessonsB2, geoLessonsB3, geoLessonsB4 } from './data_grade2_geografia';
import { phiLessonsB1, phiLessonsB2, phiLessonsB3, phiLessonsB4 } from './data_grade2_filosofia';
import { socLessonsB1, socLessonsB2, socLessonsB3, socLessonsB4 } from './data_grade2_sociologia';
import { quiLessonsB1, quiLessonsB2, quiLessonsB3, quiLessonsB4 } from './data_grade2_quimica';
import { fisLessonsB1, fisLessonsB2, fisLessonsB3, fisLessonsB4 } from './data_grade2_fisica';
import { bioLessonsB1, bioLessonsB2, bioLessonsB3, bioLessonsB4 } from './data_grade2_biologia';
import { porLessonsB1, porLessonsB2, porLessonsB3, porLessonsB4 } from './data_grade2_portugues';
import { redLessonsB1, redLessonsB2, redLessonsB3, redLessonsB4 } from './data_grade2_redacao';
import { ingLessonsB1, ingLessonsB2, ingLessonsB3, ingLessonsB4 } from './data_grade2_ingles';
import { artLessonsB1, artLessonsB2, artLessonsB3, artLessonsB4 } from './data_grade2_artes';
import { efLessonsB1, efLessonsB2, efLessonsB3, efLessonsB4 } from './data_grade2_educacao_fisica';
import { matLessonsB1, matLessonsB2, matLessonsB3, matLessonsB4 } from './data_grade2_matematica';

export const grade2Data: Grade = {
  id: 2,
  title: "2ª Série",
  description: "Todas as Áreas do Conhecimento",
  color: "bg-indigo-600",
  bimesters: [
    {
      id: 1,
      title: "1º Bimestre",
      lessons: [
        ...hisLessonsB1, ...geoLessonsB1, ...phiLessonsB1, ...socLessonsB1,
        ...quiLessonsB1, ...fisLessonsB1, ...bioLessonsB1,
        ...porLessonsB1, ...redLessonsB1, ...ingLessonsB1, ...artLessonsB1, ...efLessonsB1,
        ...matLessonsB1,
      ]
    },
    {
      id: 2,
      title: "2º Bimestre",
      lessons: [
        ...hisLessonsB2, ...geoLessonsB2, ...phiLessonsB2, ...socLessonsB2,
        ...quiLessonsB2, ...fisLessonsB2, ...bioLessonsB2,
        ...porLessonsB2, ...redLessonsB2, ...ingLessonsB2, ...artLessonsB2, ...efLessonsB2,
        ...matLessonsB2,
      ]
    },
    {
      id: 3,
      title: "3º Bimestre",
      lessons: [
        ...hisLessonsB3, ...geoLessonsB3, ...phiLessonsB3, ...socLessonsB3,
        ...quiLessonsB3, ...fisLessonsB3, ...bioLessonsB3,
        ...porLessonsB3, ...redLessonsB3, ...ingLessonsB3, ...artLessonsB3, ...efLessonsB3,
        ...matLessonsB3,
      ]
    },
    {
      id: 4,
      title: "4º Bimestre",
      lessons: [
        ...hisLessonsB4, ...geoLessonsB4, ...phiLessonsB4, ...socLessonsB4,
        ...quiLessonsB4, ...fisLessonsB4, ...bioLessonsB4,
        ...porLessonsB4, ...redLessonsB4, ...ingLessonsB4, ...artLessonsB4, ...efLessonsB4,
        ...matLessonsB4,
      ]
    }
  ]
};
