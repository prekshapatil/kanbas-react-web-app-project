import axios from "axios";
const COURSES_API = "https://kanbas-server-app-project.onrender.com/api/courses";
const MODULES_API = "https://kanbas-server-app-project.onrender.com/api/assignments";
export const deleteAssignment = async (moduleId:any) => {
  const response = await axios
    .delete(`${MODULES_API}/${moduleId}`);
  return response.data;
};

export const createAssignment = async (courseId:any, module:any) => {
    const response = await axios.post(
      `${COURSES_API}/${courseId}/assignments`,
      module
    );
    return response.data;
  };
  
export const findAssignmentForCourse = async (courseId:any) => {
  const response = await axios
    .get(`${COURSES_API}/${courseId}/assignments`);
  return response.data;
};

export const updateAssignment= async (module:any) => {
    const response = await axios.
      put(`${MODULES_API}/${module._id}`, module);
    return response.data;
  };