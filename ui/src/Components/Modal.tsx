import { useEffect, useRef } from 'react';

export const Modal = ({
  showModal,
  setShowModal,
  modalTitle,
  secondaryHeaderText,
  children,
}: any) => {
  // using a ref gives us access to the actual form element to call the close() function on dialogues
  const modalRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (showModal) return modalRef.current?.showModal();
    return modalRef.current?.close();
  }, [showModal]);

  return (
    <dialog ref={modalRef} id="trip_modal" className="modal">
      <div className="modal-box max-w-3xl">
        <div className="flex flex-row justify-between">
          <h3 className="font-bold text-lg mb-3">{modalTitle}</h3>
          <span>{secondaryHeaderText}</span>
        </div>
        <div className="w-full min-w-min">{children}</div>
        <div className="modal-action">
          <form method="dialog">
            <button className="btn" onClick={() => setShowModal(false)}>
              Close
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
};
