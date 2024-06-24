import { useEffect, useState } from 'react';
import isNil from 'lodash/isNil';
import { DataTable } from './DataTable';
import { useGetAllTripsQuery, useGetTripByIdQuery } from '../services/tripAPI';
import { Modal } from './Modal';
import { StudentTable } from './StudentTable';
import { AddStudentForm } from './forms/AddStudentForm';
import { AddExpenseForm } from './forms/AddExpenseForm';

export const TripTable = () => {
  const [addStudent, setAddStudent] = useState(false);
  const [expenseStudent, setExpenseStudent] = useState<string | boolean>(false);
  const [showModal, setShowModal] = useState(false);
  const [tripId, setTripId] = useState<string | null>(null);
  const { data: allTrips } = useGetAllTripsQuery();
  const { data: selectedTrip } = useGetTripByIdQuery(tripId as string);

  const headers: string[] = [
    'Name',
    'Created On',
    'Trip Cost',
    'Number of Students',
  ];

  const handleModalClose = (showModal: boolean) => {
    setShowModal(showModal);
    setAddStudent(false);
    setExpenseStudent(false);
  };

  const handleClick = (id: string) => {
    setTripId(id);
    if (!isNil(id)) return setShowModal(true);
    setShowModal(false);
  };
  useEffect(() => {
    if (!showModal) {
      setTripId(null);
    }
  }, [showModal]);

  return (
    <>
      <DataTable
        headers={headers}
        data={
          allTrips?.map((x) => {
            return {
              ...x,
              tripCost: `$${x.tripCost}`,
            };
          }) as []
        }
        trigger={handleClick}
      />
      <Modal
        showModal={showModal}
        setShowModal={handleModalClose}
        id={tripId}
        modalTitle={selectedTrip?.name}
        secondaryHeaderText={
          <>
            <p>Trip Total</p>
            <p>{`$${selectedTrip?.tripCost}`}</p>
          </>
        }
      >
        {addStudent && (
          <AddStudentForm
            tripId={selectedTrip?.id}
            onSaveAction={() => setAddStudent(false)}
          />
        )}
        {expenseStudent && (
          <AddExpenseForm
            tripId={selectedTrip?.id}
            onSaveAction={() => setExpenseStudent(false)}
            student={expenseStudent}
          />
        )}
        {!addStudent && !expenseStudent && (
          <>
            <button className="btn" onClick={() => setAddStudent(true)}>
              Add Student
            </button>
            <StudentTable
              trip={selectedTrip}
              addExpenseToStudent={(id: string) => setExpenseStudent(id)}
            />
          </>
        )}
      </Modal>
    </>
  );
};
