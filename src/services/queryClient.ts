import { QueryClient } from '@tanstack/react-query';

/** Shared cache for data loaded from the server (recipes, plans, lists). */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 60_000,
    },
  },
});
