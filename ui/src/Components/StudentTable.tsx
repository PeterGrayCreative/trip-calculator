import React, { useState } from 'react';
import sum from 'lodash/sum';
import isNil from 'lodash/isNil';
import { DataTable } from './DataTable';
import { useGetTripByIdQuery } from '../services/tripAPI';
import { Trip } from '../types/types';

export const StudentTable = ({ trip, addExpenseToStudent }: any) => {
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

        const totalOwed = sum(
          studentsOwedAShare.map((x: any) => x.expenseTotal - share)
        );
        const allEqual = studentsOwedAShare.every(
          (x: any) => studentsOwedAShare[0].expenseTotal === x.expenseTotal
        );
        const equalSplit = shareOwed / studentsOwedAShare.length;

        return allEqual
          ? studentsOwedAShare.map((x: any) => (
              <li key={x.id}>{`${x.name} - $${equalSplit.toFixed(2)}`}</li>
            ))
          : studentsOwedAShare.map((x: any) => {
              const percentageOwed = (x.expenseTotal - share) / totalOwed;
              const owedToStudent = shareOwed * percentageOwed;
              return (
                <li key={x.id}>{`${x.name} - $${owedToStudent.toFixed(2)}`}</li>
              );
            });
      };
      return {
        name: student.name,
        expenses: `$${student.expenseTotal}`,
        shareOwed: `$${shareOwed.toFixed(2)}`,
        owedTo: <ul>{getStudentOwedTo()}</ul>,
        addExpense: (
          <button
            className="btn"
            onClick={() => addExpenseToStudent(student.id)}
          >
            Add Expense
          </button>
        ),
      };
    });
  };

  const handleClick = (id: string) => {};

  return (
    <>
      {trip?.studentCount > 0 ? (
        <DataTable
          headers={headers}
          data={processStudentsWithExpenses(selectedTrip) as []}
          trigger={handleClick}
        />
      ) : (
        <div className="text-center py-15">
          'Add a student to start calculating this trip.'
        </div>
      )}
    </>
  );
};
