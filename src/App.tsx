import { Toaster } from "react-hot-toast";

import { Navigation } from "./components";
import { Router } from "./Router";
import { useAuth } from "./context";

function App() {
  const authData = useAuth();

  return (
    <div>
      <Toaster
        position="bottom-center"
        toastOptions={{
          style: {
            background: "black",
            color: "#fff",
          },
        }}
      />

      {authData.uid && <Navigation />}
      <Router />
    </div>
  );
}

export default App;
