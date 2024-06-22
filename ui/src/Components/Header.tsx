import React from 'react';
import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <>
      <h1 className="text-5xl w-full">Trip Calculator</h1>
      <div className="space-between space-x-4">
        <Link to="/">
          <button className="btn btn-primary">All Trips</button>
        </Link>
        <Link to="students">
          <button className="btn btn-primary">Students</button>
        </Link>
        <Link to="add-trip">
          <button className="btn btn-primary">Add Trip</button>
        </Link>
      </div>
    </>
  );
};
