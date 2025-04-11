import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";



export const register = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, password, role } = req.body;
         
        if (!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({ message: "All fields are required.", success: false });
        }
        
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists with this email.', success: false });
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);

        let profilePhoto = "";
        if (req.file) {
            const fileUri = getDataUri(req.file);
            const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
            profilePhoto = cloudResponse.secure_url;
        }

        const newUser = await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
            profile: { profilePhoto }
        });

        return res.status(201).json({ message: "Account created successfully.", success: true, user: newUser });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error.", success: false });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        
        if (!email || !password || !role) {
            return res.status(400).json({ message: "All fields are required.", success: false });
        }

        const user = await User.findOne({ email }).select("+password");
        if (!user || !(await bcrypt.compare(password, user.password)) || role !== user.role) {
            return res.status(400).json({ message: "Invalid credentials.", success: false });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });

        return res.status(200)
            .cookie("token", token, { httpOnly: true, sameSite: 'strict', maxAge: 86400000 })
            .json({ message: `Welcome back ${user.fullname}`, user, success: true });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error.", success: false });
    }
};

export const logout = (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({ message: "Logged out successfully.", success: true });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error.", success: false });
    }
};

export const updateProfile = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, } = req.body;
        const userId = req.userId; // Ensure authentication middleware sets this
        
        let user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found.", success: false });
        }

        if (fullname) user.fullname = fullname;
        if (email) user.email = email;
        if (phoneNumber) user.phoneNumber = phoneNumber;
       
        if (req.file) {
            const fileUri = getDataUri(req.file);
            const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
            user.profile.resume = cloudResponse.secure_url;
            user.profile.resumeOriginalName = req.file.originalname;
        }

        await user.save();

        return res.status(200).json({ message: "Profile updated successfully.", user, success: true });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error.", success: false });
    }
};
