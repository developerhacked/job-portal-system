/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { LoaderCircle } from 'lucide-react';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import GlobalApi from '../../../../../service/GlobalApi';

function PersonalDetail({ enabledNext = () => {} }) { // ✅ Default function to prevent errors
    const params = useParams();
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const [formData, setFormData] = useState(resumeInfo || {}); 
    const [loading, setLoading] = useState(false);

    // ✅ Sync formData with resumeInfo
    useEffect(() => {
        if (resumeInfo) {
            setFormData(resumeInfo);
        }
    }, [resumeInfo]);

    // ✅ Ensure enabledNext exists before calling it
    const handleInputChange = (e) => {
        if (typeof enabledNext === "function") enabledNext(false);
        
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        setResumeInfo((prev) => ({
            ...prev,
            [name]: value,
        })); // ✅ Updates ResumePreview live
    };

    const onSave = (e) => {
        e.preventDefault();
        setLoading(true);
    
        // ✅ Ensure correct field order
        const data = {
            data:formData
        }
    
    
        GlobalApi.UpdateResumeDetail(params.resumeId, data)
    .then((resp) => {
        console.log(resp);
        enabledNext(true);
        setLoading(false);
        setResumeInfo(data);
        
        
    })
    .catch((error) => {
        setLoading(false);
    });

    };
    

    return (
        <div className="p-5 shadow-md rounded-xl border-t-4 border-[var(--primary-color,#3b82f6)] mt-5 bg-white">
            <h3 className="text-lg font-bold text-gray-800">Personal Detail</h3>
            <p className="text-sm text-gray-500">Get Started With The Basic Information</p>

            <form onSubmit={onSave}>
                <div className="grid grid-cols-2 mt-5 gap-3">
                    <div>
                        <label className="text-sm">First Name</label>
                        <Input 
                            name="firstName" 
                            required 
                            value={formData?.firstName || ''} 
                            onChange={handleInputChange} 
                        />
                    </div>
                    <div>
                        <label className="text-sm">Last Name</label>
                        <Input 
                            name="lastName" 
                            required 
                            value={formData?.lastName || ''} 
                            onChange={handleInputChange} 
                        />
                    </div>
                    <div className="col-span-2">
                        <label className="text-sm">Job Title</label>
                        <Input 
                            name="jobTitle" 
                            required 
                            value={formData?.jobTitle || ''} 
                            onChange={handleInputChange} 
                        />
                    </div>
                    <div className="col-span-2">
                        <label className="text-sm">Address</label>
                        <Input 
                            name="address" 
                            required 
                            value={formData?.address || ''} 
                            onChange={handleInputChange} 
                        />
                    </div>
                    <div className="col-span-2">
                        <label className="text-sm">Phone</label>
                        <Input 
                            name="phone" 
                            required 
                            value={formData?.phone || ''} 
                            onChange={handleInputChange} 
                        />
                    </div>
                    <div className="col-span-2">
                        <label className="text-sm">Email</label>
                        <Input 
                            name="email" 
                            required 
                            value={formData?.email || ''} 
                            onChange={handleInputChange} 
                        />
                    </div>
                </div>
                
            </form>
        </div>
    );
}

export default PersonalDetail;