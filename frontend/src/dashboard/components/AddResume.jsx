import PropTypes from 'prop-types'; 
import { Loader2, PlusSquare } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";
import { v4 as uuidv4 } from 'uuid';
import GlobalApi from './../../../service/GlobalApi';
import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

function AddResume({ setResumeList }) { 
  const [openDialog, setOpenDialog] = useState(false);
  const [resumeTitle, setResumeTitle] = useState("");
  const { user } = useUser();
  const [loading, setLoading] = useState(false); 
  const navigation = useNavigate();

  const onCreate = async () => {
    if (!resumeTitle.trim()) return; 
    setLoading(true);

    const uuid = uuidv4();
    const data = {
      data: {
        title: resumeTitle.trim(),
        resumeId: uuid,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        userName: user?.fullName,
      },
    };

    try {
      const resp = await GlobalApi.CreateNewResume(data);
      console.log("✅ Created Resume ID from Strapi:", resp?.data?.data?.id);

      if (resp?.data?.data?.id) {
        const newResume = {
          id: resp.data.data.id,
          title: resumeTitle.trim(),
        };

        // ✅ Update the resume list in Dashboard
        setResumeList(prevList => [...prevList, newResume]);

        setLoading(false);
        setOpenDialog(false);
        navigation(`/dashboard/resume/${resp.data.data.id}/edit`);
      }
    } catch (error) {
      console.error("Error creating resume:", error.response?.data || error);
      setLoading(false);
    }
  };

  return (
    <div>
      <div 
        className='p-14 py-24 flex justify-center items-center bg-[var(--secondary-color,#E5E7EB)] border border-gray-300 rounded-lg transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-md cursor-pointer' 
        onClick={() => setOpenDialog(true)}
      >
        <PlusSquare />
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="dialog-content">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-gray-900">
              Create New Resume
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              <p>Add a title for your new resume</p>
              <Input
                className="mt-2"
                placeholder="Ex. MERN Stack Resume"
                value={resumeTitle}
                onChange={(e) => setResumeTitle(e.target.value)}
              />
            </DialogDescription>
          </DialogHeader>

          <div className="dialog-footer flex justify-end gap-2">
            <Button onClick={() => setOpenDialog(false)} disabled={loading}>Cancel</Button>
            <Button 
              disabled={!resumeTitle.trim() || loading} 
              onClick={onCreate}
            >
              {loading ? <Loader2 className='animate-spin'/> : 'Create'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

AddResume.propTypes = {
  setResumeList: PropTypes.func.isRequired, 
};

export default AddResume;
