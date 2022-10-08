import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { contractABI, contractAddress } from "../utils/constants";

export const TransactionContext = React.createContext();

const { ethereum } = window;

const getEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );

  return transactionContract;
};

export const TransactionProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [formData, setFormData] = useState({
    addressTo: "",
    amount: "",
    keyword: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [transactionCount, setTransactionCount] = useState(
    localStorage.getItem("transactionCount")
  );

  const handleChange = (e, name) => {
    setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
  };

  const checkIfWalletIsConnected = async () => {
    try {
      if (!ethereum) {
        return alert("Please install MetaMask");
      }
      const accounts = await ethereum.request({ method: "eth_accounts" });
      if (accounts.length !== 0) {
        setCurrentAccount(accounts[0]);
        // getAllTransactions();
      } else {
        console.log("No authorized account found");
      }
      console.log("Connected accounts:", accounts);
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum wallet found");
    }
  };

  const connectWallet = async () => {
    try {
      if (!ethereum) {
        return alert("Please install MetaMask");
      }
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum wallet found");
    }
  };

  /**
   * The function sends a transaction to the blockchain using the ethereum.request() method.
   * @returns The transaction hash
   */
  const sendTransaction = async (amount, to) => {
    try {
      if (!ethereum) {
        return alert("Please install MetaMask");

        //TODO: Get the data from the form
      }
      const { addressTo, amount, keyword, message } = formData;
      const transactionContract = getEthereumContract();
      const parstAmount = ethers.utils.parseEther(amount);

      await ethereum.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: currentAccount,
            to: addressTo,
            gas: "0x5208", // 21000 GWEI
            value: parstAmount._hex,
          },
        ],
      });
      const transactionHash = await transactionContract.addToBlockchain(
        addressTo,
        parstAmount,
        message,
        keyword
      );
      setIsLoading(true);
      console.log(`Loading: ${transactionHash.hash}`);
      await transactionHash.wait();
      setIsLoading(false);
      console.log(`Success: ${transactionHash.hash}`);

      const transactionCount = await transactionContract.getTransactionCount();
      setTransactionCount(transactionCount.toNumber());
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum wallet found");
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <TransactionContext.Provider
      value={{
        connectWallet,
        currentAccount,
        formData,
        handleChange,
        sendTransaction,
        isLoading,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
