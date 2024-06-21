import React from 'react';
import { DataTable } from './DataTable';
import { useGetAllTripsQuery } from '../services/tripAPI';
import { Modal } from './Modal';

export const TripTable = () => {
  const { data } = useGetAllTripsQuery();
  const headers: string[] = [
    'Name',
    'Created On',
    'Trip Cost',
    'Number of Students',
  ];
  // const sampleData = [
  //   {
  //     id: '7820618a-7600-4ac8-a71b-13311cc84cb4',
  //     name: '"a new trip"',
  //     createdOn: '2024-06-19T03:51:21.512523Z',
  //     tripCost: '$100',
  //     students: 3,
  //   },
  // ];

  return <>
  <Modal></Modal>
  <DataTable headers={headers} data={data} onclick={} />;
  </>
};
