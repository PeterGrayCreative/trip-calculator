import React, { useEffect, useState } from 'react';
import isNil from 'lodash/isNil';
import sum from 'lodash/sum';
import { DataTable } from './DataTable';
import { useGetAllTripsQuery, useGetTripByIdQuery } from '../services/tripAPI';
import { Modal } from './Modal';
import { StudentTable } from './StudentTable';
import { BasicTripResponse, Trip } from '../types/types';

export const TripTable = () => {
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
        setShowModal={setShowModal}
        id={tripId}
        modalTitle={selectedTrip?.name}
        secondaryHeaderText={
          <>
            <p>Trip Total</p>
            <p>{`$${selectedTrip?.tripCost}`}</p>
          </>
        }
      >
        <StudentTable trip={selectedTrip} />
      </Modal>
    </>
  );
};
