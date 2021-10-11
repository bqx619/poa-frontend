// @ts-ignore
/* eslint-disable */

declare namespace API {
  type refactorv1Status = 'RUNNING' | 'HANGING' | 'STOP';

  type v1GetRefactorReply = {
    info?: v1RefactorRefactorInfo;
  };

  type v1ListRefactorReply = {
    infos?: v1RefactorRefactorInfo[];
    total?: number;
  };

  type v1RecapRefactorReply = {
    status?: refactorv1Status;
    running?: number;
    success?: number;
    failed?: number;
    waiting?: number;
  };

  type v1RefactorRefactorInfo = {
    id?: number;
    dir?: string;
    day?: number;
    type?: string;
    beginHour?: number;
    endHour?: number;
    md5?: string;
    createTime?: number;
    updateTime?: number;
  };

  type v1RunRefactorReply = true;

  type v1RunRefactorRequest = true;
}
