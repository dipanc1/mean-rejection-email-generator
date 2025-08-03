import { RejectionForm, Navbar, Footer } from "./components";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 py-4">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <RejectionForm />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
