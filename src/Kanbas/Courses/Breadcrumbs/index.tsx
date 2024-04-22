import { useLocation } from 'react-router';
import Breadcrumb from 'rsuite/Breadcrumb';
import { assignments } from "../../Database";

function BreadcrumbTop({courseId, courseName}: {courseId : string, courseName: string}) {
    const { pathname } = useLocation();
    const pathArray = pathname.split('/');
    const index = pathArray.indexOf(courseId);
    const bcArray = pathArray.slice(index);;
  return (
    <Breadcrumb separator={' > '}>
      {bcArray.map((item, index) => (
        <Breadcrumb.Item key={index} className={`${index !== bcArray.length-1?"wd-kanbas-hyperlink":""}`} >{item === courseId?courseName:bcArray.at(index-1) === "Assignments"?assignments.find((type) => type.type === "Assignments")?.value.find((assignment) => assignment._id === item)?.title:item}</Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
}

export default BreadcrumbTop;


