import { useContext } from 'react';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import PersonalDetailPreview from '../components/preview/PersonalDetailPreview';
import SummaryPreview from '../components/preview/SummaryPreview';
import ProfessionalExperiencePreview from './preview/ProfessionalExperiencePreview';

import SkillsPreview from './preview/SkillsPreview';
import EducationalPreview from './preview/EducationPreview';
function ResumePreview() {
    const { resumeInfo } = useContext(ResumeInfoContext); // ✅ Fix variable name

    console.log("ResumeInfo in ResumePreview:", resumeInfo); // ✅ Debugging

    return (
        <div
            className={`shadow-lg h-full p-14 border-t-[20px] border-solid ${!resumeInfo?.themeColor ? "default-border" : ""}`}
            style={{ borderTopColor: resumeInfo?.themeColor || 'black' }} // ✅ Apply border color dynamically
        >
            <PersonalDetailPreview resumeInfo={resumeInfo} />

            <SummaryPreview resumeInfo={resumeInfo} />

            <ProfessionalExperiencePreview resumeInfo={resumeInfo} />

            <EducationalPreview resumeInfo={resumeInfo} />

            <SkillsPreview resumeInfo = {resumeInfo} />
        </div>

    );
}

export default ResumePreview;