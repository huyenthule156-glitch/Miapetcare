import { Header } from "../components/header";
import { Footer } from "../components/footer";
import { CircularServices } from "../components/circular-services";

export function Services() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-pink-50">
      <Header />
      
      {/* Circular Services Section */}
      <CircularServices />

      <Footer />
    </div>
  );
}
