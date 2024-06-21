import React, { useEffect, useState } from 'react';
import isNil from 'lodash/isNil';
import { DataTable } from './DataTable';
import { useGetAllTripsQuery } from '../services/tripAPI';
import { Modal } from './Modal';

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
      <Modal showModal={showModal} setShowModal={setShowModal} id={tripId} />
      <DataTable headers={headers} data={data} trigger={handleClick} />
    </>
  );
};
