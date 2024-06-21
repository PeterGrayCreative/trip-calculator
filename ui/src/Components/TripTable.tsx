import React, { useState } from 'react';
import { DataTable } from './DataTable';
import { useGetAllTripsQuery } from '../services/tripAPI';
import { Modal } from './Modal';

export const TripTable = () => {
  const [showModal, setShowModal] = useState(false);
  const [tripId, setTripid] = useState<string | null>(null);
  const { data } = useGetAllTripsQuery();
  const headers: string[] = [
    'Name',
    'Created On',
    'Trip Cost',
    'Number of Students',
  ];

  return (
    <>
      <Modal
        showModal={showModal !== false}
        setShowModal={setShowModal}
        id={tripId}
      />
      <DataTable headers={headers} data={data} trigger={setTripid} />
    </>
  );
};
