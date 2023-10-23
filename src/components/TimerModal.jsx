import { useContext, useEffect, useRef } from "react";
import ModalInput from "./ModalInput";
import { FormDataContext } from "../context/FormDataContext";

const TimerModal = ({ setIsSettingsOn, setPomodoro }) => {
  const { formData, setFormData } = useContext(FormDataContext);
  const modalRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    setPomodoro((prevPomodoro) => ({
      ...prevPomodoro,
      workTime: formData.workTime * 60,
      danceTime: formData.danceTime * 60,
      quietTime: formData.quietTime * 60,
    }));
    setIsSettingsOn(false);
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  function handleCancel() {
    setIsSettingsOn(false);
  }

  useEffect(() => {
    function handleOutsideClick(e) {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setIsSettingsOn(false);
      }
    }
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [setIsSettingsOn]);

  return (
    <>
      <div
        className="block modal absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white w-[20rem] md:w-[28rem] rounded-2xl px-6 pt-6 pb-12"
        ref={modalRef}
      >
        <div>
          <h3 className="text-sm py-3">Time (minutes)</h3>

          <form className="inputs" onSubmit={handleSubmit}>
            <ModalInput
              label={"work timer"}
              name={"workTime"}
              defaultValue={formData.workTime}
              setFormData={setFormData}
              onChange={handleInputChange}
            />
            <ModalInput
              label={"dance break"}
              name={"danceTime"}
              defaultValue={formData.danceTime}
              setFormData={setFormData}
              onChange={handleInputChange}
            />
            <ModalInput
              label={"quiet break"}
              name={"quietTime"}
              defaultValue={formData.quietTime}
              setFormData={setFormData}
              onChange={handleInputChange}
            />
            <button type="submit" className="primary-button mb-3">
              Save
            </button>

            <button
              type="submit"
              className="secondary-button"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default TimerModal;
