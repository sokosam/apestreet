import React from "react";
import style from "../styles/StockList.module.css";

interface StockListProps {
  title: string;
  children: React.ReactNode;
}

const StockList = ({ title, children }: StockListProps) => {
  return (
    <>
      <table
        className={` mx-auto h-full w-full rounded-xl flex flex-col border-4 border-slate-300 shadow-md ${style.bg}`}
      >
        <thead>
          <h1 className="py-3 self-center">{title}</h1>
          <tr>
            <th scope="col">Company</th>
            <th scope="col">Ticker</th>
            <th scope="col">Mentions</th>
          </tr>
          <tbody></tbody>
        </thead>

        <ul>
          {children &&
            React.Children.map(children, (child) => <li>{child}</li>)}
        </ul>
      </table>
    </>
  );
};

export default StockList;
