import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useContext, useState, useEffect } from 'react';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';

function Education() {
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    
    // Initialize state from context
    const [educationList, setEducationList] = useState(resumeInfo.education || []);

    // Sync updates with ResumeInfoContext
    useEffect(() => {
        setResumeInfo((prev) => ({ ...prev, education: educationList }));
    }, [educationList, setResumeInfo]);

    // Handle input change
    const handleChange = (index, event) => {
        const { name, value } = event.target;
        const updatedEducation = [...educationList];
        updatedEducation[index][name] = value;
        setEducationList(updatedEducation);
    };

    // Add new education entry
    const addEducation = () => {
        setEducationList([
            ...educationList,
            {
                id: Date.now(),
                degree: '',
                university: '',
                location: '',
                startDate: '',
                endDate: '',
                description: ''
            }
        ]);
    };

    // Remove education entry
    const removeEducation = (index) => {
        const updatedEducation = educationList.filter((_, i) => i !== index);
        setEducationList(updatedEducation);
    };

    return (
        <div className="p-5 shadow-md rounded-xl border-t-4 border-[var(--primary-color,#3b82f6)] mt-5 bg-white">
            <h3 className="text-lg font-bold text-gray-800">Education</h3>
            <p className="text-sm text-gray-500">Add Your Educational Details</p>

            {educationList.map((item, index) => (
                <div key={item.id} className="border p-4 rounded-lg mb-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm">Degree</label>
                            <Input
                                name="degree"
                                value={item.degree}
                                onChange={(e) => handleChange(index, e)}
                            />
                        </div>
                        <div>
                            <label className="text-sm">University</label>
                            <Input
                                name="university"
                                value={item.university}
                                onChange={(e) => handleChange(index, e)}
                            />
                        </div>
                        <div>
                            <label className="text-sm">Location</label>
                            <Input
                                name="location"
                                value={item.location}
                                onChange={(e) => handleChange(index, e)}
                            />
                        </div>
                        <div>
                            <label className="text-sm">Start Date</label>
                            <Input
                                name="startDate"
                                value={item.startDate}
                                onChange={(e) => handleChange(index, e)}
                            />
                        </div>
                        <div>
                            <label className="text-sm">End Date</label>
                            <Input
                                name="endDate"
                                value={item.endDate}
                                onChange={(e) => handleChange(index, e)}
                            />
                        </div>
                        <div className="col-span-2">
                            <label className="text-sm">Description</label>
                            <Input
                                name="description"
                                value={item.description}
                                onChange={(e) => handleChange(index, e)}
                            />
                        </div>
                    </div>

                    {educationList.length > 1 && (
                        <Button
                            size="sm"
                            className="mt-2 mb-4 bg-red-500 hover:bg-red-600 text-white"
                            onClick={() => removeEducation(index)}
                        >
                            Remove
                        </Button>
                    )}
                </div>
            ))}

            <Button className="mt-6" onClick={addEducation}>
                + Add Education
            </Button>
        </div>
    );
}

export default Education;