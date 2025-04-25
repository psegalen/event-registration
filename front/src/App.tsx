import { FC, useContext, useEffect } from "react";
import "./App.css";
import logo from "./assets/logo.png";
import CreateEvent from "./components/CreateEvent";
import CreateRegistration from "./components/CreateRegistration";
import CreateSignin from "./components/CreateSignin";
import EventDetails from "./components/EventDetails";
import EventList from "./components/EventList";
import ImportCsv from "./components/ImportCsv";
import Login from "./components/Login";
import RegistrationList from "./components/RegistrationList";
import SigninMode from "./components/SigninMode";
import { AuthContext } from "./global/context/AuthContext";
import { PageContext, PageType } from "./global/context/PageContext";
import CsvMode from "./components/CsvMode";

const registerServiceWorker = async () => {
  if ("serviceWorker" in navigator) {
    try {
      const registration = await navigator.serviceWorker.register(
        "/cacheSW.js",
        {
          scope: "/",
        }
      );
      if (registration.installing) {
        console.log("Service worker installing");
      } else if (registration.waiting) {
        console.log("Service worker installed");
      } else if (registration.active) {
        console.log("Service worker active");
      }
    } catch (error) {
      console.error(`Registration failed with ${error}`);
    }
  }
};

const App: FC = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const { pageTodisplay, setPageTodisplay } = useContext(PageContext);

  useEffect(() => {
    registerServiceWorker();
    Notification.requestPermission().then((response) =>
      console.log("Notification permission response", response)
    );
  }, []);

  const render = () => {
    switch (pageTodisplay) {
      case PageType.CreateEvent:
        return <CreateEvent />;
      case PageType.CreateRegistration:
        return <CreateRegistration />;
      case PageType.CreateSignin:
        return <CreateSignin />;
      case PageType.EventDetails:
        return <EventDetails />;
      case PageType.EventList:
        return <EventList />;
      case PageType.ImportCsv:
        return <ImportCsv />;
      case PageType.RegistrationList:
        return <RegistrationList />;
      case PageType.SigninMode:
        return <SigninMode />;
      case PageType.CsvMode:
        return <CsvMode />;
      default:
        return <EventList />;
    }
  };
  return (
    <div className="App">
      <img
        onClick={() => setPageTodisplay(PageType.EventList)}
        className="logo"
        src={logo}
        alt="Logo"
      />
      {isAuthenticated ? render() : <Login />}
    </div>
  );
};

export default App;
