import { useEffect, useState } from "react";

const Countdown = () => {
  const [count, setCount] = useState<number>(60);

  useEffect(() => {
    if (count <= 0) return;

    const timerId = setTimeout(() => {
      setCount(count - 1);
    }, 1000);

    return () => clearTimeout(timerId);
  }, [count]);

  return <div style={{ marginLeft: "45%", marginTop: "10px" }}>Time left: {count} seconds</div>;
};

export default Countdown;
