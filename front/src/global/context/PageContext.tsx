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
  navEventId: string;
  setNavEventId: (eventId: string) => void;
}

export const PageContext = createContext<PageContextProps>({
  pageTodisplay: PageType.Home,
  setPageTodisplay: () => {},
  eventTodisplay: null,
  setEventTodisplay: () => {},
  navEventId: "",
  setNavEventId: () => {},
});

export const PageProvider: FC<{ children: JSX.Element }> = ({
  children,
}) => {
  const isCsvMode = window.location.search.includes("?isCsv=true");
  const isNavEvent = window.location.search.includes("?eventId=");
  const navEvtId = window.location.search.split("=")[1];
  const [pageTodisplay, setPageTodisplay] = useState<PageType>(
    isNavEvent
      ? PageType.EventDetails
      : isCsvMode
      ? PageType.CsvMode
      : PageType.Home
  );
  const [eventTodisplay, setEventTodisplay] =
    useState<EventsRecord | null>(null);
  const [navEventId, setNavEventId] = useState(navEvtId || "");
  return (
    <PageContext.Provider
      value={{
        pageTodisplay,
        setPageTodisplay,
        eventTodisplay,
        setEventTodisplay,
        navEventId,
        setNavEventId,
      }}
    >
      {children}
    </PageContext.Provider>
  );
};
