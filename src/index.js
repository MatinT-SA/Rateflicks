import React, { useState } from "react";
import ReactDOM from "react-dom/client";
// import StarRating from "./StarRating";
import App from "./components/App-v1";
import "./index.css";
// import App from "./App";

// function Test() {
//   const [movieRating, setMovieRating] = useState(0);

//   return (
//     <div>
//       <StarRating
//         color="red"
//         maxRating={10}
//         onSetRating={setMovieRating}
//         defaultRating={4}
//       />
//       <p>this movie has the {movieRating} rating</p>
//     </div>
//   );
// }

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
    {/* <StarRating maxRating={5} defaultRating={3} />
    <StarRating
      maxRating={5}
      color="blue"
      size="30"
      className="test"
      messages={["Terrible", "Bad", "Okay", "Good", "Nice"]}
      defaultRating={3}
    />
    <Test /> */}
  </React.StrictMode>
);
