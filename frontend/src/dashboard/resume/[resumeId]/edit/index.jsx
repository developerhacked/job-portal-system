import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import FormSection from '../../components/FormSection';
import ResumePreview from '../../components/ResumePreview';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import dummy from '@/data/dummy';

function EditResume() {
    const { resumeId } = useParams();
    const [resumeInfo, setResumeInfo] = useState(dummy); // ✅ Set initial dummy data

    useEffect(() => {
        console.log("Editing Resume with ID:", resumeId);
    }, [resumeId]); 

    return (
        <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
            <div>
                <div className="pt-16 px-10 md:px-20 lg:px-32">
                    <div className='grid grid-cols-1 md:grid-cols-2 p-10 gap-10'>
                        <FormSection />
                        <ResumePreview /> {/* ✅ Now it will get context data */}
                    </div>
                </div> {/* This div was missing the closing tag */}
            </div>
        </ResumeInfoContext.Provider>
    );
}

export default EditResume;
