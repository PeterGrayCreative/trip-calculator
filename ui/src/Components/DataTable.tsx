import React from 'react';

interface dataTableProps {
  headers: string[];
  data: object[];
}

export const DataTable = ({ headers, data }: dataTableProps) => {
  const rowRenderer = () =>
    data.map((x: any) => {
      return (
        <tr key={x.id}>
          {Object.keys(x).map((y: string) => {
            if (y === 'id') return null;
            return <td>{x[y]}</td>;
          })}
        </tr>
      );
    });

  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            {headers.map((x) => {
              return <th>{x}</th>;
            })}
          </tr>
        </thead>
        <tbody>{rowRenderer()}</tbody>
      </table>
    </div>
  );
};
