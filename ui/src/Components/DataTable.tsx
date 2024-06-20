import React from 'react';

export const DataTable = (headers: string[]) => {
  return (
    <div className="overflow-x-auto">
      <table className="table table-xs">
        <thead>
          <tr>
            {headers.map((x) => {
              return <th>{x}</th>;
            })}
          </tr>
        </thead>
      </table>
    </div>
  );
};
