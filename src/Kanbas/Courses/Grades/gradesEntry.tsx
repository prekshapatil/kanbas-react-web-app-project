import "../../../libs/font-awesome/css/font-awesome.min.css";
function GradesEntry({gradeValue} : {gradeValue: string}) {
  return (
    <td className="wd-kanbas-center-heading wd-kanbas-table-border">
    <div className="wd-kanbas-center-heading wd-kanbas-edit-margin">
    <input
      className="form-control wd-kanbas-center-heading wd-kanbas-edit-grade w-50 float-start"
      value={`${gradeValue}%`}/>
    <i className="fa fa-pencil-square-o float-start mt-3 ms-2"></i>
    </div>
    </td>
    );
}

export default GradesEntry;