import HomePage from "./Pages";
import {Routes, Route} from "react-router-dom";
import FoodDetail from "./Pages/detail";

function App() {
  return (
    <div className="container">
      <Routes>
        <Route path="/" element = {<HomePage/>}/>
        <Route path="detail/:id" element = {<FoodDetail/>}/>
      </Routes>
        
    </div>
  );
}

export default App;
