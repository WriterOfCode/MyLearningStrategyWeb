import {Guid} from 'guid-typescript';

export interface UserProfileResolved {
  userprofile: IUserProfile;
  error?: any;
}

export class UserProfile implements IUserProfile {
  userProfileId: number;
  externalID: string;
  displayName: string;
  emailAddress?: any;
  firstName?: any;
  lastName?: any;
  postalCode?: any;
  identityProvider: string;
  imageDevice?: any;
  imageCloud?: any;
  imageHash: number;
  originator: Guid;
  lastModifiedOffset: Date;
  hasLoggedIn: boolean;
  isLocked: boolean;
  isDisabled: boolean;
  isDeleted: boolean;
  surname?: string;
  givenName?: string;
  jobTitle?: string;
  mail?: string;
  mobilePhone?: string;
}
export interface IUserProfile {
  userProfileId: number;
  externalID: string;
  displayName: string;
  emailAddress?: any;
  firstName?: any;
  lastName?: any;
  postalCode?: any;
  identityProvider: string;
  imageDevice?: any;
  imageCloud?: any;
  imageHash: number;
  originator: Guid;
  lastModifiedOffset: Date;
  hasLoggedIn: boolean;
  isLocked: boolean;
  isDisabled: boolean;
  isDeleted: boolean;
  surname?: string;
  givenName?: string;
  jobTitle?: string;
  mail?: string;
  mobilePhone?: string;
}
