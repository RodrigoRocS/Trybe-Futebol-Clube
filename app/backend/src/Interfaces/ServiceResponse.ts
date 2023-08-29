export type ServiceMessage = { message: string };

type ServiceResponseErrorType = 'BAD_REQUEST' | 'UNAUTHORIZED' | 'NOT_FOUND' | 'CONFLICT';

export type ServiceResponseError = {
  status: ServiceResponseErrorType,
  data: ServiceMessage
};

export type ServiceResponseSuccess<T> = {
  status: 'SUCCESSFUL',
  data: T | null
};

export type ServiceResponse<T> = ServiceResponseError | ServiceResponseSuccess<T>;

// fonte: https://github.com/tryber/sd-029-a-live-lectures/blob/lecture/back-end-10.1/src/utils/mapStatusHTTP.ts
