import { Link, useLocation } from "react-router-dom";
import "../../libs/font-awesome/css/font-awesome.min.css";
import "../kanbasCSS/style.css";
import "./index.css";
import { FaTachometerAlt, FaRegUserCircle, FaBook, FaRegCalendarAlt } from "react-icons/fa";
function KanbasNavigation() {
  const links = [
    { label: "Account",   icon: "fa fa-user-circle" },
    { label: "Dashboard", icon: "fa fa-tachometer"  },
    { label: "Courses",   icon: "fa fa-book"        },
    { label: "Calendar",  icon: "fa fa-calendar" },
    { label: "Inbox",  icon: "fa fa-inbox" },
    { label: "History",  icon: "fa fa-history"},
    { label: "Studio",  icon: "fa fa-laptop"},
    { label: "Commons",  icon: "fa fa-arrow-circle-right"},
    { label: "Help",  icon: "fa fa-question-circle"},
  ];
  const { pathname } = useLocation();
  return (
    <ul className="wd-kanbas-navigation d-none d-md-block">
      <li style={{"marginBottom": 0, "padding": 0}}><a href="http://northeastern.edu"><div style={{"fontSize": "4em", "color": "red",  "fontWeight": "bolder"}}>N</div></a></li>
      {links.map((link, index) => (
        <li key={index} className={`${pathname.includes(link.label) ?"wd-active" : ""} `}>
          <Link to={`/Kanbas/${link.label}`}> <i className={`${link.icon}`} id={`${link.label === "Account" ? "wd-kanbas-navigation-white":""}`} ></i> <div className=".wd-display-block">{link.label}</div> </Link>
        </li>
      ))}
    </ul>
  );
}
export default KanbasNavigation;
