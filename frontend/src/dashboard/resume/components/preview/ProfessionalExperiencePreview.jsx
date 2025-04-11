/* eslint-disable react/prop-types */
import 'react';

function ProfessionalExperiencePreview({ resumeInfo }) {
  return (
    <div className="professional-experience-container">
      <h3
        className="professional-experience-heading theme-color"
        style={{ color: resumeInfo?.themeColor || 'black', textAlign: 'center' }}
      >
        Professional Experience
      </h3>

      <hr className="border-[1.5px] my-2" />

      {/* ✅ Ensure experience exists before mapping */}
      {resumeInfo?.experience?.length > 0 ? (
        resumeInfo.experience.map((experience, index) => (
          <div
            key={index}
            className="experience-item flex justify-between items-start mb-4"
          >
            {/* ✅ Left Side: Title, Company, State, City */}
            <div className="text-left">
              <h3 className="experience-title font-bold text-lg">{experience?.title}</h3>
              <p className="experience-company text-sm text-gray-700">
                {experience?.companyName}, {experience?.state}, {experience?.city}
              </p>
              <p className="experience-summary text-sm text-gray-800 mt-2">
                {experience?.workSummary}
              </p>

            </div>

            {/* ✅ Right Side: Dates */}
            <div className="experience-dates text-right text-sm text-gray-600">
              {experience?.startDate} - {experience?.endDate || "Present"}
            </div>
          </div>
        ))
      ) : (
        <p className="text-left">No experience added yet.</p>
      )}
    </div>
  );
}

export default ProfessionalExperiencePreview;