export const API_DOC_TYPE = {
  SIGNUP: 'signup',
  LOGIN: 'login',
} as const;

export type API_DOC_TYPE = typeof API_DOC_TYPE[keyof typeof API_DOC_TYPE];
