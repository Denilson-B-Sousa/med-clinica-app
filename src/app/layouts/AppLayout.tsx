import { Outlet } from "react-router-dom";

export function AppLayout() {
  return (
    <div className="min-h-screen">
      <header>Navbar</header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}