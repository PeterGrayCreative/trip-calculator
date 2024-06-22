import React, { useEffect, useRef } from 'react';
// Borrowed from https://www.creative-tim.com/learning-lab/tailwind-starter-kit/documentation/react/modals/regular

export const Modal = ({
  showModal,
  setShowModal,
  id,
  modalTitle,
  children,
}: any) => {
  const modalRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (showModal) return modalRef.current?.showModal();
    return modalRef.current?.close();
  }, [showModal]);

  return (
    <>
      <dialog ref={modalRef} id="trip_modal" className="modal">
        <div className="modal-box max-w-3xl">
          <h3 className="font-bold text-lg">{modalTitle}</h3>
          <div className="w-full min-w-min">{children}</div>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn" onClick={() => setShowModal(false)}>
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};
