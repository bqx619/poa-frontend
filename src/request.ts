/** Request 网络请求工具 更详细的 api 文档: https://github.com/umijs/umi-request */
import type { RequestOptionsInit } from 'umi-request';
import type { RequestConfig } from 'umi';

const authHeaderInterceptor = (url: string, options: RequestOptionsInit) => {
  const prefix = url.startsWith('http') ? '' : POA_BACKEND_BASE_URL;
  if (prefix !== '') {
    return {
      url: `${prefix}${url}`,
      options: { ...options, interceptors: true },
    };
  }
  return { url: `${prefix}${url}`, options };
};

/**
 * @en-US Configure the default parameters for request
 * @zh-CN 配置request请求时的默认参数
 */
const request: RequestConfig = {
  credentials: 'same-origin', // Does the default request bring cookies
  requestInterceptors: [authHeaderInterceptor],
};

export default request;
