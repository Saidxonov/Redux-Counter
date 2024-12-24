import "./Home.css";
import {
  increment,
  decrement,
  fiveIncrement,
  fiveDecrement,
} from "../store/counterSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function App() {
  const counter = useSelector((state) => state.counter);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleNav(e) {
    e.preventDefault();
    const isQuit = confirm("Are you sure, you want to quit?");
    if (isQuit) {
      navigate("/login");
      localStorage.clear();
    }
  }

  function handleInc() {
    dispatch(increment(1));
  }

  function handleDec() {
    dispatch(decrement(1));
  }

  function hanldeFiveInc() {
    dispatch(fiveIncrement());
  }

  function handleFiveDec() {
    dispatch(fiveDecrement());
  }

  return (
    <div className="container">
      <div
        onClick={handleNav}
        className="flex gap-3 cursor-pointer hover:underline"
      >
        Quit
      </div>
      <h1 className="counter">{counter}</h1>
      <div className="buttons">
        <button onClick={handleInc} className="incerement">
          INCREMENT
        </button>
        <button className="decrement" onClick={handleDec}>
          DECREMENT
        </button>
        <button
          className="inc rounded-[10px] text-white bg-green-500"
          onClick={hanldeFiveInc}
        >
          INCREMENT FIVE TIMES
        </button>
        <button
          className="inc rounded-[10px] text-white bg-red-500"
          onClick={handleFiveDec}
        >
          DECREMENT FIVE TIMES
        </button>
      </div>
    </div>
  );
}

export default App;
