import {Guid} from 'guid-typescript';

export interface Responses {
  responseId: number;
  questionId: number;
  orderBy: number;
  response:	string;
  isCorrect:	boolean;
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

export interface ResponseResolved {
  response: Responses;
  error?: any;
}

export interface ResponsesResolved {
  responses: Responses[];
  count: number;
  error?: any;
}
