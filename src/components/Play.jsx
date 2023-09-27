import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { setQuestions } from "../slices/setupSlice";
import axios from "axios";

// Gets quiz from backend, sets the questions via Redux and then navigates to setup screen

export const Play = () => {
  const { id } = useParams();
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    axios.get("https://inquizitive-api.onrender.com/quiz/user", {
      params: {
        id: id
      },
    })
    .then(response => {
      dispatch(setQuestions(response.data.questions));
      navigate("/setup");
    })
    .catch(error => {
      console.log(error);
    });
  }, [dispatch, navigate, id]);

    return (
        <div>
        </div>
    )
}