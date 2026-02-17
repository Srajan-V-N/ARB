import { NavLink, Outlet, useLocation } from "react-router";

const navItems = [
  { to: "/builder", label: "Builder" },
  { to: "/preview", label: "Preview" },
  { to: "/proof", label: "Proof" },
];

export default function AppLayout() {
  const { pathname } = useLocation();
  const showNav = pathname !== "/";

  return (
    <div className="min-h-screen bg-surface font-sans text-text-primary print:min-h-0">
      {showNav && (
        <nav className="flex h-14 items-center justify-between border-b border-border bg-white px-6">
          <NavLink to="/" className="font-serif text-lg font-bold text-text-primary">
            AI Resume Builder
          </NavLink>
          <div className="flex gap-6">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors ${isActive ? "text-accent" : "text-gray-500 hover:text-text-primary"}`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </nav>
      )}
      <Outlet />
    </div>
  );
}
