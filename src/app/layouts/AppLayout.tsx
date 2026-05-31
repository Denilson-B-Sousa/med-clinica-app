import { Footer } from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";
import { Outlet } from "react-router-dom";

export function AppLayout() {
  return (
    <div className="min-h-screen">
      <Header/>
      <main className="py-4">
        <Outlet />
      </main>
      <Footer/>
    </div>
  );
}