import { useState } from "react";
import BarsSolid from "../assets/bars-solid.svg";
import XSolid from "../assets/x-solid.svg";
import DanceBreakLogo from "../assets/dance_break_logo.svg";
import Modal from "../components/Modal";
import { useLinkClickHandler } from "react-router-dom";

export default function Header({setPomodoro}) {
  const [isModalOpen, setModalOpen] = useState(false);
  const handleLogoClick = useLinkClickHandler("/home");

  const icon = isModalOpen ? XSolid : BarsSolid;

  return (
    //the whole header
    <div className="flex justify-between items-center w-full px-8 py-4 z-10 bg-transparent">
      {/* logo and name */}
      <div className="flex flex-row w-full gap-8 items-center">
        <div className="w-10 h-10 cursor-pointer" onClick={handleLogoClick}>
          <img src={DanceBreakLogo} alt="Dance Break Logo" />
        </div>
        <h2 className="hidden desktop:block">Dance Break</h2>
      </div>

      <div>
        <img
          src={icon}
          className="w-5 h-5 z-50 absolute top-24 right-24"
          alt="BarsSolidorXSolid"
          onClick={() => setModalOpen(!isModalOpen)}
        />
        {isModalOpen && <Modal setPomodoro={setPomodoro}/>}
      </div>
    </div>
  );
}
