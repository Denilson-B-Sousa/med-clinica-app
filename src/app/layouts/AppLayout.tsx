import { Footer } from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";
import { Outlet } from "react-router-dom";

export function AppLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-4 pb-12">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
