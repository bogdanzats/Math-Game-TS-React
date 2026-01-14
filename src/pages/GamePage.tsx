import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Countdown from '../components/Countdown';
import styles from './StylesForGame.module.css'

function TimerBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const totalTime = 60 * 1000;
    const intervalTime = 100; 
    const steps = totalTime / intervalTime;

    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      const newProgress = 100 - (currentStep / steps) * 100;
      setProgress(newProgress > 0 ? newProgress : 0);

      if (currentStep >= steps) {
        clearInterval(interval);
      }
    }, intervalTime);

    return () => clearInterval(interval);
  }, []);

  const hue = (progress / 100) * 120;
  const barColor = `hsl(${hue}, 100%, 70%)`;

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
    <div
      style={{
        width: '95%',
        height: 10,
        backgroundColor: '#eee',
        borderRadius: 10,
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          width: `${progress}%`,
          height: '100%',
          backgroundColor: barColor,
          borderRadius: 10,
          transition: 'width 0.1s linear',
        }}
      />
    </div>
  </div>
  );
}

export default function Game() {
  const navigate = useNavigate();

  useEffect(() => {
    const savedCorrect = localStorage.getItem("correctAnswer") || "0";
    localStorage.setItem("previous", savedCorrect);
  }, []);

  const [random1, setRandom1] = useState<number>(Math.floor(Math.random() * 101));
  const [random2, setRandom2] = useState<number>(Math.floor(Math.random() * 101));
  const [sign, setSign] = useState<string>(Math.random() < 0.5 ? "+" : "-");

  const [inputValue, setInputValue] = useState("");
  const [count, setCount] = useState(0);
  const [totalAnswered, setTotalAnswered] = useState(0);

  const operations: { [key: string]: (a: number, b: number) => number } = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
  };

  const correctAnswer = operations[sign](random1, random2);

  const nextExample = () => {
    setRandom1(Math.floor(Math.random() * 101));
    setRandom2(Math.floor(Math.random() * 101));
    setSign(Math.random() < 0.5 ? "+" : "-");
    setInputValue("");
  };

  const handleCheck = () => {
    const userAnswer = parseInt(inputValue, 10);

    const newTotal = totalAnswered + 1;
    setTotalAnswered(newTotal);
    localStorage.setItem("totalAnswered", String(newTotal));

    if (userAnswer === correctAnswer) {
      const newCount = count + 1;
      setCount(newCount);
      localStorage.setItem("correctAnswer", String(newCount));
    }

    nextExample();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCheck();
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/result");
    }, 60000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className={styles.container}>
      <div className={styles.countdown}>
        <TimerBar />
        <Countdown />
      </div>

      <div className={styles.mainContainer}>
        <h1 className={styles.title}>Solve the example</h1>
        <h2>
          {random1} {sign} {random2} = ?
        </h2>
        <div className={styles.inputField}>
          <input
            type="number"
            value={inputValue}
            placeholder='Enter the answer'
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            style={{ marginRight: "10px" }}
            autoFocus
          />
          <button onClick={handleCheck}>ОК</button>
        </div>
      </div>
    </div>
  );
}


