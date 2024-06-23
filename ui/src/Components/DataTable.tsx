import React from 'react';

interface dataTableProps {
  headers: string[];
  data: [];
  trigger: Function;
}

export const DataTable = ({ headers, data, trigger }: dataTableProps) => {
  const rowRenderer = () =>
    data?.map((x: any) => {
      return (
        <tr
          key={x.id}
          onClick={() => trigger(x.id)}
          className="hover cursor-pointer"
        >
          {Object.keys(x).map((y: string) => {
            if (y === 'id') return null;
            return <td key={y}>{x[y]}</td>;
          })}
        </tr>
      );
    });
  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          {
            <tr key="header">
              {headers.map((x) => {
                return <th key={x}>{x}</th>;
              })}
            </tr>
          }
        </thead>
        <tbody>{rowRenderer()}</tbody>
      </table>
    </div>
  );
};
