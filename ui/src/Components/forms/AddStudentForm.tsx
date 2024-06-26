import { useState, useRef } from 'react';
import { useAddStudentMutation } from '../../services/tripAPI';
import { get, isNil } from 'lodash';

export const AddStudentForm = ({ tripId, onSaveAction }: any) => {
  const [hasError, setHasError] = useState(false);
  const [addStudent] = useAddStudentMutation();
  // use a form ref to reset the form manually on form submission
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: FormDataEvent) => {
    // prevent adding query to url
    e.preventDefault && e.preventDefault();
    const nameValue = get(e, 'target[0].value', null);
    if (isNil(tripId) || isNil(nameValue)) {
      setHasError(true);
      return;
    }

    try {
      await addStudent(`studentName=${nameValue}&tripId=${tripId}`).unwrap();
      setHasError(false);
      formRef.current?.reset();
      return onSaveAction();
    } catch (error) {
      setHasError(true);
      console.error('rejected', error);
    }
  };

  return (
    <div className="flex">
      <form onSubmit={handleSubmit as any} ref={formRef}>
        <label className="input input-bordered flex items-center gap-2">
          <input
            type="text"
            className={`grow ${hasError && 'input-error'}`}
            placeholder="Student Name"
            name="studentName"
          />
        </label>
        <input type="submit" value="Save" className="btn mt-3" />
      </form>
    </div>
  );
};
