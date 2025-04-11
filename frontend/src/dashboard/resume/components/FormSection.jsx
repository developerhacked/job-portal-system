/* eslint-disable no-unused-vars */
import 'react';
import PersonalDetail from './forms/PersonalDetail';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, LayoutGrid } from 'lucide-react';
import { useState } from 'react';
import Summary from './forms/Summary';
import Experience from './forms/Experience';
import Education from './forms/Education';
import Skills from './forms/Skills';
import { Navigate, useParams } from 'react-router-dom';

function FormSection() {
  const [activeFormIndex, setActiveFormIndex] = useState(1); // ✅ Start at the correct index
  const [enableNext, setEnableNext] = useState(true);
  const { resumeId } = useParams();

  return (
    <div className="p-5 bg-white rounded-lg shadow-md">
      {/* ✅ Header section */}
      <div className="flex justify-between items-center mb-4">
        <Button variant="outline" size="sm" className="theme-button">
          <LayoutGrid /> Theme
        </Button>

        {/* ✅ Navigation buttons container */}
        <div className="flex items-center gap-2">
          {activeFormIndex > 1 && (
            <Button 
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300" 
              size="sm"
              onClick={() => setActiveFormIndex(activeFormIndex - 1)}
            >
              <ArrowLeft /> Back
            </Button>
          )}
          <Button 
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" 
            size="sm"
            onClick={() => setActiveFormIndex(activeFormIndex + 1)}
          >
            Next <ArrowRight />
          </Button>
        </div>
      </div>

      {/* ✅ Render Components Based on `activeFormIndex` */}
      {activeFormIndex === 1 && <PersonalDetail enabledNext={setEnableNext} />}
      {activeFormIndex === 2 && <Summary enabledNext={setEnableNext} />}
      {activeFormIndex === 3 && <Experience />}
      {activeFormIndex === 4 && <Education enabledNext={setEnableNext} />}
      {activeFormIndex === 5 && <Skills enabledNext={setEnableNext} />}
      {activeFormIndex === 6 && <Navigate to={`/my-resume/${resumeId}/view`} />}
    </div>
  );
}

export default FormSection;