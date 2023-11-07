import { useState, useCallback, useEffect } from "react";

let logoutTimer: any;

interface AppInterface {
  token: boolean;
  login(user_id: string, token: boolean, expirationData: Date): void;
  logout(): void;
  userId: string;
}

const useAuth = (): AppInterface => {
  const [token, setToken] = useState<boolean>(false);
  const [tokenExpirationDate, setTokenExpirationDate] = useState<Date | null>();
  const [userId, setUserId] = useState<string | null>(null);

  const login = useCallback(
    (user_id: string, token: boolean, expirationData: Date) => {
      setToken(token);
      setUserId(user_id);
      const tokenExpirationDateLogin =
        expirationData || new Date(new Date().getTime() + 1000 * 60 * 60);
      setTokenExpirationDate(tokenExpirationDateLogin);
      localStorage.setItem(
        "userData",
        JSON.stringify({
          userId: user_id,
          token: token,
          expiration: tokenExpirationDateLogin.toISOString(),
        })
      );
    },
    []
  );

  const logout = useCallback(() => {
    setToken(null);
    setTokenExpirationDate(null);
    setUserId(null);
    localStorage.removeItem("userData");
  }, []);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime =
        tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(
        storedData.userId,
        storedData.token,
        new Date(storedData.expiration)
      );
    }
  }, [login]);
  return { token, login, logout, userId };
};

export default useAuth;
