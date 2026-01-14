import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './StylesForMain.module.css';

const Main = () => {
  const navigate = useNavigate();

  const [best, setBest] = useState<number>(0);
  const [currentCorrect, setCurrentCorrect] = useState<number>(0);

  useEffect(() =>{
    const savedBestStr = localStorage.getItem("best") || "0";
    const savedCorrectStr = localStorage.getItem("correctAnswer") || "0";

    const savedBest = parseInt(savedBestStr, 10);
    const savedCorrect = parseInt(savedCorrectStr, 10);

    setBest(savedBest);
    setCurrentCorrect(savedCorrect);
  }, [])

  return (
    <>
      <div className={styles.statsContainer}>
        <div>Best result: { best }</div>
        <div>Last result: { currentCorrect }</div>
      </div>

      <div className={styles.mainContainer}>
        <div className={styles.title}>Speed Math</div>
        <div className={styles.description}>You will be given 60 seconds, solve as many examples as you can</div>
        <button className={styles.gameStart} onClick={() => navigate('/game')}>Start</button>
      </div>
    </>
  );
}

export default Main;