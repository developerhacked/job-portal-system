/* eslint-disable react/prop-types */
import 'react';

function EducationalPreview({ resumeInfo }) {
  return (
    <div className="education-container">
      {/* ✅ Section Title */}
      <h3
        className="education-heading theme-color"
        style={{ color: resumeInfo?.themeColor || 'black', textAlign: 'center' }}
      >
        Education
      </h3>

      <hr className="border-[1.5px] my-2" />

      {/* ✅ Ensure education exists before mapping */}
      {resumeInfo?.education?.length > 0 ? (
        resumeInfo.education.map((edu, index) => (
          <div key={edu.id || index} className="education-item">
            
            {/* ✅ Left Side: Degree, University, Location */}
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-bold ">{edu.degree}</h3>
                <p className="text-sm text-gray-600">
                  {edu.university}, {edu.location}
                </p>
              </div>

              {/* ✅ Right Side: Dates */}
              <div className="text-sm text-gray-500">
                {edu.startDate} - {edu.endDate || "Present"}
              </div>
            </div>

            {/* ✅ Education Description */}
            {edu.description && (
              <p className="text-sm text-gray-600 mt-[6px] leading-relaxed">{edu.description}</p>
            )}

             {/* Divider after each entry */}
          </div>
        ))
      ) : (
        <p className="text-left">No education details added yet.</p>
      )}
    </div>
  );
}

export default EducationalPreview;