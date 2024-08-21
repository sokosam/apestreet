import React from "react";
import style from "../styles/StockRow.module.css";

interface StockRowProps {
  name: string;
  ticker: string;
  mentions: number;
  comments: number;
  logo?: string;
  upvotes: number;
  onInteraction: () => void;
}

const StockRow = ({
  name,
  ticker,
  mentions,
  logo,
  comments,
  upvotes,
}: StockRowProps) => {
  return (
    <div className={`px-10 w-full flex justify-between ${style.rowItem}`}>
      <div className="flex space-x-10 ">
        <img
          className={`self-center rounded-2xl object-cover h-20 w-20`}
          src={logo}
          alt=""
        />
        <p className="self-center">{name}</p>
      </div>
      <div className="flex space-x-5">
        <p className="self-center">{ticker}</p>
        <p className="self-center">{mentions}</p>
        <p className="self-center">{comments}</p>
        <p className="self-center">{upvotes}</p>
      </div>
    </div>
  );
};

export default StockRow;
