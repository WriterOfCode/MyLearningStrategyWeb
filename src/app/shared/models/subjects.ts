import {Guid} from 'guid-typescript';

export interface Subject {
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
      categoryIds: number[];
      lastModifiedOffset: Date;
      cloudRowId: Guid;
  }

export interface SubjectResolved {
  subject: Subject;
  count: number;
  error?: any;

}

export interface SubjectsResolved {
  subjects: Subject[];
  count: number;
  error?: any;
}



