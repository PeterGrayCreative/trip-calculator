import React from 'react';
import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <>
      <h1 className="text-5xl w-full">Trip Calculator</h1>
      <div className="space-between space-x-4">
        <Link to="/">
          <button className="btn">All Trips</button>
        </Link>
        <Link to="students">
          <button className="btn">Students</button>
        </Link>
        <Link to="add-student">
          <button className="btn">Add a Student</button>
        </Link>
      </div>
    </>
  );
};
