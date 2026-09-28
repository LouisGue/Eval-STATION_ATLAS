import { Link, NavLink, Outlet } from "react-router-dom";

export function AppLayout() {
  return (
    <div>
      <header>
        <Link to="/docks">Station Atlas</Link>
        <nav>
          <NavLink to="/docks">Quais</NavLink>
          <NavLink to="/requests">Demandes</NavLink>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
