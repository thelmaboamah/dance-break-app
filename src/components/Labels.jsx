import { controllers } from "../utils/constants";

const Labels = ({
  selectedControl,
  setSelectedControl,
  resetTimerValues,
  setPomodoro,
}) => {
  function handleSelectedControl(index) {
    setSelectedControl(index);
    resetTimerValues();
    setPomodoro((prevPomodoro) => ({
      ...prevPomodoro,
      isPaused: true,
    }));
  }

  return (
    <div className="absolute left-0 bottom-0 z-50">
      <ul className="tw-infoContainer">
        {controllers.map((controller, index) => (
          <li
            key={index}
            className={`tw-infoItem ${selectedControl === index && "active"}`}
            onClick={() => handleSelectedControl(index)}
          >
            {controller.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Labels;
