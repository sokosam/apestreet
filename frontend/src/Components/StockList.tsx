import React from "react";
import style from "../styles/StockList.module.css";

interface StockListProps {
  title?: string;
  children: React.ReactNode;
}

const StockList = ({ title, children }: StockListProps) => {
  return (
    <>
      {title ? <h1 className="self-center">{title}</h1> : null}
      <div className="border border-opacity-5  w-fit rounded-[25px] border-seperate overflow-x-auto ">
        <table
          className={`  mx-5 w-90 overflow-hidden border-separate  ${style.bg}`}
        >
          <thead className={`h-16 ${style.tableHead}`}>
            <tr className={`${style.tableRow}`}>
              <th className={`px-5  ${style.tableItem}`} scope="col">
                Company
              </th>
              <th className={`${style.tableItem}`} scope="col">
                Ticker
              </th>
              <th className={`${style.tableItem}`} scope="col">
                Mentions
              </th>
              <th className={`${style.tableItem}`} scope="col">
                Comments
              </th>
              <th className={`${style.tableItem}`} scope="col">
                Upvotes
              </th>
            </tr>
          </thead>
          <tbody>
            {children &&
              React.Children.map(children, (child) => (
                <tr
                  className={`hover:backdrop-brightness-95 border-opacity-5 ${style.tableChildren}`}
                >
                  {child}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default StockList;
