import React, {
  FC,
  memo,
  ReactNode,
  useCallback,
  useMemo,
  useState,
} from "react";
import ModalContext from "./ModalContext";
import { TModalVisible } from "../../types/store/ModalContext";

const ModalContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [modal, setModal] = useState<TModalVisible>({
    modal: false,
    action: undefined,
  });
  const modalOnHandler = useCallback(
    (type: "update" | "create" | undefined) => {
      setModal((prev) => ({ ...prev, modal: true, action: type }));
    },
    [],
  );
  const modalOffHandler = useCallback(
    () => setModal((prev) => ({ ...prev, modal: false, action: undefined })),
    [],
  );
  // const modalChangeChildrenElementOn = useCallback(
  //   () => setModalChangeChildrenElement(() => true),
  //   [],
  // );
  // const modalChangeChildrenElementOff = useCallback(
  //   () => setModalChangeChildrenElement(() => false),
  //   [],
  // );
  const ModalContextValueFunction = useMemo(
    () => ({
      setModalOn: modalOnHandler,
      setModalOff: modalOffHandler,
      // setModalChangeChildrenElementOn: modalChangeChildrenElementOn,
      // setModalChangeChildrenElementOff: modalChangeChildrenElementOff,
    }),
    [],
  );
  const ModalContextValueState = useMemo(
    () => ({
      isModalVisible: modal,
    }),
    [modal],
  );
  return (
    <ModalContext.Provider
      value={{ ...ModalContextValueState, ...ModalContextValueFunction }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export default memo(ModalContextProvider);
