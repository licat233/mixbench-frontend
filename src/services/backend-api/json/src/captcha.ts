/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

/** BaseResp */
export interface BaseResp {
  /**
   * 【响应状态】
   * @format boolean
   */
  success: boolean;
  /** 【给予的提示信息】 */
  message?: string;
  /** 【选填】响应的业务数据 */
  data?: object;
  /**
   *  【选填】数据总个数
   * @format int64
   */
  total?: number;
  /**
   *  【选填】单页数量
   * @format int64
   */
  pageSize?: number;
  /**
   *  【选填】当前页码，current与antd前端对接
   * @format int64
   */
  current?: number;
  /**
   *  【自己加上去的】总共有多少页，根据前端的pageSize来计算
   * @format int64
   */
  totalPage?: number;
  /**
   *  【选填】错误类型代码：400错误请求，401未授权，500服务器内部错误，200成功
   * @format int32
   */
  errorCode?: number;
  /**  【选填】向用户显示消息 */
  errorMessage?: string;
  /**  【选填】调试错误信息，请勿在生产环境下使用，可有可无 */
  traceMessage?: string;
  /**
   *  【选填】错误显示类型：0.不提示错误;1.警告信息提示；2.错误信息提示；4.通知提示；9.页面跳转
   * @format int32
   * @default "2"
   */
  showType: number;
  /**  【选填】方便后端故障排除：唯一的请求ID */
  traceId?: string;
  /**  【选填】方便后端故障排除：当前访问服务器的主机 */
  host?: string;
}

/** CaptchaBgColor */
export interface CaptchaBgColor {
  /** @default "254" */
  R: any;
  /** @default "254" */
  G: any;
  /** @default "254" */
  B: any;
  /** @default "254" */
  A: any;
}

/** CaptchaInfo */
export interface CaptchaInfo {
  /** 验证码Key */
  captcha_id: string;
  /** base46图片 */
  base64_image: string;
}

/** CaptchaReq */
export interface CaptchaReq {
  /**
   * @format int32
   * @default "60"
   */
  height: number;
  /**
   * @format int32
   * @default "200"
   */
  width: number;
  BgColor: CaptchaBgColor;
}

/** EmailCaptchaReq */
export interface EmailCaptchaReq {
  captcha_id: string;
  solution: string;
  /** 接收验证码的邮箱地址 */
  email: string;
}

/** EmailCaptchaResp */
export interface EmailCaptchaResp {
  captcha_id: string;
  /** @format int64 */
  expires_at: number;
}

/** EmailCaptchaVerifyReq */
export interface EmailCaptchaVerifyReq {
  email: string;
  captcha_id: string;
  solution: string;
}

/** ProcessCaptchaReq */
export interface ProcessCaptchaReq {
  captcha_id: string;
  solution: string;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, 'body' | 'bodyUsed'>;

export interface FullRequestParams extends Omit<RequestInit, 'body'> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<FullRequestParams, 'body' | 'method' | 'query' | 'path'>;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, 'baseUrl' | 'cancelToken' | 'signal'>;
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = 'application/json',
  FormData = 'multipart/form-data',
  UrlEncoded = 'application/x-www-form-urlencoded',
  Text = 'text/plain',
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = '';
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>['securityWorker'];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: 'same-origin',
    headers: {},
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === 'number' ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join('&');
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter((key) => 'undefined' !== typeof query[key]);
    return keys
      .map((key) =>
        Array.isArray(query[key])
          ? this.addArrayQueryParam(query, key)
          : this.addQueryParam(query, key),
      )
      .join('&');
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : '';
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === 'object' || typeof input === 'string')
        ? JSON.stringify(input)
        : input,
    [ContentType.Text]: (input: any) =>
      input !== null && typeof input !== 'string' ? JSON.stringify(input) : input,
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === 'object' && property !== null
            ? JSON.stringify(property)
            : `${property}`,
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === 'boolean' ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(
      `${baseUrl || this.baseUrl || ''}${path}${queryString ? `?${queryString}` : ''}`,
      {
        ...requestParams,
        headers: {
          ...(requestParams.headers || {}),
          ...(type && type !== ContentType.FormData ? { 'Content-Type': type } : {}),
        },
        signal: cancelToken ? this.createAbortSignal(cancelToken) : requestParams.signal,
        body: typeof body === 'undefined' || body === null ? null : payloadFormatter(body),
      },
    ).then(async (response) => {
      const r = response as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title 验证码服务
 * @version v1
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  v1 = {
    /**
     * No description
     *
     * @tags captcha-api
     * @name EmailCaptcha
     * @summary 向邮箱发送验证码
     * @request POST:/v1/api/captcha/email
     * @secure
     */
    emailCaptcha: (body: any, params: RequestParams = {}) =>
      this.request<BaseResp, any>({
        path: `/v1/api/captcha/email`,
        method: 'POST',
        body: body,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags captcha-api
     * @name EmailCaptchaVerify
     * @summary 邮箱验证码校验
     * @request POST:/v1/api/captcha/email/process
     * @secure
     */
    emailCaptchaVerify: (body: any, params: RequestParams = {}) =>
      this.request<EmailCaptchaResp, any>({
        path: `/v1/api/captcha/email/process`,
        method: 'POST',
        body: body,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags captcha-api
     * @name MathCaptcha
     * @summary 获取数学验证码
     * @request POST:/v1/api/captcha/math
     * @secure
     */
    mathCaptcha: (body: any, params: RequestParams = {}) =>
      this.request<BaseResp, any>({
        path: `/v1/api/captcha/math`,
        method: 'POST',
        body: body,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags captcha-api
     * @name ProcessCaptcha
     * @summary 验证码校验
     * @request POST:/v1/api/captcha/process
     * @secure
     */
    processCaptcha: (body: any, params: RequestParams = {}) =>
      this.request<BaseResp, any>({
        path: `/v1/api/captcha/process`,
        method: 'POST',
        body: body,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags captcha-api
     * @name ShowCaptcha
     * @summary 验证码图片
     * @request GET:/v1/api/captcha/show
     * @secure
     */
    showCaptcha: (data: any, params: RequestParams = {}) =>
      this.request<any, any>({
        path: `/v1/api/captcha/show`,
        method: 'GET',
        body: data,
        secure: true,
        format: 'json',
        ...params,
      }),
  };
}
