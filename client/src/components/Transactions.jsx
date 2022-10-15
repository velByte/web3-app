import React, { useContext } from "react";
import { TransactionContext } from "../context/TransactionContext";
import { shortenAddress } from "../utils/shortenAddress";
import { TransactionCard } from "./";
import { v4 as uuidv4 } from "uuid";

import dummyData from "../utils/dummyData";

const Transactions = () => {
  const { currentAccount, transactions } = useContext(TransactionContext);

  return (
    <div className="flex w-full justify-center items-center 2xl:px-20 gradient-bg-transactions ">
      <div className="flex flex-col md:p-12 py-12 px-4">
        {currentAccount ? (
          <h3 className="text-white text-3xl text-center my-2">
            Latest Transactions
          </h3>
        ) : (
          <h3 className="text-white text-3xl text-center my-2">
            Connect your account to see the latest transactions
          </h3>
        )}
        <div className="flex flex-wrap justify-center items-center mt-10">
          {transactions.reverse().map((transaction) => (
            <TransactionCard key={uuidv4()} {...transaction} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Transactions;
