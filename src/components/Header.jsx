import BarsSolid from "../../public/icons/bars-solid.svg";
import XSolid from "../../public/icons/x-solid.svg";
import DanceBreakLogo from "../../public/icons/Dance_Break_Logo.svg";
import { useState } from "react";
import Modal from "../components/Modal";

export default function Header() {
  const [isModalOpen, setModalOpen] = useState(false);

  const icon = isModalOpen ? XSolid : BarsSolid;

  // const toggleModal = () => {
  //     setModalOpen((isModalOpen) => !isModalOpen);
  //     // {isModalOpen && <Modal/>}

  // }
  console.log(isModalOpen);

  return (
    //the whole header
    <div className="flex justify-between items-center w-full px-8 py-4 z-10 bg-white">
      {/* logo and name */}
      <div className="flex flex-row w-full gap-8 items-center">
        <div className="w-10 h-10">
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
        {isModalOpen && <Modal />}
      </div>
    </div>
  );
}
