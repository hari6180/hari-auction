import { Switch, Route, useHistory } from "react-router-dom";
import Header from "./components/Header";
import AllAuctions from "./pages/AllAuctions";
import MyAuctions from "./pages/MyAuctions";
import { useAuth } from "./context/AuthContext";

function App({ auctionService }) {
  const history = useHistory();
  const { user, logout } = useAuth();

  const onAllAuctions = () => {
    history.push("/");
  };

  const onMyAuctions = () => {
    history.push(`/${user.username}`);
  };

  const onLogout = () => {
    if (window.confirm("Do you want to log out?")) {
      logout();
      history.push("/");
    }
  };

  return (
    <div className="app">
      <Header
        username={user.username}
        onLogout={onLogout}
        onAllAuctions={onAllAuctions}
        onMyAuctions={onMyAuctions}
      />
      <Switch>
        (
        <>
          <Route exact path="/">
            <AllAuctions auctionService={auctionService} />
          </Route>
          <Route exact path="/:username">
            <MyAuctions auctionService={auctionService} />
          </Route>
        </>
        )
      </Switch>
    </div>
  );
}

export default App;
