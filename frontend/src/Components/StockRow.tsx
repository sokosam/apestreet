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
    <tbody className={`px-10 w-full flex justify-start ${style.rowItem}`}>
      <td className="w-24 self-center">
        <a className="w-20 h-20" href="/">
          <div className="w-20 h-20">
            <img
              className={`self-center  rounded-2xl object-cover h-20 w-20`}
              src={logo}
              alt=""
            />
          </div>
        </a>
      </td>
      <td className="w-1/4 pr-6 overflow-x-hidden self-center text-left">
        {name}
      </td>
      <td className="w-1/6 px-6  self-center">{ticker}</td>
      <td className="w-1/6 text-left overflow-x-hidden truncate px-6 self-center">
        {mentions}
      </td>
      <td className="w-1/6 px-6 self-center">{comments}</td>
      <td className="w-fit px-6 self-center">{upvotes}</td>

      {/* <td className="flex space-x-10 ">

        <p className="self-center">{name}</p>
      </div> */}
      {/* <div className="flex space-x-5">
        <p className="self-center">{ticker}</p>
        <p className="self-center">{mentions}</p>
        <p className="self-center">{comments}</p>
        <p className="self-center">{upvotes}</p>
      </div> */}
    </tbody>
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
