import { X_USER_ID } from '@/constants/header';

const HARDCODED_USER_ID = '3';

/**
 * Helper function to get the authentication header. Defaults to a hardcoded user ID if none is provided
 */
export const getAuthHeader = (userId?: string) => {
  return {
    [X_USER_ID]: userId ?? HARDCODED_USER_ID,
  };
};
