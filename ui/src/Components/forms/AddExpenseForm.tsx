import React, { useState, useRef } from 'react';
import {
  useAddExpenseMutation,
  useLazyGetTripByIdQuery,
} from '../../services/tripAPI';
import { get, isNil } from 'lodash';
import { useNavigate } from 'react-router-dom';

export const AddExpenseForm = ({ tripId, student, onSaveAction }: any) => {
  const [hasError, setHasError] = useState(false);
  const [addExpense] = useAddExpenseMutation();
  const [getTripById] = useLazyGetTripByIdQuery();
  // use a form ref to reset the form manually on form submission
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: FormDataEvent) => {
    // prevent adding query to url
    e.preventDefault && e.preventDefault();
    const nameValue = get(e, 'target[0].value', null);
    const amountValue = get(e, 'target[1].value', null);
    if (isNil(tripId) || isNil(nameValue) || isNil(amountValue)) {
      setHasError(true);
      return;
    }

    try {
      await addExpense({
        tripId,
        studentId: student.id,
        name: nameValue,
        amount: amountValue,
      }).unwrap();
      setHasError(false);
      formRef.current?.reset();
      // calls the endpoint again to refresh the student list
      await getTripById(tripId);
      return onSaveAction();
    } catch (error) {
      setHasError(true);
      console.error('rejected', error);
    }
  };

  return (
    <div className="flex flex-col">
      <h2 className="my-3">{student.name}</h2>
      <form onSubmit={handleSubmit as any} ref={formRef}>
        <label className="input input-bordered flex items-center gap-2">
          <input
            type="text"
            className={`grow ${hasError && 'input-error'}`}
            placeholder="Expense Name"
            name="expenseName"
          />
          <input
            type="text"
            className={`grow ${hasError && 'input-error'}`}
            placeholder="Expense Amount"
            name="amount"
          />
        </label>
        <input type="submit" value="Save" className="btn mt-3" />
      </form>
    </div>
  );
};
