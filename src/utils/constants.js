export const controllers = [
  { label: "work timer", value: "pomodoroTime" },
  { label: "dance break", value: "shortBreakTime" },
  { label: "quiet break", value: "longBreakTime" },
];

export const stages = {
  pomodoroTime: 30 * 60,
  shortBreakTime: 5 * 60,
  longBreakTime: 5 * 60,
  isPaused: true,
  period: 1,
};
