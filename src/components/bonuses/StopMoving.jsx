import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState, useRef } from "react";
import { setTeamScore } from "../../slices/gameSlice"
import { GiPresent } from "react-icons/gi";
import './bonusStylesheets/StopMoving.css'

export const StopMoving = ({finishTurn}) => {
    const [boxContents, setBoxContents] = useState([-50, 0, 50]);
    const [points, setPoints] = useState(0);
    const [pointsMessage, setPointsMessage] = useState("");
    const [boxOneClass, setBoxOneClass] = useState("pointsBoxFlash");
    const [boxTwoClass, setBoxTwoClass] = useState("pointsBox");
    const [boxThreeClass, setBoxThreeClass] = useState("pointsBox");
    const [currentPoints, setCurrentPoints] = useState()
    const [stop, setStop] = useState(false);
    const soundRef = useRef(null);
    const timeoutsRef = useRef([]);
  
    const playSound = (sound) => {
      const audio = soundRef.current;
      audio.src = sound;
      audio.play();
    };
  
    const playBoxAnimationThree = () => {
      if (!stop) {
        setCurrentPoints(2)
        timeoutsRef.current.push(
            setTimeout(() => {
            setBoxOneClass("pointsBoxFlash");
            setBoxThreeClass("pointsBox");
            playBoxAnimationOne();
          }, 100)
        );
      }
    };
  
    const playBoxAnimationTwo = () => {
      if (!stop) {
        setCurrentPoints(1)
        timeoutsRef.current.push(
          setTimeout(() => {
            setBoxThreeClass("pointsBoxFlash");
            setBoxTwoClass("pointsBox");
            playBoxAnimationThree();
          }, 100)
        );
      }
    };
  
    const playBoxAnimationOne = () => {
      if (!stop) {
        setCurrentPoints(0)
        timeoutsRef.current.push(
          setTimeout(() => {
            setBoxTwoClass("pointsBoxFlash");
            setBoxOneClass("pointsBox");
            playBoxAnimationTwo();
          }, 100)
        );
      }
    };
  
    const handleStop = () => {
        setStop(true);
        setBoxOneClass("pointsBox");
        setBoxTwoClass("pointsBox");
        setBoxThreeClass("pointsBox");
        if(currentPoints === 0) {setBoxOneClass("pointsBoxRed")}
        if(currentPoints === 1) {setBoxTwoClass("pointsBoxBlue")}
        if(currentPoints === 2) {setBoxThreeClass("pointsBoxGreen")}
        timeoutsRef.current.forEach((timeoutId) => clearTimeout(timeoutId));
        timeoutsRef.current = [];
        setTimeout(() => {
            finishTurn()
          }, 2500)
    };
  
    useEffect(() => {
      const shuffledArray = [...boxContents];
      for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
      }
      setBoxContents(shuffledArray);
      setCurrentPoints(1)
      timeoutsRef.current.push(
        setTimeout(() => {
          setBoxTwoClass("pointsBoxFlash");
          setBoxOneClass("pointsBox");
          playBoxAnimationTwo();
        }, 100)
      );
  
      return () => {
        timeoutsRef.current.forEach((timeoutId) => clearTimeout(timeoutId));
      };
    }, []);
  
    const handleClick = (index) => {
      setPoints(boxContents[index]);
      setTimeout(() => {
        finishTurn();
      }, 1000);
    };
  

    return (
        <div className="bonusSubCont">
            <audio ref={soundRef} />
                    <div>
                        <label className='bonusTitle'>Press Stop At the Right Time</label>
                        <div className="boxCont">
                            <label onClick={() => handleClick(0)} className={boxOneClass}>-50</label>
                            <label onClick={() => handleClick(1)} className={boxTwoClass}>0</label>
                            <label onClick={() => handleClick(2)} className={boxThreeClass}>+50</label>
                        </div>
                    </div>
                    <button onClick={() => handleStop()} className="stopButton">STOP</button>
        </div>
    )
}