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
    <>
      <td
        className={`px-2 w-1/3 border-b-2 min-w-24  hover:underline hover:cursor-pointer self-center ${style.tableRow}`}
      >
        <a className="min-w-20 min-h-20 flex  flex-row" href="/">
          <div className="w-20 h-20 flex">
            <img
              className={`h-2/3 w-2/3 self-center rounded-2xl object-cover`}
              src={logo}
              alt=""
            />
          </div>
          <div className="min-w-10 w-3/4 max-w-60 self-center">
            <div className="align-[inherit] w-full overflow-hidden">{name}</div>
          </div>
        </a>
      </td>
      {/* <td className="w-1/4 pr-6 overflow-x-hidden self-center text-left">
        {name}
      </td> */}
      <td
        className={`w-1/12 min-w-6 border-b-2 px-6 text-center self-center ${style.tableRow}`}
      >
        {ticker}
      </td>
      <td
        className={`w-1/12 min-w-6 border-b-2 text-center overflow-x-hidden truncate px-6 self-center ${style.tableRow}`}
      >
        {mentions}
      </td>
      <td
        className={`w-1/12 min-w-6 text-center px-6 self-center ${style.tableRow}`}
      >
        {comments}
      </td>
      <td
        className={`w-1/12 pr-5 min-w-6 text-center px-6 self-center ${style.tableRow}`}
      >
        {upvotes}
      </td>
    </>
  );
};

export default StockRow;

{
  /* <div className="flex space-x-10 ">
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
</div> */
}
