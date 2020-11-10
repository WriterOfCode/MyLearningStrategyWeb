import {Guid} from 'guid-typescript';
import { Category } from './category';

export interface LearningHistoryProgress {
  learningHistoryProgressId:	number;
  strategyHistoryId:	number;
  questionId:	number;
  answeredIncorrectlyCount:	number;
  answeredCorrectlyCount:	number;
  numberOfTimes:	number;
  originator:	string;
  lastModifiedOffset:	Date;
  CloudRowId: Guid;
}

export interface LearningHistoryProgressResolved {
  learningHistoryProgress: LearningHistoryProgress;
  error?: any;
}

export interface LearningHistoryStats {
  CloudRowId: Guid;
}

export interface LearningHistoryStatsResolved {
  LearningHistoryStats: LearningHistoryStats;
  error?: any;
}

export interface SubjectStats {
  questionsCount: number;
  learningStrategiesCount: number;
  learningHistoryCount: number;
  answeredCorrectlyCount: number;
  categories:	Category[];
  bodyOfKnowledgeId: number;
  userProfileId: number;
  name: string;
  description: string;
  keywords: string;
  imageDevice: string;
  imageCloud: string;
  imageHash: number;
  isShared: boolean;
  hasBeenShared: boolean;
  lastModifiedOffset: Date;
  cloudRowId: Guid;
  }

export interface SubjectStatsResolved {
    subjectStats: SubjectStats;
    error?: any;
  }


export interface QuestionsStats {
  responseCount: number;
  answeredCorrectly: number;
  answeredIncorrectly: number;
  questionId: number;
  bodyOfKnowledgeId: number;
  orderBy: number;
  question:	string;
  image_1_Device:	string;
  image_1_Cloud:	string;
  image_1_Hash: number;
  image_2_Device:	string;
  image_2_Cloud:	string;
  image_2_Hash:	number;
  image_3_Device:	string;
  image_3_Cloud:	string;
  image_3_Hash:	number;
  hyperlink_1:	string;
  hyperlink_2:	string;
  hyperlink_3:	string;
  mnemonic:	string;
  lastModifiedOffset: Date;
  cloudRowId: Guid;
}


export interface QuestionsStatsResolved {
  subjectStats: QuestionsStats[];
  error?: any;
}

export interface QuestionStatsResolved {
  subjectStat: QuestionsStats;
  error?: any;
}
