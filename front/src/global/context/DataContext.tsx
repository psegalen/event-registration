import { createContext, FC, useContext, useEffect, useState } from "react";
import {
  Collections,
  EventsRecord,
  RegistrationsRecord,
} from "../../pocketbase-type";
import PocketBase from "pocketbase";
import { AuthContext } from "./AuthContext";

const pb = new PocketBase("http://127.0.0.1:8090");

export interface DataContextProps {
  events: EventsRecord[];
  registrations: RegistrationsRecord[];
  createEvent: (event: EventsRecord) => Promise<boolean>;
  createRegistration: (registration: RegistrationsRecord) => Promise<boolean>;
  updateRegistration: (
    registration: Partial<RegistrationsRecord>
  ) => Promise<boolean>;
}

export const DataContext = createContext<DataContextProps>({
  events: [],
  registrations: [],
  createEvent: () => Promise.resolve(false),
  createRegistration: () => Promise.resolve(false),
  updateRegistration: () => Promise.resolve(false),
});

export const DataProvider: FC<{ children: JSX.Element }> = ({ children }) => {
  const [events, setEvents] = useState<EventsRecord[]>([]);
  const [registrations, setRegistrations] = useState<RegistrationsRecord[]>([]);
  const { isAuthenticated } = useContext(AuthContext);

  const getEvents = async () => {
    try {
      setEvents(
        await pb
          .collection(Collections.Events)
          .getFullList<EventsRecord>(undefined, {
            sort: "-created",
          })
      );
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };
  const getRegistrations = async () => {
    try {
      setRegistrations(
        await pb
          .collection(Collections.Registrations)
          .getFullList<RegistrationsRecord>(undefined, {
            sort: "-created",
          })
      );
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const createEvent = async (event: EventsRecord): Promise<boolean> => {
    try {
      await pb
        .collection(Collections.Events)
        .create(event, { $autoCancel: false });
      getEvents();
      return true;
    } catch (error) {
      console.error("Error creating event:", error);
      return false;
    }
  };

  const createRegistration = async (
    registration: RegistrationsRecord
  ): Promise<boolean> => {
    try {
      await pb.collection(Collections.Registrations).create(registration);
      getRegistrations();
      return true;
    } catch (error) {
      console.error("Error creating registration:", error);
      return false;
    }
  };

  const updateRegistration = async (
    registration: Partial<RegistrationsRecord>
  ): Promise<boolean> => {
    try {
      if (!registration.id) {
        throw new Error("Registration ID is required for update");
      }
      const updatedRegistration = await pb
        .collection(Collections.Registrations)
        .update<RegistrationsRecord>(registration.id, registration);

      setRegistrations((prevRegistrations) =>
        prevRegistrations.map((reg) =>
          reg.id === updatedRegistration.id
            ? { ...reg, ...updatedRegistration }
            : reg
        )
      );
      return true;
    } catch (error) {
      console.error("Error updating registration:", error);
      return false;
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }
    getEvents();
    getRegistrations();
  }, [isAuthenticated]);

  return (
    <DataContext.Provider
      value={{
        events,
        registrations,
        createEvent,
        createRegistration,
        updateRegistration,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
