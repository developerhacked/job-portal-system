import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Loader2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { setUser } from '@/redux/authSlice';
import { toast } from 'sonner';

const UpdateProfileDialog = ({ open, setOpen }) => {
    const [loading, setLoading] = useState(false);
    const { user } = useSelector(store => store.auth);
    const navigate = useNavigate(); 

    const [input, setInput] = useState({
        fullname: user?.fullname || "",
        email: user?.email || "",
        phoneNumber: user?.phoneNumber || "",
        bio: user?.profile?.bio || "",
        skills: user?.profile?.skills?.join(', ') || "",
        file: user?.profile?.resume || null // Store selected file
    });

    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const fileChangeHandler = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setInput({ ...input, file });
            toast.success(`File ${file.name} uploaded successfully.`);
        }
    };

    const generateResume = () => {
        const skillsText = `Skills:\n${input.skills.split(', ').map(skill => `- ${skill}`).join('\n')}`;
        const resumeContent = `Full Name: ${input.fullname}\nEmail: ${input.email}\nPhone: ${input.phoneNumber}\nBio: ${input.bio}\n\n${skillsText}`;
        const blob = new Blob([resumeContent], { type: 'text/plain' });
        const file = new File([blob], "AI_Generated_Resume.txt", { type: 'text/plain' });
        setInput({ ...input, file });
        toast.success("AI-generated resume created successfully.");
        
        navigate('/dashboard');
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("bio", input.bio);
        formData.append("skills", input.skills);
        if (input.file) {
            formData.append("file", input.file);
        }
        try {
            setLoading(true);
            const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "An error occurred");
        } finally{
            setLoading(false);
        }
        setOpen(false);
    }

    return (
        <Dialog open={open}>
            <DialogContent className="sm:max-w-[425px]" onInteractOutside={() => setOpen(false)}>
                <DialogHeader>
                    <DialogTitle>Update Profile</DialogTitle>
                </DialogHeader>
                <form onSubmit={submitHandler}>
                    <div className='grid gap-4 py-4'>
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label htmlFor="name" className="text-right">Name</Label>
                            <Input id="name" name="fullname" type="text" value={input.fullname} onChange={changeEventHandler} className="col-span-3" />
                        </div>
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label htmlFor="email" className="text-right">Email</Label>
                            <Input id="email" name="email" type="email" value={input.email} onChange={changeEventHandler} className="col-span-3" />
                        </div>
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label htmlFor="number" className="text-right">Number</Label>
                            <Input id="number" name="phoneNumber" value={input.phoneNumber} onChange={changeEventHandler} className="col-span-3" />
                        </div>
                        {/* Upload Resume */}
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label htmlFor="resume" className="text-right">Upload Resume</Label>
                            <Input id="resume" name="file" type="file" accept=".pdf,.doc,.docx" onChange={fileChangeHandler} className="col-span-3" />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="button" onClick={generateResume} className="w-full my-2 bg-blue-500 hover:bg-blue-600">
                            Generate AI Resume
                        </Button>
                        {loading ? 
                            <Button className="w-full my-2"> 
                                <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait 
                            </Button> 
                            : 
                            <Button type="submit" className="w-full my-2">Update</Button>
                        }
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default UpdateProfileDialog;
