// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /analysis/v1 */
export async function AnalysisInterfaceListAnalysis(
  params: {
    // query
    sort?: string;
    sortType?: string;
    pageSize?: number;
    current?: number;
    domain?: string;
    uid?: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.v1ListAnalysisReply>('/analysis/v1', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /analysis/v1/area/top10 */
export async function AnalysisInterfaceTop10Area(options?: { [key: string]: any }) {
  return request<API.v1Top10Reply>('/analysis/v1/area/top10', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /analysis/v1/category/top10 */
export async function AnalysisInterfaceTop10Category(options?: { [key: string]: any }) {
  return request<API.v1Top10Reply>('/analysis/v1/category/top10', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /analysis/v1/emotion/distribute */
export async function AnalysisInterfaceEmotionDistribute(options?: { [key: string]: any }) {
  return request<API.v1EmotionDistributeReply>('/analysis/v1/emotion/distribute', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /analysis/v1/emotion/notice */
export async function AnalysisInterfaceEmotionNotice(options?: { [key: string]: any }) {
  return request<API.v1EmotionNoticeReply>('/analysis/v1/emotion/notice', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /analysis/v1/keywords/top10 */
export async function AnalysisInterfaceTop10Keywords(options?: { [key: string]: any }) {
  return request<API.v1Top10Reply>('/analysis/v1/keywords/top10', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 PUT /analysis/v1/run */
export async function AnalysisInterfaceRunAnalysis(
  body: API.v1RunAnalysisRequest,
  options?: { [key: string]: any },
) {
  return request<API.v1RunAnalysisReply>('/analysis/v1/run', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /analysis/v1/${param0} */
export async function AnalysisInterfaceGetAnalysis(
  params: {
    // path
    id: number;
  },
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.v1GetAnalysisReply>(`/analysis/v1/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}
