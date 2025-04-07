import { FC, useContext } from "react";
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

const App: FC = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const { pageTodisplay, setPageTodisplay } = useContext(PageContext);

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
      default:
        return <EventList />;
    }
  };
  const isPwa = window.location.href.includes("?isPwa=true");
  const isCsv = window.location.href.includes("?isCsv=true");
  return (
    <div className="App">
      <img
        onClick={() => setPageTodisplay(PageType.EventList)}
        className="logo"
        src={logo}
        alt="Logo"
      />
      {isAuthenticated ? render() : <Login />}
      <div style={{color: "#FFFFFF"}}>
        {isCsv ? "CSV !" : isPwa ? "PWA !" : "Pas une PWA !"}
      </div>
    </div>
  );
};

export default App;
