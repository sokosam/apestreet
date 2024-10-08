import React from "react";
import style from "../styles/StockList.module.css";

interface StockListProps {
  title?: string;
  width?: string | number;
  children: React.ReactNode;
  outerStyle?: string;
}

const StockList = ({ title, children, outerStyle }: StockListProps) => {
  return (
    <>
      {title ? <h1 className="self-center">{title}</h1> : null}
      <div
        id={style.wrapper}
        className={`m-auto  border-2 border-opacity-5 min-w-fit md:w-full lg:w-[95%]  shadow-2xl   rounded-[25px] ${outerStyle}  `}
      >
        <table
          className={` px-5 w-full text-xs sm:text-md   overflow-hidden  border-separate  ${style.bg}`}
        >
          <thead className={`h-10 sm:h-16  ${style.tableHead}`}>
            <tr className={`${style.tableRow}`}>
              <th className={` ${style.tableItem}`} scope="col">
                Company
              </th>
              <th className={`  ${style.tableItem}`} scope="col">
                Ticker
              </th>
              <th className={` ${style.tableItem}`} scope="col">
                Mentions
              </th>
              <th className={`   ${style.tableItem}`} scope="col">
                Comments
              </th>
              <th className={`   ${style.tableItem}`} scope="col">
                Upvotes
              </th>
            </tr>
          </thead>
          <tbody>
            {children &&
              React.Children.map(children, (child) => (
                <tr
                  key={(+new Date() * Math.random())
                    .toString(36)
                    .substring(0, 6)}
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

// const StockList = ({ title, width, children }: StockListProps) => {
//   return (
//     <>
//       {title ? <h1 className="self-center">{title}</h1> : null}
//       <div
//         className={` border-2 shadow-2xl w-${
//           width
//             ? typeof width === "number"
//               ? `[${width}%]`
//               : `[${width}]`
//             : "[600px]"
//         } rounded-[25px] `}
//       >
//         <table
//           className={`  mx-auto w-[90%] overflow-hidden border-separate ${style.bg}`}
//         >
//           <thead className={`h-16 ${style.tableHead}`}>
//             <tr className={`${style.tableRow}`}>
//               <th className={`px-5  ${style.tableItem}`} scope="col">
//                 Company
//               </th>
//               <th className={`${style.tableItem}`} scope="col">
//                 Ticker
//               </th>
//               <th className={`${style.tableItem}`} scope="col">
//                 Mentions
//               </th>
//               <th className={`${style.tableItem}`} scope="col">
//                 Comments
//               </th>
//               <th className={`${style.tableItem}`} scope="col">
//                 Upvotes
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {children &&
//               React.Children.map(children, (child) => (
//                 <tr
//                   className={`hover:backdrop-brightness-95 border-opacity-5 ${style.tableChildren}`}
//                 >
//                   {child}
//                 </tr>
//               ))}
//           </tbody>
//         </table>
//       </div>
//     </>
//   );
// };

export default StockList;
