import React, { useState, useEffect } from "react";
import { Howl } from "howler";
import clockMp3 from "../public/media/alarmClock.mp3";

const clockLoap = new Howl({
  src: [clockMp3],
  loop: true,
  volume: 1,
});
function App() {
  const [isRun, setIsrun] = useState(false);
  const [timeMin, setTimeMin] = useState(25);
  const [timeSec, setTimeSec] = useState(0);

  useEffect(() => {
    if (isRun) {
      const intervalPom = setInterval(() => {
        if (timeSec > 0) {
          setTimeSec((timeSec) => timeSec - 1);
        }
        if (timeSec === 0) {
          setTimeMin((timeMin) => timeMin - 1);
          setTimeSec(59);
        }
        if (timeMin === 0 && timeSec === 0) {
          setIsrun(false);
          clearInterval(intervalPom);
          clockLoap.play();
        }
      }, 1000);
      return () => {
        clearInterval(intervalPom);
      };
    }
  }, [isRun, timeMin, timeSec]);
  function handleClick() {
    setIsrun(true);
  }
  function handlePausa(){
    setIsrun(false)
    clockLoap.stop();
  }

  return (
    <div className="flex container">
      <div className="bg-[#C15C5C] flex-col text-xl justify-between p-[20px] text-white flex h-[200px] mx-auto mt-[50px] w-[400px] rounded-md ">
        <div className="flex justify-between">
          <h1 className="cursor-pointer ">Pomodoro</h1>
          <h1 className="cursor-pointer">Short Break</h1>
          <h1 className="cursor-pointer">Long Break</h1>
        </div>
        <div>
          <h1 className="text-3xl text-center">
            {timeMin} : {timeSec < 10 ? "0" + timeSec : timeSec}
          </h1>
        </div>
        <div className="flex gap-1">
        <button
          onClick={handleClick}
          className="btn bg-white w-[150px] mx-auto text-[#C15C5C] mt-[20px] p-[15px] rounded-2xl"
        >
          Start
        </button>
        <button onClick={handlePausa} className="btn bg-white w-[150px] mt-[20px] mx-auto text-[#C15C5C] p-[15px] rounded-2xl">Pausa</button>
        </div>
      </div>
    </div>
  );
}

export default App;
