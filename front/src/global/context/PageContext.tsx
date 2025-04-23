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
  CsvMode,
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

export const PageProvider: FC<{ children: JSX.Element }> = ({
  children,
}) => {
  const isCsvMode = window.location.href.includes("?isCsv=true");
  const [pageTodisplay, setPageTodisplay] = useState<PageType>(
    isCsvMode ? PageType.CsvMode : PageType.Home
  );
  const [eventTodisplay, setEventTodisplay] =
    useState<EventsRecord | null>(null);
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
