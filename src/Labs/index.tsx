import {Link, Route, Routes} from "react-router-dom";
import Assignment3 from "./a3";
import Nav from "../Nav";
import Assignment4 from "./a4";
import store from "./store";
import { Provider } from "react-redux";
import Assignment5 from "./a5";
function Labs() {
 return(
  <Provider store={store}>
    <div>
      <Nav/>
      <h1>Labs</h1>
      <Link to="/Labs/a3">Assignment3</Link> <br/>
      <Link to="/Labs/a4">Assignment4</Link> <br/>
      <Link to="/Labs/a5">Assignment5</Link>
      <Routes>
        <Route path="a3/*" element={<Assignment3/>} />
        <Route path="a4/*" element={<Assignment4/>}/>
        <Route path="a5/*" element={<Assignment5/>}/>
      </Routes>
    </div>
  </Provider>
 );
}


export default Labs;