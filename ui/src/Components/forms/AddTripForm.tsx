import { useState, useRef } from 'react';
import { useAddTripMutation } from '../../services/tripAPI';
import { get, isNil } from 'lodash';
import { useNavigate } from 'react-router-dom';

export const AddTripForm = () => {
  const navigate = useNavigate();
  const [hasError, setHasError] = useState(false);
  const [addTrip] = useAddTripMutation();
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: FormDataEvent) => {
    e.preventDefault && e.preventDefault();
    const nameValue = get(e, 'target[0].value', null);
    if (isNil(nameValue)) return;
    try {
      await addTrip(nameValue).unwrap();
      setHasError(false);
      formRef.current?.reset();
      return navigate('/');
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
            placeholder="Name"
            name="tripName"
          />
        </label>
        <input type="submit" value="Save" className="btn mt-3" />
      </form>
    </div>
  );
};
