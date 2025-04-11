import axios from "axios";

const API_KEY = import.meta.env.VITE_STRAPI_API_KEY; // ✅ Get API key from environment variables

// ✅ Correct axios instance setup
const axiosClient = axios.create({
  baseURL: 'http://localhost:1337/api/',
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${API_KEY}`, // ✅ Fixed template literal
  },
});

// ✅ Create a new resume
const CreateNewResume = (data) => {
  return axiosClient.post("/resumes", data); // ✅ Strapi requires wrapping in `data`
};

// ✅ Get resumes by user email
const GetUserResumes = (userEmail) => axiosClient.get(`/resumes?filters[userEmail][$eq]=${userEmail}`);



// ✅ Update resume details
const UpdateResumeDetail = (id, data) =>
  axiosClient.put(`/resumes/${id}`, data);

// ✅ Get resume by ID
const GetResumeById = (resumeId) => 
  axiosClient.get(`/resumes/${resumeId}`);

export default {
  CreateNewResume,
  GetUserResumes,
  UpdateResumeDetail,
  GetResumeById, // ✅ Added function here
};