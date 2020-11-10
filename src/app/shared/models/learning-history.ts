import {Guid} from 'guid-typescript';

export interface LearningHistory {
  strategyHistoryId: number;
  strategyId: number;
  bodyOfKnowledgeId: number;
  name:	string;
  description: string;
  sortRuleId: number;
  questionSelection: number;
  responseSelection: number;
  onlyCorrect: boolean;
  recycleIncorrectlyAnswered:	boolean;
  firstLearningRunDate: string;
  numberOfTimesTried: number;
  lastQuestionId: number;
  lastModifiedOffset:	string;
  cloudRowId: Guid;
}

export interface LearningHistoryResolved {
  learningHistory: LearningHistory;
  error?: any;
}




