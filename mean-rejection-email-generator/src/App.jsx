import { RejectionForm, Navbar } from "./components";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Navbar />
      <RejectionForm />
    </AuthProvider>
  );
}

export default App;
