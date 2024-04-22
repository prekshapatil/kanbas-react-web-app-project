import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { calendarContent } from "../../../Database";
import { FaCalendarCheck } from "react-icons/fa";
import "./index.css"
function Calendar() {
  const { courseId } = useParams();
  const content = calendarContent.filter((cc) => 
    courseId === cc.courseId
  );
  return (
    <div style={{"width":"250px"}} >
      <div className="d-flex wd-come justify-content-between">
        <h6>
          Coming up
        </h6>

        <div style={{"marginRight":"7px"}}>
        
        <Link
          to={"#"}
          className="fa-regular fa-calendar-check calender-color"
          style={{ color: "red" }}
        >
            <FaCalendarCheck/>
          View Calender
        </Link>

        </div>
        
      </div>
      <hr/>

      <ul className="list-group wd-coming-up">
        {content.map((c)=>(
            <li>
                <Link to={"#"}>

                <span className="wd-c-up-c-red"
                      >
                        <FaCalendarCheck className="me-1" />
                      {c.title}</span
                    >
                    <br />{c.description} 
                    
                    {c.dateTime}
                </Link>
            </li>
        ))}
      </ul>
    </div>
  );
}

export default Calendar;
