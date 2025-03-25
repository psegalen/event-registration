import { createContext, FC, useState } from "react";
import { EventsRecord } from "../../pocketbase-type";

export enum PageType {
  Home,
  EventList,
  EventDetails,
  CreateEvent,
  SigninMode,
  CreateSignin,
  RegistrationList,
  CreateRegistration,
  ImportCsv,
}

export interface PageContextProps {
  pageTodisplay: PageType;
  setPageTodisplay: (page: PageType) => void;
  eventTodisplay: EventsRecord | null;
  setEventTodisplay: (event: EventsRecord | null) => void;
}

export const PageContext = createContext<PageContextProps>({
  pageTodisplay: PageType.Home,
  setPageTodisplay: () => {},
  eventTodisplay: null,
  setEventTodisplay: () => {},
});

export const PageProvider: FC<{ children: JSX.Element }> = ({ children }) => {
  const [pageTodisplay, setPageTodisplay] = useState<PageType>(PageType.Home);
  const [eventTodisplay, setEventTodisplay] = useState<EventsRecord | null>(
    null
  );
  return (
    <PageContext.Provider
      value={{
        pageTodisplay,
        setPageTodisplay,
        eventTodisplay,
        setEventTodisplay,
      }}
    >
      {children}
    </PageContext.Provider>
  );
};
