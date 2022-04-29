import { Navigation } from "./components";
import { Router } from "./Router";

function App() {
  let token = true;

  return (
    <div>
      {token && <Navigation />}
      <Router />
    </div>
  );
}

export default App;
