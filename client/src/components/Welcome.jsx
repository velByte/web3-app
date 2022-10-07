import { useState } from "react";
import { AiFillPlayCircle } from "react-icons/ai";
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";
import { Loader } from "./";
import welcomeTexts from "../sprach_verwaltung/welcomeTexts.json";
import languages from "../sprach_verwaltung/supported";
const Welcome = () => {
  const userLanguage =
    window.navigator.userLanguage || window.navigator.language;
  const supportedLanguages = languages();
  const [language, setLanguage] = useState(
    supportedLanguages.includes(userLanguage) ? userLanguage : "en"
  );
  return (
    // This is centering the entire content in the middle of the screen
    <div className="flex w-full justify-center items-center">
      <div className="flex md:flex-row flex-col items-start justify-between md:p-20 py-12 px-4">
        <div className="flex flex-1 justify-start flex-col md:mr-10">
          <h1 className="text-3xl sm:text-5xl text-white text-gradient py-1">
            {welcomeTexts.main_title[language]}
          </h1>
          <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base">
            {welcomeTexts.main_subtitle[language]}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
