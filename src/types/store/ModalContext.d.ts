type TModalVisible = {
  modal: boolean;
  action: "update" | "create" | undefined;
};
type IModalContext = {
  isModalVisible: TModalVisible;
  // isModalChangeChildrenElement: boolean;
  setModalOn: (type: "update" | "create" | undefined) => void;
  setModalOff: () => void;
  // setModalChangeChildrenElementOn: () => void;
  // setModalChangeChildrenElementOff: () => void;
};

export { IModalContext, TModalVisible };
