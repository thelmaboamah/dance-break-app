import styles from "../styles/Center.module.css";
export default function CenterTimer() {
  return (
    <div className={styles.centerTimer}>
      <div className="centered-text py-0 text-h1-bold">Time to Work</div>

      {/* placeholder for timer animation*/}
      <div className="bg-white rounded-full my-32 border-4 border-gray-400">
        <span className="text-4xl font-medium my-32">30:00</span>
      </div>

      <button className="primary-button my-32">Start Timer</button>
    </div>
  );
}
