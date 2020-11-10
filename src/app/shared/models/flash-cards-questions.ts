import {Guid} from 'guid-typescript';
import { LearningHistoryProgress } from './learning-history';

export interface FlashCardsQuestions {
  AnsweredCorrectly: number;
  AnsweredIncorrectly: number;
  Responses: Response[];
  Progress: LearningHistoryProgress[];
}

export interface FlashCardsQuestionsResolved {
  flashCardsQuestions: FlashCardsQuestions;
  error?: any;
}
