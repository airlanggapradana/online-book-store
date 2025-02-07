"use client";
import { useEffect, useState } from "react";
import { getToken } from "../utils/getToken";

const useToken = () => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchToken = async () => {
      const tokenValue = await getToken();
      setToken(tokenValue);
    };

    fetchToken();
  }, []);

  return { token };
};

export default useToken;
