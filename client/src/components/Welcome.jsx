import React, { useContext } from "react";
import { useState } from "react";
import { AiFillPlayCircle } from "react-icons/ai";
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";
import { Loader } from "./";
import welcomeTexts from "../sprach_verwaltung/welcomeTexts.json";
import languages from "../sprach_verwaltung/supported";
import { TransactionContext } from "../context/TransactionContext";
import { ContextProvider } from "../context/ContextProvider";
import { shortenAddress } from "../utils/shortenAddress";

const commonStyles =
  "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white";

const Input = ({ placeholder, name, type, value, handleChange }) => (
  <input
    placeholder={placeholder}
    type={type}
    step="0.0001"
    value={value}
    onChange={(e) => handleChange(e, name)}
    className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
  />
);

const Welcome = () => {
  /* Destructuring the TransactionContext. */
  const {
    connectWallet,
    currentAccount,
    formData,
    handleChange,
    sendTransaction,
    isLoading,
  } = useContext(TransactionContext);

  /* Getting the user's language. */
  const userLanguage =
    window.navigator.userLanguage || window.navigator.language;

  /* Getting the supported languages from the languages.js file. */
  const supportedLanguages = languages();

  /* Setting the language to the user's language if it is supported, otherwise it is setting it to
 English. */
  const [language, setLanguage] = useState(
    supportedLanguages.includes(userLanguage) ? userLanguage : "en"
  );

  /**
   * If the addressTo, amount, keyword, or message fields are empty, then return an alert to the user.
   * @returns The formData object is being returned.
   */
  const handleSubmit = (e) => {
    const { addressTo, amount, keyword, message } = formData;
    e.preventDefault();
    if (!addressTo || !amount || !keyword || !message) {
      return alert("Please fill in all fields");
    }
    sendTransaction();
  };

  const shortanAddress = shortenAddress(currentAccount);

  return (
    // This is centering the entire content in the middle of the screen
    <div className="flex w-full justify-center items-center">
      <div className="flex mf:flex-row flex-col items-start justify-between md:p-20 py-12 px-4 ">
        <div className="flex flex-1 justify-start flex-col mf:mr-10 ">
          <h1 className="text-3xl sm:text-5xl text-white text-gradient py-1">
            {welcomeTexts.main_title[language]}
          </h1>
          <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base">
            {welcomeTexts.main_subtitle[language]}
          </p>
          {!currentAccount ? (
            <button
              type="button"
              onClick={connectWallet}
              className="flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]"
            >
              <p className="text-white text-base font-semibold">
                {welcomeTexts.connect_wallet[language]}
              </p>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => console.log("TODO: handle submit")}
              className="flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]"
            >
              <p className="text-white text-base font-semibold">
                {welcomeTexts.wallet_connected[language]}
              </p>
            </button>
          )}
          <div className="grid sm:grid-cols-3 grid-cols-2 w-full mt-10">
            {
              //TODO: it breaks the layout by sm:grid-cols-3
            }
            <div className={`rounded-tl-2xl ${commonStyles}`}>
              {welcomeTexts.first_feature[language]}
            </div>
            <div className={`${commonStyles}`}>
              {welcomeTexts.second_feature[language]}
            </div>
            <div className={`rounded-tr-2xl ${commonStyles}`}>
              {welcomeTexts.third_feature[language]}
            </div>
            <div className={`rounded-bl-2xl ${commonStyles}`}>
              {welcomeTexts.fourth_feature[language]}
            </div>
            <div className={`${commonStyles}`}>
              {welcomeTexts.fifth_feature[language]}
            </div>
            <div className={`rounded-br-2xl ${commonStyles}`}>
              {welcomeTexts.sixth_feature[language]}
            </div>
          </div>
        </div>
        <div className=" flex flex-col  flex-1 items-center justify-start w-full mf:mt-0 mt-10 ">
          <div
            id="CreditCard"
            className="p-3 justify-end items-start flex-col rounded-xl h-40 sm:w-72 w-full my-5 eth-card white-glassmorphism "
          >
            <div className="flex justify-between flex-col w-full h-full">
              <div className="flex justify-between items-start ">
                <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">
                  <SiEthereum fontSize={21} color="#fff" />
                </div>
                <BsInfoCircle fontSize={17} color="#fff" />
              </div>
              <div className="">
                <p className="text-white font-light text-sm">
                  {currentAccount ? shortanAddress : "Address"}
                </p>
                <p className="text-white font-semibold text-lg mt-1">
                  Ethereum
                </p>
              </div>
            </div>
          </div>
          <div className=" p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
            <Input
              placeholder={welcomeTexts.inputs_placeholder.addressTo[language]}
              name="addressTo"
              type="text"
              handleChange={handleChange}
            />
            {
              //TODO: Add pattern for amount
              //TODO: Add max button
              //TODO: Add Valid Adress check
            }
            <Input
              placeholder={welcomeTexts.inputs_placeholder.amount[language]}
              name="amount"
              pattern="^[0-9]{1,2}([,.][0-9]{1,2})?$"
              type="number"
              handleChange={handleChange}
            />
            <Input
              placeholder={welcomeTexts.inputs_placeholder.keyword[language]}
              name="keyword"
              type="text"
              handleChange={handleChange}
            />
            <Input
              placeholder={
                welcomeTexts.inputs_placeholder.enterMessage[language]
              }
              name="message"
              type="text"
              handleChange={handleChange}
            />
            <div className="h-[1px] w-full bg-gray-400 my-2" />
            {
              //TODO: add loader
              isLoading ? (
                <Loader />
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] rounded-full cursore-pointer"
                >
                  {welcomeTexts.send_button[language]}
                </button>
              )
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
