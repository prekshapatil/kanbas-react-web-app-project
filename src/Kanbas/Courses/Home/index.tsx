import ModuleList from "../Modules/List";
import Status from "./Status";

function Home() {
  return (
    <div>
      
      <div className="d-flex justify-content-between">
        <ModuleList />
        <Status />
      </div>
    </div>
  );
}
export default Home;
