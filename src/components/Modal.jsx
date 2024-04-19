import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import useAppContext from "../hooks/useAppContext";
import RemoteURLForm1 from "../modules/JSONViewer/RemoteURLForm";
import RemoteURLForm2 from "../modules/JSONDiff/RemoteURLForm";
import DiffConfigModal from "../modules/JSONDiff/DiffConfigModal";
import JSONModifyForm from "./JSONModifyForm";

export default function Modal() {
  const { modal, hideModal } = useAppContext();

  const handleModalClose = () => {
    hideModal();
  };

  return (
    <Transition.Root show={modal !== null} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={handleModalClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0">
          <div className="fixed inset-0 bg-gray-700 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white dark:bg-gray-800 dark:text-gray-300 px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 w-full max-w-sm sm:max-w-md md:max-w-lg sm:p-6">
                <div>
                  {modal === "remote" && <RemoteURLForm1 />}
                  {(modal === "remote1" || modal === "remote2") && (
                    <RemoteURLForm2 />
                  )}
                  {modal === "diff-config" && <DiffConfigModal />}
                  {modal === "jsonmodify" && <JSONModifyForm />}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
