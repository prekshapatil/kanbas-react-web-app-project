
const secButtons = [{name :"Import Existing Content", icon:"fa fa-upload"}, {name :"Import From Commons", icon:"fa fa-cloud-upload"}, {name :"Choose Home Page", icon:"fa fa-crosshairs"}, {name :"View Course Stream", icon:"fa fa-bar-chart"}, {name :"New Announcement", icon:"fa fa-bullhorn"}, {name :"New Analysis", icon:"fa fa-bar-chart"}, {name :"View Notification", icon:"fa fa-bell-o"}];
const lectureTimings = [{name :"Lecture 1", date:"CS4550.12631.202410 Sep 7 At 11:45am"}, {name :"Lecture 2", date:"CS4550.12631.202410 Sep 6 At 18:45pm"}, {name :"Lecture 3", date:"CS4550.12631.202410 Sep 9 At 12:45pm"}];
function CourseStatus() {  
return (
  <>
        <h2>Course Status</h2>
        <div className="d-grid gap-1 left-text col-12">
            <div className="row">
            <div className="col" style={{"paddingRight": "0"}}><button className="btn btn-light col-12" type="button"><i className="fa fa-times-circle-o" aria-hidden="true"></i>UnPublish</button></div>
            <div className="col" style={{"paddingRight": "0"}}><button className="btn btn-success col-12" type="button"><i className="fa fa-check-circle-o" aria-hidden="true"></i>Published</button></div>
            </div>
          </div>
          <br/>
          <div className="d-grid gap-1 left-text col-12">
          {secButtons.map(({name, icon} : {name:string, icon:string}) => (
        <button className="btn btn-light text-left" type="button"><i className={icon} aria-hidden="true"></i>{name}</button>
        ))}
          </div>
          <br/>
        <h5>To Do</h5><hr/>
        <ul className="list-group">
            <li className="d-flex col-12">
            <span className="badge bg-danger rounded-pill me-1" style={{"marginRight": "8px;"}}>1</span>
            <span style={{"textAlign": "left", "color": "red"}}>Grade A1 - ENV + HTML 
            </span>
            </li>
            <li className="d-flex col-12">
            <span style={{"color": "rgb(139, 138, 138)", "fontSize": "0.8em", "marginLeft": "30px"}}>100 points . Sep 18 at 11:59pm</span>
                </li>
          </ul>
          <br/>
        <div className="d-flex flex-row col-12">
            <h5 className="d-flex col-6">Comming Up</h5>
            <a className=" d-flex col-6" href="#" style={{"textAlign": "left", "color": "red"}}> <i className="fa fa-calendar mt-1 me-1" aria-hidden="true" ></i>View Calender</a>
        </div>
        <hr/>
        {lectureTimings.map(({name, date} : {name:string, date:string}) => (
        <ul className="list-group">
            <li className="d-flex col-12">
            <span style={{"textAlign": "left", "color": "red"}}><i className="fa fa-calendar me-1" aria-hidden="true"></i>{name}
            </span>
            </li>
        <li className="d-flex col-12">
        <span style={{"color": "rgb(139, 138, 138)", "fontSize": "0.8em", "marginLeft": "30px"}}>{date}</span>
            </li>
        </ul>
        ))}
  </>
  );
}

export default CourseStatus;