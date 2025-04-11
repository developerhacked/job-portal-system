import { Button } from '@/components/ui/button';
import { Textarea } from "@/components/ui/textarea";
import { useContext, useEffect, useState } from 'react';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { AIChatSession } from './../../../../../service/AIModel';

function Summary() {
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const [summary, setSummary] = useState(resumeInfo.summary || "");

    // ✅ Keep summary in sync with ResumeInfoContext
    useEffect(() => {
        setSummary(resumeInfo.summary || "");
    }, [resumeInfo.summary]);

    // ✅ Update summary instantly in ResumeInfoContext
    const handleChange = (e) => {
        const newSummary = e.target.value;
        setSummary(newSummary);
        setResumeInfo((prev) => ({ ...prev, summary: newSummary }));
    };

    // ✅ Generate summary using AI
    const GenerateSummaryFromAI = async (e) => {
        e.preventDefault(); // Prevents page reload
        const prompt = `jobTitle: ${resumeInfo?.jobTitle}, depending on the job title give me only 1 summary for my resume within 25-30 words`;

        try {
            console.log("Prompt sent to AI:", prompt);

            const aiSummary = await AIChatSession(prompt); // ✅ Call AI function correctly
            console.log("AI Response:", aiSummary);

            setSummary(aiSummary);
            setResumeInfo((prev) => ({ ...prev, summary: aiSummary }));
        } catch (error) {
            console.error("Error generating summary:", error);
        }
    };

    

    return (
        <div>
            <div className="p-5 shadow-md rounded-xl border-t-4 border-[var(--primary-color,#3b82f6)] mt-5 bg-white">
                <h3 className="text-lg font-bold text-gray-800">Summary</h3>
                <p className="text-sm text-gray-500">Add Summary To Your Job Title</p>
                <form>
                    <div className="summary-container flex justify-between items-center">
                        <label className="text-sm font-medium">Add Summary</label>
                        <Button 
                            size="sm" 
                            className="border-primary" 
                            onClick={GenerateSummaryFromAI}
                        >
                            Generate From AI
                        </Button>
                    </div>

                    {/* ✅ Fully functional Textarea */}
                    <Textarea
                        className="textarea w-full mt-3"
                        placeholder="Write a short summary about yourself..."
                        value={summary}
                        onChange={handleChange}
                    />

                    
                </form>
            </div>
        </div>
    );
}

export default Summary;