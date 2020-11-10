// tslint:disable-next-line: quotemark
import { createAction, props } from "@ngrx/store";
import { SubjectRequiredProps } from '../../shared/models/subjects';

export const enterSubjectEditAct = createAction("[Subject Edit Page] Enter");
// [Subject Edit Page] Update Subject in Subject Edit
// 	- SubjectRequiredProps
// 		- userProfileId
// 	- bodyOfKnowledgeId
const updateSubjectAct = createAction(
   '[Subject Edit Page] Update Subject',
    props<{SubjectRequiredProps}>()
  );
// [Subject Edit Page] Delete Subject from Subject Edit
// 	- SubjectRequiredProps
// 	- bodyOfKnowledgeId
const pageDeleteSubjectAct = createAction(
    '[Subject Edit Page] Delete Subject',
    props<{ bodyOfKnowledgeId: number }>()
  );
// [Subject Edit Page] Page though Subject Edit
const pageCancleEditAct = createAction(
    '[Subject Edit Page] Cancel Subject Edit',
    props<{ bodyOfKnowledgeId: number }>()
  );
