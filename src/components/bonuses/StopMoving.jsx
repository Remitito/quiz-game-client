import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState, useRef } from "react";
import { setTeamScore } from "../../slices/gameSlice"
import { GiIgloo, GiPresent } from "react-icons/gi";
import './bonusStylesheets/StopMoving.css'
import wrongSound from '../../assets/audios/wrong.mp3'
import correctSound from '../../assets/audios/correct.mp3'

export const StopMoving = ({finishTurn}) => {
    const [boxContents, setBoxContents] = useState([-50, 0, 50]);
    const [points, setPoints] = useState(0);
    const [pointsMessage, setPointsMessage] = useState("");
    const [boxOneClass, setBoxOneClass] = useState("pointsBoxFlash");
    const [boxTwoClass, setBoxTwoClass] = useState("pointsBox");
    const [boxThreeClass, setBoxThreeClass] = useState("pointsBox");
    const [currentPoints, setCurrentPoints] = useState()
    const [stop, setStop] = useState(false);
    const timeoutsRef = useRef([]);
  
    useEffect(() => {
      const audioWrong = new Audio(wrongSound);
      audioWrong.preload = 'auto';
      const audioCorrect = new Audio(correctSound)
      audioCorrect.preload = 'auto'

      return () => {
        audioWrong.pause()
        audioWrong.src = ''
        audioCorrect.pause()
        audioCorrect.src = ''
      }
    }, []);

    const playSound = (sound) => {
      if(sound === 'wrong') {
        const audioWrong = new Audio(wrongSound)
        audioWrong.play();
      }
      else {
        const audioCorrect = new Audio(correctSound)
        audioCorrect.play();
      }
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
        if(currentPoints === 0) {
          setBoxOneClass("pointsBoxRed")
          playSound('wrong')
        }
        if(currentPoints === 1) {setBoxTwoClass("pointsBoxBlue")}
        if(currentPoints === 2) {
          setBoxThreeClass("pointsBoxGreen")
          playSound('correct')
        }
        timeoutsRef.current.forEach((timeoutId) => clearTimeout(timeoutId));
        timeoutsRef.current = [];
        setTimeout(() => {
            finishTurn()
          }, 1500)
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
            <audio />
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