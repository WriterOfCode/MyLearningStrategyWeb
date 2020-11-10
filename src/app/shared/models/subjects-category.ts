import {Guid} from 'guid-typescript';

export interface SubjectsCategories {
  bodyOfKnowledgeId: number;
  categoryId: number;
  userProfileId: number;
  categoryName:	string;
  imageDevice:	string;
  imageCloud:	string;
  imageHash: number;
  lastModifiedOffset:	Date;
  cloudRowId: Guid;
}

export interface SubjectsCategoriesResolved {
  subjectsCategories: SubjectsCategories;
  error?: any;
}
export interface SubjectsCategoriesLink {
  bodyOfKnowledgeId: number;
  categoryId: number;
  originator: Guid;
  lastModifiedOffset: string;
  cloudRowId: Guid;
}

export interface SubjectsCategoriesLinkResolved {
  subjectsCategoriesLink: SubjectsCategoriesLink;
  error?: any;
}
