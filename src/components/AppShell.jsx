import React from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import Logo from "../assets/json-logo.png";
import useAppContext from "../AppContext";
import { classNames } from "../Util";
import Modal from "./Modal";

const Header = () => {
  const links = [
    {
      id: 1,
      label: "Viewer",
      to: "viewer-editor",
    },
    {
      id: 2,
      label: "XML to JSON",
      to: "xml-json",
    },
  ];
  return (
    <header className="px-2 md:px-4 bg-slate-600 text-white">
      <div className="flex items-center">
        <Link to={"/"} className="flex items-center gap-2">
          <img src={Logo} alt="logo" className="h-8 object-contain invert" />
          <span className="font-bold hidden sm:block">JSON Utilities</span>
        </Link>
        <div className="ml-10 flex items-center">
          {links.map((link) => (
            <NavLink
              key={link.id}
              to={link.to}
              className={({ isActive }) =>
                classNames(
                  "py-3.5 px-4 sm:px-8 text-sm border-b-[3px] border-transparent",
                  isActive ? "border-yellow-500" : "hover:bg-white/5"
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      </div>
    </header>
  );
};

export default function AppShell() {
  const { modal } = useAppContext();

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Header />
      <Outlet />
      {modal && <Modal />}
    </div>
  );
}
