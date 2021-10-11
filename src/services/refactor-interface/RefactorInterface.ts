// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /refactor/v1 */
export async function RefactorInterfaceListRefactor(
  params: {
    // query
    sort?: string;
    sortType?: string;
    pageSize?: number;
    current?: number;
    id?: number;
    day?: number;
    dir?: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.v1ListRefactorReply>('/refactor/v1', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 PUT /refactor/v1/run */
export async function RefactorInterfaceRunRefactor(
  body: API.v1RunRefactorRequest,
  options?: { [key: string]: any },
) {
  return request<API.v1RunRefactorReply>('/refactor/v1/run', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /refactor/v1/survey */
export async function RefactorInterfaceRecapRefactor(options?: { [key: string]: any }) {
  return request<API.v1RecapRefactorReply>('/refactor/v1/survey', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /refactor/v1/${param0} */
export async function RefactorInterfaceGetRefactor(
  params: {
    // path
    id: number;
  },
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.v1GetRefactorReply>(`/refactor/v1/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}
