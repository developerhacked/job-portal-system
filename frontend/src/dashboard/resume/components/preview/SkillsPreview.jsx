/* eslint-disable react/prop-types */
import 'react';
import dummyResume from '@/data/dummy'; // ✅ Import the dummy file

function SkillsPreview({resumeInfo}) {
  return (
    <div className="professional-experience-container">
      <h3
        className="professional-experience-heading theme-color"
        style={{ color: resumeInfo?.themeColor || 'black', textAlign: 'center' }}
      >
        Skills
      </h3>
      <hr className="border-[1.5px] my-2" />

      {dummyResume.skills.length > 0 ? (
        <div className="grid grid-cols-2 gap-2">
          {dummyResume.skills.map((skill) => (
            <div key={skill.id} className="flex justify-between p-2 rounded-md bg-gray-200">
              <span className="skill-name">{skill.name}</span>
              <span className="skill-rating">{'⭐'.repeat(skill.rating)}</span>
            </div>
          ))}
        </div>
      ) : (
        <p>No skills added yet.</p>
      )}
    </div>
  );
}

export default SkillsPreview;