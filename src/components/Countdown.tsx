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

  return <div style={{ marginLeft: "45%", marginTop: "10px" }}>Осталось: {count} секунд</div>;
};

export default Countdown;
