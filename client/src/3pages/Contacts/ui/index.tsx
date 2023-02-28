import { FC } from "react";

import ContactsSearch from "./ContactsSearch";
import GlobalUsers from "./GlobalUsers";
import Contacts from "./Contacts";

const ContactsPage: FC = () => {
  return (
    <>
      <ContactsSearch />
      <Contacts />
      <GlobalUsers />
    </>
  );
};

export { ContactsPage };
