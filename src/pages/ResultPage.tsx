import React, { useEffect, useState } from "react";
import styles from "./StylesForResultPage.module.css";

const Result = () => {
  const [currentCorrect, setCurrentCorrect] = useState<number>(0);
  const [totalAnswered, setTotalAnswered] = useState<number>(0);
  const [bestResult, setBestResult] = useState<number>(0);
  const [previousResult, setPreviousResult] = useState<number | null>(null);

  useEffect(() => {
    const savedCorrect = parseInt(localStorage.getItem("correctAnswer") || "0", 10);
    const savedTotal = parseInt(localStorage.getItem("totalAnswered") || "0", 10);
    const savedPreviousRaw = localStorage.getItem("previous");
    const savedPrevious = savedPreviousRaw !== null ? parseInt(savedPreviousRaw, 10) : null;
    let savedBest = parseInt(localStorage.getItem("best") || "0", 10);

    setCurrentCorrect(savedCorrect);
    setTotalAnswered(savedTotal);
    setPreviousResult(savedPrevious);

    if (savedCorrect > savedBest) {
      savedBest = savedCorrect;
      localStorage.setItem("best", String(savedBest));
    }
    setBestResult(savedBest);
  }, []);

  return (
    <div className={styles.resultCard}>
      <h2>Результат</h2>
      <div className={styles.resultItem}>
        <span>Примеров решено:</span>
        <span>{totalAnswered}</span>
      </div>
      <div className={styles.resultItem}>
        <span>Правильных ответов:</span>
        <span>{currentCorrect}</span>
      </div>
      <div className={styles.resultItem}>
        <span>Лучший результат:</span>
        <span>
          {bestResult}
          {previousResult !== null && bestResult - previousResult !== 0
            ? ` (${bestResult - previousResult > 0 ? "+" : ""}${bestResult - previousResult})`
            : ""}
        </span>
      </div>
      <div className={styles.resultItem}>
        <span>Предыдущий результат:</span>
        <span>
          {previousResult !== null
            ? `${previousResult} (${currentCorrect - previousResult >= 0 ? "+" : ""}${currentCorrect - previousResult})`
            : "—"}
        </span>
      </div>
      <button className={styles.resultButton} onClick={() => (window.location.href = "/")}>
        Понятно
      </button>
    </div>
  );
};

export default Result;
