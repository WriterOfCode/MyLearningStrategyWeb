import {Guid} from 'guid-typescript';

export interface Questions {
  questionId: number;
  bodyOfKnowledgeId: number;
  orderBy: number;
  question:	string;
  image_1_Device:	string;
  image_1_Cloud:	string;
  image_1_Hash: number;
  image_2_Device:	string;
  image_2_Cloud:	string;
  image_2_Hash: number;
  image_3_Device:	string;
  image_3_Cloud:	string;
  image_3_Hash: number;
  hyperlink_1:	string;
  hyperlink_2:	string;
  hyperlink_3:	string;
  mnemonic:	string;
  lastModifiedOffset:	Date;
  cloudRowId:	Guid;
}

export interface QuestionResolved {
  question: Questions;
  error?: any;
}

export interface QuestionsResolved {
  questions: Questions[];
  count: number;
  error?: any;
}
