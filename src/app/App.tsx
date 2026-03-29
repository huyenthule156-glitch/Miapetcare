import { RouterProvider } from "react-router";
import { router } from "./routes";
import { AuthProvider } from "./contexts/auth-context";

// Main App with proper provider hierarchy
export default function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}
