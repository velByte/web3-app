import React, { useContext } from "react";
import configData from "../../config.js";
import { shortenAddress } from "../utils/shortenAddress";
import useFetch from "../hooks/useFetch";

const TransactionCard = (parameter) => {
  const { keyword, message, timestamp, addressFrom, amount, addressTo } =
    parameter;
  const gifUrl = useFetch({ keyword });
  const etherscanLink = configData.etherscan.URL;
  const shortFromAddress = shortenAddress(addressFrom);
  const shortToAddress = shortenAddress(addressTo);
  return (
    <div
      className="bg-[#181918] m-4 flex flex-1
    2xl:min-w-[450px]
    2xl:max-w-[500px]
    sm:min-w-[270px]
    sm:max-w-[300px]
    flex-col 
    p-3
    rounded-lg
    hover:shadow-2xl
  "
    >
      <div className="flex flex-col items-center w-full mt-3">
        <div className="justify-start w-full mb-6 p-2">
          <a
            href={`${etherscanLink}${addressFrom}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <p className="text-white text-base">From: {shortFromAddress}</p>
          </a>
          <a
            href={`${etherscanLink}${addressTo}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <p className="text-white text-base">To: {shortToAddress}</p>
          </a>
          <p className="text-white text-base">Amount: {amount} ETH</p>
          {message && (
            <div>
              <br />
              <p className="text-white text-base">Message: {message}</p>
            </div>
          )}
        </div>
        <img
          src={gifUrl}
          alt="gif"
          className="w-full h-64 2x:h-96 rounded-md shadow-lg object-cover"
        />
        <div className="bg-black p-3 px-5 w-max rounded-3xl -mt-5 shadow-2xl">
          <p className="text-[#37c7da] font-bold">{timestamp}</p>
        </div>
      </div>
    </div>
  );
};

export default TransactionCard;
