import React, { useEffect, useState } from 'react';
import isNil from 'lodash/isNil';
import sum from 'lodash/sum';
import { DataTable } from './DataTable';
import { useGetAllTripsQuery, useGetTripByIdQuery } from '../services/tripAPI';
import { Modal } from './Modal';
import { StudentTable } from './StudentTable';
import { BasicTripResponse, Trip } from '../types/types';
import { idText } from 'typescript';

export const TripTable = () => {
  const [addStudent, setAddStudent] = useState(false);
  const [addExpense, setAddExpense] = useState<string | boolean>(false);
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
    setAddExpense(false);
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
        {addStudent && <>Add studentForm</>}
        {addExpense && <>Add expenseForm</>}
        {!addStudent && !addExpense && (
          <>
            <button className="btn" onClick={() => setAddStudent(true)}>
              Add Student
            </button>
            <StudentTable
              trip={selectedTrip}
              addExpenseToStudent={(id: string) => setAddExpense(id)}
            />
          </>
        )}
      </Modal>
    </>
  );
};
