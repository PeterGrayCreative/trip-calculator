import React, { useEffect, useState } from 'react';
import isNil from 'lodash/isNil';
import sum from 'lodash/sum';
import { DataTable } from './DataTable';
import { useGetAllTripsQuery } from '../services/tripAPI';
import { Modal } from './Modal';
import { TripResponse } from '../types/types';

export const TripTable = () => {
  const [showModal, setShowModal] = useState(false);
  const [tripId, setTripId] = useState<string | null>(null);
  const { data } = useGetAllTripsQuery();
  const headers: string[] = [
    'Name',
    'Created On',
    'Trip Cost',
    'Number of Students',
  ];

  const renderStudentsWithExpenses = (data: TripResponse) => {
    const currentTrip = data?.find((x) => x.id === tripId);
    console.log(currentTrip);
    return currentTrip?.students.map((x: any) => {
      return {
        name: x.name,
        createdOn: x.createdOn,
        expenses: sum(x.expenses),
        shareOwed: currentTrip.tripCost / currentTrip.studentCount,
      };
    });
  };
  console.log(renderStudentsWithExpenses(data as []));
  const handleClick = (id: string) => {
    setTripId(id);
    if (!isNil(id)) return setShowModal(true);
    setShowModal(false);
  };
  useEffect(() => {
    if (!showModal) setTripId(null);
  }, [showModal]);

  return (
    <>
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        id={tripId}
        modalTitle={data?.find((x) => x.id === tripId)?.name}
      >
        <DataTable
          headers={['Name', 'Created On', 'Expenses', 'Share Owed']}
          data={renderStudentsWithExpenses(data as []) as []}
          trigger={handleClick}
        />
      </Modal>
      <DataTable headers={headers} data={data as []} trigger={handleClick} />
    </>
  );
};
