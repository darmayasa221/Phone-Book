import React, {
  FC,
  ReactNode,
  memo,
  useCallback,
  useMemo,
  useState,
} from "react";
import HeaderContext from "./headerContext";

const HeaderContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  ("header context provider");
  const [isSearch, setIsSearch] = useState<boolean>(false);
  const onHandlerSearch = useCallback(() => {
    setIsSearch((prev) => !prev);
  }, []);
  const HeaderContextValueFunction = useMemo(
    () => ({
      onHandlerSearch,
    }),
    [],
  );
  const HeaderContextValueState = useMemo(() => ({ isSearch }), [isSearch]);
  return (
    <HeaderContext.Provider
      value={{ ...HeaderContextValueFunction, ...HeaderContextValueState }}
    >
      {children}
    </HeaderContext.Provider>
  );
};

export default memo(HeaderContextProvider);
