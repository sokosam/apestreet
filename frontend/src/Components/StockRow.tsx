import style from "../styles/StockRow.module.css";
import { useState } from "react";

interface StockRowProps {
  name: string;
  ticker: string;
  mentions: number;
  comments: number;
  logo?: string;
  upvotes: number;
  fire?: boolean;
  onInteraction: () => void;
}

const StockRow = ({
  name,
  fire,
  ticker,
  mentions,
  logo,
  comments,
  upvotes,
}: StockRowProps) => {
  const [imgSrc, setImgSrc] = useState(logo ? logo : "None");
  const handleError = () => {
    setImgSrc("../src/assets/defaultImg.jpg");
  };
  return (
    <>
      <td
        className={`border-b-2 hover:underline hover:cursor-pointer self-center ${style.tableRow}`}
      >
        <a className="min-w-fit w-fit flex  flex-row" href="/">
          <div className="w-20 h-20 mx-1 flex">
            <img
              className={`  min-w-[50px] min-h-[50px] size-2/3 self-center rounded-2xl object-cover`}
              src={imgSrc}
              alt=""
              onError={handleError}
            />
          </div>
          <div className="  py-5    self-center ">
            <div
              className={`align-[inherit] max-w-[200px] mr-2 overflow-hidden overflow-ellipsis whitespace-nowrap`}
            >
              {name}
            </div>
          </div>
        </a>
      </td>
      {/* <td className="w-1/4 pr-6 overflow-x-hidden self-center text-left">
        {name}
      </td> */}
      <td className={` border-b-2  text-center  ${style.tableRow}`}>
        <div className={` ${fire ? style.onFire : ""} `}>{ticker}</div>
      </td>
      <td
        className={` border-b-2 text-center overflow-x-hidden truncate self-center ${style.tableRow}`}
      >
        {mentions}
      </td>
      <td className={` text-center truncate self-center ${style.tableRow}`}>
        {comments}
      </td>
      <td className={`  text-center truncate self-center ${style.tableRow}`}>
        {upvotes}
      </td>
    </>
  );
};

export default StockRow;

// const StockRow = ({
//   name,
//   ticker,
//   mentions,
//   logo,
//   comments,
//   upvotes,
// }: StockRowProps) => {
//   return (
//     <>
//       <td
//         className={`px-5 w-1/3 border-b-2 min-w-24 max-w-[33.33333%] hover:underline hover:cursor-pointer self-center ${style.tableRow}`}
//       >
//         <a className="min-w-20 min-h-20 flex  flex-row" href="/">
//           <div className="w-20 h-20 flex">
//             <img
//               className={`  min-w-[50px] min-h-[50px] size-2/3 self-center rounded-2xl object-cover`}
//               src={logo}
//               alt=""
//             />
//           </div>
//           <div className="min-w-10 w-3/4 h-full  self-center ">
//             <div
//               className={`align-[inherit] max-w-[50px]  xl:max-w-[100%] sm:max-w-[150px] overflow-hidden overflow-ellipsis whitespace-nowrap w-full`}
//             >
//               {name}
//             </div>
//           </div>
//         </a>
//       </td>
//       {/* <td className="w-1/4 pr-6 overflow-x-hidden self-center text-left">
//         {name}
//       </td> */}
//       <td
//         className={`w-1/6 min-w-6 border-b-2 px-6 text-center self-center ${style.tableRow}`}
//       >
//         {ticker}
//       </td>
//       <td
//         className={`w-1/6   min-w-6 border-b-2 text-center overflow-x-hidden truncate px-6 self-center ${style.tableRow}`}
//       >
//         {mentions}
//       </td>
//       <td
//         className={`w-1/6 min-w-6 text-center px-6 self-center ${style.tableRow}`}
//       >
//         {comments}
//       </td>
//       <td
//         className={`w-1/6 pr-5 min-w-6 text-center px-6 self-center ${style.tableRow}`}
//       >
//         {upvotes}
//       </td>
//     </>
//   );
// };

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
