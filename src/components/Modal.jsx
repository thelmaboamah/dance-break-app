// import XSolid from "../../public/icons/x-solid.svg";

export default function Modal() {
  return (
    // <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 h-screen ">
    <div className="   fixed right-0 top-0 h-screen w-1/4 z-50 bg-white">
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
              <button className="hover:underline focus:outline-none">
                Update Durations
              </button>
            </li>
            <li>
              <button className="hover:underline focus:outline-none">
                Disable Music
                {/* <label className="relative inline-flex items-center cursor-pointer">
  <input type="checkbox" value="" className="sr-only peer">
  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
  <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Toggle me</span>
  </input>
</label> */}
              </button>
            </li>
            <li>
              <button className="hover:underline focus:outline-none">
                Download the app
              </button>
            </li>
            <li><div className="border-t-grey border-t-1 width-2/4"></div></li>
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
