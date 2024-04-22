import ModuleList from "../Modules/List";
import CourseStatus from "./status";


function Home() {
  return (
    <div className="d-flex me-5">
    <div className="flex-fill wd-left-margin-10">
        <ModuleList />
    </div>  
    <div className="flex-grow-0 me-2 d-none d-lg-block" style={{ flexGrow: 1 , "marginLeft":"30px"}} >
    <CourseStatus />
    </div>
    </div>
  );
}
export default Home;