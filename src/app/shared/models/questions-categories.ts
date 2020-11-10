import {Guid} from 'guid-typescript';

export interface QuestionCategories {
  questionId: number;
  categoryId: number;
  userProfileId: number;
  categoryName:	string;
  imageDevice:	string;
  imageCloud:	string;
  imageHash: number;
  lastModifiedOffset: Date;
  cloudRowId: Guid;
  }

export interface QuestionCategoriesResolved {
    questionCategories: QuestionCategories[];
    error?: any;
  }

export interface QuestionsCategoryLink {
    questionId: number;
    categoryId: number;
    originator: Guid;
    lastModifiedOffset: Date;
    cloudRowId:	Guid;
  }

export interface QuestionsCategoryLinkResolved {
    questionsCategoryLink: QuestionsCategoryLink;
    error?: any;
  }
