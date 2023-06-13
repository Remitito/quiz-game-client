import { useState } from "react";
import { SlPresent } from "react-icons/sl";
import './bonusStylesheets/MysteryBox.css';

export const MysteryBox = ({ finishTurn }) => {
  const [pointsVisible, setPointsVisible] = useState(false);
  const [currentPoints, setCurrentPoints] = useState(null);
  const [totalPoints, setTotalPoints] = useState(0);
  const [boxClickable, setBoxClickable] = useState(true);
  const [finished, setFinished] = useState(false);
  const possibleOutcomes = [0, 0, 10, 20, 20, 30, 30, 40, 50, 100];

const openBox = () => {
    if (!boxClickable) {
      return;
    }
    setBoxClickable(false);
    const points = possibleOutcomes[Math.floor(Math.random() * 10) + 1];
    if (points > 0) {
      setTotalPoints((prevTotalPoints) => prevTotalPoints + points);
      setCurrentPoints(points)
      setPointsVisible(true);
      setTimeout(() => {
        setPointsVisible(false);
        setBoxClickable(true);
      }, 2000);
    } else {
        setPointsVisible(true);
        setCurrentPoints(-totalPoints);
        setTotalPoints(0);
        setFinished(true)
    }
  };

  const fadePointsClassName = `fadePoints ${pointsVisible ? 'visible' : ''}`;

  return (
    <div className="bonusSubCont">
      <label className="bonusTitle">Mystery Box</label>
      {!finished ?
        <label className="statusMessage">Touch to get points!</label>
      :
        <label className="statusMessage">The box has been locked!</label>
      }
      <label className="pointsTotal">Points gained: {totalPoints}</label>
      <div className="fadePointsCont">
        {currentPoints > 0 ? (
          <label style={{color: 'green'}} className={fadePointsClassName}>+{currentPoints}</label>
        ) : (
          <label style={{color: 'red'}} className={fadePointsClassName}>{currentPoints}</label>
        )}
      </div>
      <div>
        <SlPresent
          disabled={!boxClickable}
          onClick={openBox}
          className={boxClickable ? "boxIconClickable" : "boxIconUnclickable"}
        />
      </div>
      <button className="okayButton" onClick={() => finishTurn()}>
        Finish
      </button>
    </div>
  );
};
