// import React, { FC, ReactNode } from "react";
// import LocalStorageContext from "./LocalStorageContext";
// import { LocalStorageItem } from "../../enum/localstorageItems";
// import { getLocalStorage, setLocalStorage } from "../../utils/localStorage";
// import { ILocalStorageContext } from "../../types/store/LocalStorageContext";
// import ContactContextProvider from "../Contact/ContactContextProvider";

// const LocalStorageContextProvider: FC<{ children: ReactNode }> = ({
//   children,
// }) => {
//   // get Localstorage
//   const dataLocalStorage: ILocalStorageContext = getLocalStorage(
//     LocalStorageItem.contacts,
//   );
//   const postContactFavorite = (id: number, favorite: boolean) => {
//     const contactUpdate = dataLocalStorage.map((contact) => {
//       if (contact.id === id) {
//         return { ...contact, favorite: favorite };
//       }
//     });
//     localStorage.removeItem(`_${LocalStorageItem.contacts}`);
//     setLocalStorage(LocalStorageItem.contacts, contactUpdate);
//   };
//   return (
//     <LocalStorageContext.Provider value={dataLocalStorage}>
//       <ContactContextProvider localStorageData={dataLocalStorage}>
//         {children}
//       </ContactContextProvider>
//     </LocalStorageContext.Provider>
//   );
// };

// export default LocalStorageContextProvider;
