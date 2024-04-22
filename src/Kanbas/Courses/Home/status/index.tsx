import {
  FaBan,
  FaBell,
  FaCaretRight,
  FaChartBar,
  FaCheckCircle,
  FaCrosshairs,
  FaFileImport,
  FaNewspaper,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import Calendar from "./Calendar";
import { BsInfoCircleFill } from "react-icons/bs";

function Status() {
  return (
    <div style={{"marginLeft":"10px"}}>
      <div
        className="flex-grow-0 me-2 d-none d-lg-block"
        style={{ width: "250px" }}
      >
        <h5>Course Status</h5>
        <div style={{ marginLeft: "4px" }}>
          <button type="button">
            <FaBan style={{ color: "gray" }} /> Unpublished
          </button>
          <button
            style={{ marginLeft: "4px" }}
            type="button"
            className="btn-green"
          >
            <FaCheckCircle />
            Published
          </button>
        </div>
        <div>
          <ul className="list-group wd-course-status">
            <li>
              <Link to={"#"}>
                <FaFileImport /> Import Existing Content
              </Link>
            </li>
            <li>
              <Link to={"#"}>
                <FaCaretRight /> Import from Commons
              </Link>
            </li>
            <li>
              <Link to={"#"}>
                <FaCrosshairs /> Choose Home Page
              </Link>
            </li>
            <li>
              <Link to={"#"}>
                <FaChartBar /> View Course Stream
              </Link>
            </li>
            <li>
              <Link to={"#"}>
                <FaNewspaper /> Announcement
              </Link>
            </li>
            <li>
              <Link to={"#"}>
                <FaChartBar /> New Analytics
              </Link>
            </li>
            <li>
              <Link to={"#"}>
                <FaBell /> View Course Notification
              </Link>
            </li>
          </ul>
        </div>
        <br/>
        <h5 className="wd-to-do">
          <strong>To Do </strong>{" "}
        </h5>
      
        <hr />
        <ul className="list-group">
          <li className="d-flex justify-content-between align-items-start">
            <div>
              <div>
                <Link
                  to={"#"}
                  className="wd-coming-up-color-red"
                  style={{ textDecoration: "none",color:"red" }}
                >
                  <BsInfoCircleFill/>{" "}
                  A1 - ENV + HTML
                </Link>
              </div>
              <div style={{ color:"grey" }}>
                {" "}
                100 points - Sept 18 at 11:59pm
              </div>
            </div>
            <i className="fa fa-times wd-fg-color-gray"></i>
          </li>
        </ul>
        <br/>
      <Calendar/>
      </div>
      
    </div>
  );
}

export default Status;
