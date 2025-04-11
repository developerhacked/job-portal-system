/* eslint-disable react/prop-types */
import 'react';

function PersonalDetailPreview({ resumeInfo }) {
  if (!resumeInfo) return <p>Loading...</p>; // ✅ Prevent rendering errors

  return (
    <div className="text-center p-4" style={{ '--theme-color': resumeInfo?.themeColor || 'black' }}>
      <h2 className="font-bold text-xl text-[var(--theme-color,black)]">{resumeInfo?.firstName} {resumeInfo?.lastName}</h2>
      <h2 className="text-sm font-medium text-gray-600">{resumeInfo?.jobTitle}</h2>
      <h2 className="text-xs font-normal text-[var(--theme-color,black)]">{resumeInfo?.address}</h2>

      <div className="flex justify-between gap-8 mt-2 text-sm font-normal text-[var(--theme-color,black)]">
        <span>{resumeInfo?.phone}</span>
        <span>{resumeInfo?.email}</span>
      </div>
      <hr className='border-[1.5px] my-2'
      style={{
        borderColor:resumeInfo?.themeColor
      }}/>
    </div>
    
  );
}

export default PersonalDetailPreview;