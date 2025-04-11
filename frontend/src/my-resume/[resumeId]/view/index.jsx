import 'react';
import { Button } from '@/components/ui/button';
import ResumePreview from '@/dashboard/resume/components/ResumePreview';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { useEffect, useState } from 'react';
import GlobalApi from './../../../../service/GlobalApi';
import { useParams, useNavigate } from 'react-router-dom';
import dummy from '@/data/dummy'; // Import your dummy data

function ViewResume() {
    const [resumeInfo, setResumeInfo] = useState(null);
    const { resumeId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getResumeInfo();
    }, []);

    const getResumeInfo = async () => {
        try {
            const resp = await GlobalApi.GetResumeById(resumeId);
            console.log("Resume Data:", resp.data.data);

            // If no data, use dummy values
            setResumeInfo(resp.data.data || dummy);
        } catch (error) {
            console.error("Error fetching resume:", error);
            setResumeInfo(dummy); // Use dummy data if API fails
        }
    };

    const HandleDownload = () => {
        window.print();
    };

    return (
        <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
            <div id="no-print">
                <div className="text-center mb-6">
                    <h2 className="text-2xl font-medium text-blue-900">
                        🎉 Congrats! Your AI Resume Is Ready!
                    </h2>
                    <p className="text-gray-500">Now You Are Ready To Download Your Resume</p>
                </div>
            </div>

            {/* Added container for the resume preview with styles */}
            <div id="print-area" className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6 border border-gray-300">
                <ResumePreview />
            </div>

            <div id="no-print" className="flex flex-col items-center mt-6">
                <Button onClick={HandleDownload}>Download</Button>
                <Button variant="outline" className="mt-2" onClick={() => navigate('/')}>
                    Back
                </Button>
            </div>
        </ResumeInfoContext.Provider>
    );
}

export default ViewResume;
