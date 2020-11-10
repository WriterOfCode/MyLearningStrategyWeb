import {Guid} from 'guid-typescript';
import { Category } from './category';

export type SubjectSortColumn = keyof CompleteSubject | '';
export type SubjectSortDirection = 'asc' | 'desc' | '';
export type SubjectRequiredProps = Pick<CompleteSubject, 'bodyOfKnowledgeId' | 'userProfileId' | 'name'>;

export interface SubjectsState {
  currentSubjectId: number | null;
  subjects: CompleteSubject[];
  error?: any;
  currentPage: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: SubjectSortColumn;
  sortDirection: SubjectSortDirection;
  isBusy: boolean;
}

export interface CompleteSubject {
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
      tags: string[];
      questions: Question[];
      categories: Category[];
      lastModifiedOffset: Date;
      cloudRowId: Guid;
  }

export interface Question {
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
    responses: Response[];
    lastModifiedOffset:	Date;
    cloudRowId:	Guid;
  }

export interface Response {
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
