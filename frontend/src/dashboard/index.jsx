import React, { useEffect, useState } from "react";
import AddResume from "./components/AddResume";
import GlobalApi from "./../../service/GlobalApi";
import { useUser } from "@clerk/clerk-react";
import ResumeCardItem from "./components/ResumeCardItem";

function Dashboard() {
  const { user } = useUser();
  const [resumeList, setResumeList] = useState([]);

  useEffect(() => {
    if (user) {
      getResumesList();
    }
  }, [user]);

  const getResumesList = async () => {
    try {
      const resp = await GlobalApi.GetUserResumes(
        user?.primaryEmailAddress?.emailAddress
      );
      setResumeList(resp.data.data || []);
    } catch (error) {
      console.error("Error fetching resumes:", error);
    }
  };

  return (
    <div
      className="relative min-h-screen flex flex-col items-center pt-16 overflow-hidden"
      style={{
        backgroundColor: "#D9AFD9",
        backgroundImage: "linear-gradient(0deg, #D9AFD9 0%, #97D9E1 100%)",
      }}
    >
      <div className="w-full max-w-6xl px-6 md:px-10 lg:px-16">
        {/* Header Card */}
        <div className="bg-white shadow-lg rounded-2xl p-6 text-center mb-6">
          <h2 className="text-4xl font-extrabold text-blue-900">My Resume</h2>
          <p className="text-gray-600 text-lg mt-2">
            Start creating your AI-powered resume today!
          </p>
        </div>

        {/* Resume Grid Centered */}
        <div className="flex justify-center items-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-1 gap-6 mt-6">
            <AddResume setResumeList={setResumeList} />

            {resumeList.length > 0 ? (
              resumeList.map((resume, index) => (
                <ResumeCardItem resume={resume} key={resume.id || index} />
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-10">
                <p className="text-gray-500">Click the "+" to create one.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
