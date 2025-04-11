import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState, useContext, useEffect } from 'react';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';

function Skills() {
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

    // Initialize state from context
    const [skillsList, setSkillsList] = useState(resumeInfo.skills || []);

    // Sync changes to ResumeInfoContext
    useEffect(() => {
        setResumeInfo((prev) => ({ ...prev, skills: skillsList }));
    }, [skillsList, setResumeInfo]);

    // Handle input change
    const handleChange = (index, field, value) => {
        const updatedSkills = [...skillsList];
        updatedSkills[index][field] = value;
        setSkillsList(updatedSkills);
    };

    // Add a new skill
    const addSkill = () => {
        setSkillsList([...skillsList, { name: '', rating: 0 }]);
    };

    // Remove a skill and update context
    const removeSkill = (index) => {
        const updatedSkills = skillsList.filter((_, i) => i !== index);
        setSkillsList(updatedSkills);
        setResumeInfo((prev) => ({ ...prev, skills: updatedSkills })); // ✅ Ensure ResumeInfoContext updates
    };

    return (
        <div className="p-5 shadow-md rounded-xl border-t-4 border-[var(--primary-color,#3b82f6)] mt-5 bg-white">
            <h3 className="text-lg font-bold text-gray-800">Skills</h3>
            <p className="text-sm text-gray-500">Add Your Top Professional Key Skills</p>

            {skillsList.map((item, index) => (
                <div key={index} className="border p-4 rounded-lg mb-4">
                    <div>
                        <label className="text-sm">Skill Name</label>
                        <Input
                            value={item.name}
                            onChange={(e) => handleChange(index, 'name', e.target.value)}
                        />
                    </div>
                    
                    <div className="mt-2">
                        <label className="text-sm">Rating (1-5)</label>
                        <Input
                            type="number"
                            min="1"
                            max="5"
                            value={item.rating}
                            onChange={(e) => handleChange(index, 'rating', e.target.value)}
                        />
                    </div>

                    {skillsList.length > 1 && (
                        <Button
                            size="sm"
                            className="mt-2 mb-4 bg-red-500 hover:bg-red-600 text-white"
                            onClick={() => removeSkill(index)} // ✅ Remove skill properly
                        >
                            Remove
                        </Button>
                    )}
                </div>
            ))}

            <Button className="mt-6" onClick={addSkill}>
                + Add Skill
            </Button>
        </div>
    );
}

export default Skills;