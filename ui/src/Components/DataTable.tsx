import React from 'react';
import { TripResponse } from '../types/types';

interface dataTableProps {
  headers: string[];
  data: TripResponse | undefined;
  onClick: Function;
}

export const DataTable = ({ headers, data, onClick }: dataTableProps) => {
  const rowRenderer = () =>
    data?.map((x: any) => {
      return (
        <tr key={x.id} onClick={() => onClick(x.id)}>
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
              return <th key={x}>{x}</th>;
            })}
          </tr>
        </thead>
        <tbody>{rowRenderer()}</tbody>
      </table>
    </div>
  );
};
