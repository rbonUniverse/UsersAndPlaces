import { useState, useCallback, useEffect, useRef } from "react";
import axios, { AxiosError } from "axios";

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState(null);

  const activeHttpRequests = useRef<AbortController[]>([]);

  const sendRequest = useCallback(
    async (
      method: "GET" | "POST" | "PATCH" | "DELETE",
      url: string,
      body?:
        | { name?: string; email: string; password: string }
        | {
            creatorId?: string;
            title: string;
            description: string;
            address?: string;
          }
    ) => {
      setIsLoading(true);
      const httpAbortCtrl = new AbortController();
      activeHttpRequests.current.push(httpAbortCtrl);

      let response;
      try {
        if (method === "POST") {
          response = await axios.post(url, body);
        }
        if (method === "GET") {
          response = await axios.get(url);
        }
        if (method === "PATCH") {
          response = await axios.patch(url, body);
        }
        if (method === "DELETE") {
          response = await axios.delete(url);
        }

        activeHttpRequests.current = activeHttpRequests.current.filter(
          (reqCtrl) => !reqCtrl.signal.aborted
        );

        if (response.status !== 200 && response.status !== 201) {
          throw new Error(response.data.message);
        }
        setIsLoading(false);

        return response.data;
      } catch (err: any) {
        if (axios.isAxiosError(err)) {
          const axiosError = err as AxiosError;
          setError(axiosError.response?.data);
        } else {
          setError(err.toString());
        }
        setIsLoading(false);
        throw err;
      }
    },
    []
  );

  const clearError = () => {
    setError(null);
  };

  useEffect(() => {
    return () => {
      activeHttpRequests.current.forEach((abortCtrl) => abortCtrl.abort());
    };
  }, []);

  return { isLoading, error, sendRequest, clearError };
};
