import { Router, createBrowserRouter } from "react-router-dom";
import App from "../App";
import Contacts from "../pages/Contacts/Index";
import HeaderContextProvider from "../store/Header/HeaderContextProvider";
import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "../api/apollo/apolloClient";
import ContactContextProvider from "../store/Contact/ContactContextProvider";
import ContactsFavorite from "../pages/ContactsFavorite/Index";
import ModalContextProvider from "../store/Modal/ModalContextProvider";

const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <ApolloProvider client={apolloClient}>
        <ModalContextProvider>
          <HeaderContextProvider>
            <App />
          </HeaderContextProvider>
        </ModalContextProvider>
      </ApolloProvider>
    ),
    children: [
      {
        path: "/",
        element: <Contacts />,
      },
      {
        path: "/contacts/favorite",
        element: <ContactsFavorite />,
      },
    ],
  },
]);

export default routes;
