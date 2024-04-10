import React from "react";
import { classNames } from "../utils/helper";
import { Link, NavLink } from "react-router-dom";
import { AppModules } from "../utils/config";
import Logo from "../assets/json-logo.png";

export default function AppHeader() {
  const links = AppModules.filter((module) => !module.disabled);
  return (
    <header className="px-2 md:px-4 bg-slate-600 text-white">
      <div className="flex items-center">
        <Link to={"/"} className="flex items-center gap-2">
          <img src={Logo} alt="logo" className="h-8 object-contain invert" />
          <span className="font-bold hidden sm:block">JSON Utilities</span>
        </Link>
        <div className="ml-10 flex items-center">
          {links.map((link, i) => (
            <NavLink
              key={i}
              to={link.url}
              className={({ isActive }) =>
                classNames(
                  "py-3.5 px-4 sm:px-8 text-sm border-b-[3px] border-transparent",
                  isActive ? "border-yellow-500" : "hover:bg-white/5",
                  link.disabled ? "pointer-events-none opacity-20" : ""
                )
              }>
              {link.label}
            </NavLink>
          ))}
        </div>
        <div className="ml-auto">
          <a
            href="https://manojbarman.in"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[14px] px-1 sm:px-2 opacity-60 hover:opacity-90 flex gap-1 items-center border-b-[3px] border-transparent">
            <span className="hidden md:inline">About</span>
            Developer
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4 ml-1">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
              />
            </svg>
          </a>
        </div>
      </div>
    </header>
  );
}
