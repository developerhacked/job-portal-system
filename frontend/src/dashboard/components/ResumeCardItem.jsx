/* eslint-disable react/prop-types */
import { NotebookIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // ✅ Import useNavigate
import 'react';

function ResumeCardItem({ resume }) {
  const navigate = useNavigate(); // ✅ Initialize navigation

  const handleCardClick = () => {
    navigate(`/dashboard/resume/${resume.id}/edit`); // ✅ Navigate to edit page
  };

  return (
    <div onClick={handleCardClick} className="cursor-pointer resume-card-item">
      {/* Notebook Icon */}
      <div className="p-14 py-24 flex justify-center items-center bg-[var(--secondary-color,#E5E7EB)] border border-gray-300 rounded-lg transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-md cursor-pointer">
        <NotebookIcon size={40} />
      </div>

      {/* Resume Title (Placed Outside the Notebook Container) */}
      <div className="mt-2 text-center text-lg font-semibold">
        {resume.title}
      </div>
    </div>
  );
}

export default ResumeCardItem;