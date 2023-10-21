import Chevron from "../../public/icons/chevron-right-solid.svg";

export default function Modal() {
  return (
    // <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 h-screen ">
    <div className="bg-white fixed right-0 top-0 h-screen desktop:w-1/4 w-[238px]">
      <div className="bg-white rounded-lg shadow-lg w-96 h-screen">
        <div className="p-6">
          {/* closign icon */}
          {/* <div className="flex justify-end mr-8">
            <img src={XSolid} alt="X-Solid" className="w-5 h-5 "/>
          </div> */}
          <div className="bg-gray-100 rounded-t-lg px-6 py-4"></div>

          {/* 5 rows */}
          <ul className="space-y-5">
            <li>
              <button className="w-3/4 flex justify-between items-center hover:underline focus:outline-none">
                <div>Update Durations</div>
                <img className="w-3 h-3" src={Chevron} alt="chevron pointing right"></img>
              </button>
              
            </li>
            <li>
              <button className="hover:underline focus:outline-none">
                Disable Music
              </button>
            </li>
            <li>
              <button className="hover:underline focus:outline-none">
                Download the app
              </button>
            </li>
            <li><div className="bg-grey border-t-1 desktop:w-3/4 w-[189px] h-[1px]"></div></li>
            <li>
              <button className="hover:underline focus:outline-none">
                Log out
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
