import React, { useState } from 'react';
import sum from 'lodash/sum';
import isNil from 'lodash/isNil';
import { DataTable } from './DataTable';
import { useGetTripByIdQuery } from '../services/tripAPI';
import { Trip } from '../types/types';

export const StudentTable = ({ trip }: any) => {
  const [showModal, setShowModal] = useState(false);
  const { data: selectedTrip } = useGetTripByIdQuery(trip?.id as string);
  const headers: string[] = ['Name', 'Total Spent', 'Share Owed', 'Owed To'];

  const processStudentsWithExpenses = (trip: Trip | null | undefined) => {
    if (isNil(trip)) return;
    const share = trip?.tripCost / trip?.studentCount;
    const studentsOwedAShare: any = trip?.students?.filter((student: any) => {
      return student.expenseTotal > share;
    });

    return trip?.students?.map((student: any) => {
      const shareOwed =
        student.expenseTotal > share ? 0 : share - student.expenseTotal;
      const getStudentOwedTo = () => {
        if (student.expenseTotal > share) return '';
        if (studentsOwedAShare.length === 1) {
          return (
            <li>
              `${studentsOwedAShare[0].name} - $${shareOwed}`
            </li>
          );
        }

        const allEqual = studentsOwedAShare.every(
          (x: any) => studentsOwedAShare[0].amount === x.amount
        );
        const equalSplit = shareOwed / studentsOwedAShare.length;

        return allEqual
          ? studentsOwedAShare.map((x: any) => (
              <li>{`${x.name} - $${equalSplit.toFixed(2)}`}</li>
            ))
          : studentsOwedAShare.map((x: any) => {
              return <li>{`${x.name} - $${shareOwed.toFixed(2)}`}</li>;
            });
      };
      return {
        name: student.name,
        expenses: `$${student.expenseTotal}`,
        shareOwed: `$${shareOwed.toFixed(2)}`,
        owedTo: <ul>{getStudentOwedTo()}</ul>,
      };
    });
  };

  const handleClick = (id: string) => {};

  return (
    <>
      <DataTable
        headers={headers}
        data={processStudentsWithExpenses(selectedTrip) as []}
        trigger={handleClick}
      />
    </>
  );
};
