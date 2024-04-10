import React from "react";
import { Outlet } from "react-router-dom";
import useAppContext from "../hooks/useAppContext";
import AppHeader from "./AppHeader";
import Modal from "./Modal";

export default function AppShell() {
  const { modal } = useAppContext();

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <AppHeader />
      <Outlet />
      {modal && <Modal />}
    </div>
  );
}
