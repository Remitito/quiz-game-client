import { useState, useRef } from "react";
import { SlPresent } from "react-icons/sl";
import { useDispatch, useSelector } from "react-redux";
import { setTeamScore } from "../../slices/gameSlice";
import "./bonusStylesheets/MysteryBox.css";

export const MysteryBox = ({ correctSound, currentTeam, finishTurn, wrongSound }) => {
  const dispatch = useDispatch();
  const teamScore = useSelector((state) => state.game.teamScores[currentTeam]);
  const [pointsVisible, setPointsVisible] = useState(false);
  const [currentPoints, setCurrentPoints] = useState(null);
  const [totalPoints, setTotalPoints] = useState(0);
  const [finished, setFinished] = useState(false);
  const [possibleOutcomes, setPossibleOutcomes] = useState([10, 20, 30, 40, 0, 50, 0, 100])
  const soundRef = useRef(null);

  const playSound = (sound) => {
    const audio = soundRef.current;
    audio.src = sound;
    audio.play();
  };

  const openBox = () => {
    const choice = Math.floor(Math.random() * possibleOutcomes.length)
    const points = possibleOutcomes[choice - 1]
    const remainingOutcomes = possibleOutcomes
    remainingOutcomes.splice(choice - 1, 1)
    setPossibleOutcomes(remainingOutcomes)

    setPossibleOutcomes(remainingOutcomes) 
    if (points > 0) {
      playSound(correctSound);
      setTotalPoints((prevTotalPoints) => prevTotalPoints + points);
      setCurrentPoints(points);
      setPointsVisible(true);
      setTimeout(() => {
        setPointsVisible(false);
      }, 2000);
    } else {
      playSound(wrongSound);
      setPointsVisible(true);
      setCurrentPoints(-totalPoints);
      setTotalPoints(0);
      setFinished(true);
    }
  };

  const finishOpening = () => {
    dispatch(setTeamScore({ team: currentTeam - 1, amount: teamScore + totalPoints }));
    finishTurn();
  };

  return (
    <div className="bonusSubCont">
      <label className="bonusTitle">Mystery Box</label>
      <audio ref={soundRef} />
      {!finished ? (
        <label className="statusMessage">Touch to get points! But don't be greedy!</label>
      ) : (
        <label style={{ color: "red" }} className="statusMessage">
          The box has been locked!
        </label>
      )}
      <label className="pointsTotal">Points gained: {totalPoints}</label>
      <div className="boxPointsCont">
        {!pointsVisible ? (
          <div className={'iconCont'}>
            <SlPresent
              onClick={openBox}
              className="boxIcon"
            />
          </div>
        ) : (
          <div className="fadePoints">
            {currentPoints > 0 ? (
              <div style={{ backgroundColor: "green" }} className="fadePoints">
                +{currentPoints}
              </div>
            ) : (
              <div style={{ backgroundColor: "red" }} className="fadePoints">
                {currentPoints}
              </div>
            )}
          </div>
        )}
      </div>
      <button className="okayButton" onClick={finishOpening}>
        Finish
      </button>
    </div>
  );
};