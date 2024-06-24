import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <>
      <h1 className="text-5xl w-full">Trip Calculator</h1>
      <div className="space-between space-x-4">
        <Link to="/">
          <button className="btn px-7 btn-primary">All Trips</button>
        </Link>
        <Link to="add-trip">
          <button className="btn px-7 btn-primary">Add Trip</button>
        </Link>
      </div>
    </>
  );
};
