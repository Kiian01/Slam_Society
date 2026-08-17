import { useEffect, useState } from 'react';

/**
 * Calls an async fetcher (a service function like getUpcomingEvents) and
 * tracks loading state. Works identically whether the fetcher resolves
 * mock data instantly or hits Firebase over the network.
 */
export function useAsyncData<T>(fetcher: () => Promise<T>, deps: unknown[] = []) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    fetcher()
      .then((result) => {
        if (isMounted) setData(result);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { data, loading };
}