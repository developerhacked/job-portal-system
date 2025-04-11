import 'react';
import { useContext, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';

const formField = {
    title: '',
    companyName: '',
    city: '',
    state: '',
    startDate: '',
    endDate: '',
    workSummary: '',
};

function Experience() {
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const [experienceList, setExperienceList] = useState(resumeInfo.experience || [formField]);

    // ✅ Update Experience Fields in Context
    const handleChange = (index, event) => {
        const { name, value } = event.target;
        const updatedList = experienceList.map((exp, i) =>
            i === index ? { ...exp, [name]: value } : exp
        );
        setExperienceList(updatedList);
        setResumeInfo((prev) => ({ ...prev, experience: updatedList })); // 🔄 Sync with ResumeInfoContext
    };

    // ✅ Add a New Experience Entry
    const addExperience = () => {
        const updatedList = [...experienceList, formField];
        setExperienceList(updatedList);
        setResumeInfo((prev) => ({ ...prev, experience: updatedList })); // 🔄 Sync with Context
    };

    // ✅ Remove an Experience Entry
    const removeExperience = (index) => {
        if (experienceList.length === 1) return;
        const updatedList = experienceList.filter((_, i) => i !== index);
        setExperienceList(updatedList);
        setResumeInfo((prev) => ({ ...prev, experience: updatedList })); // 🔄 Sync with Context
    };

    return (
        <div className="p-5 shadow-md rounded-xl border-t-4 border-[var(--primary-color,#3b82f6)] mt-5 bg-white">
            <h3 className="text-lg font-bold text-gray-800">Professional Experience</h3>
            <p className="text-sm text-gray-500">Add Your Previous Job Experience</p>

            {experienceList.map((item, index) => (
                <div key={index} className="border p-3 rounded-lg mb-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm font-medium">Position Title</label>
                            <Input
                                name="title"
                                value={item.title}
                                onChange={(event) => handleChange(index, event)}
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium">Company Name</label>
                            <Input
                                name="companyName"
                                value={item.companyName}
                                onChange={(event) => handleChange(index, event)}
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium">City</label>
                            <Input
                                name="city"
                                value={item.city}
                                onChange={(event) => handleChange(index, event)}
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium">State</label>
                            <Input
                                name="state"
                                value={item.state}
                                onChange={(event) => handleChange(index, event)}
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium">Start Date</label>
                            <Input
                                type="date"
                                name="startDate"
                                value={item.startDate}
                                onChange={(event) => handleChange(index, event)}
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium">End Date</label>
                            <Input
                                type="date"
                                name="endDate"
                                value={item.endDate}
                                onChange={(event) => handleChange(index, event)}
                            />
                        </div>
                        <div className="col-span-2">
                            <label className="text-sm font-medium">Work Summary</label>
                            <Input
                                name="workSummary"
                                value={item.workSummary}
                                onChange={(event) => handleChange(index, event)}
                            />
                        </div>
                    </div>

                    <div className="flex justify-end mt-3">
                        {experienceList.length > 1 && (
                            <Button variant="destructive" size="sm" onClick={() => removeExperience(index)}>
                                Remove
                            </Button>
                        )}
                    </div>
                </div>
            ))}

            <div className="mt-4 flex justify-between">
                <Button onClick={addExperience} size="sm">
                    + Add Experience
                </Button>
            </div>
        </div>
    );
}

export default Experience;