import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import userModel from '../model/userModel.js';


//signup

export const signup = async (req, res) => {
    const { username, email, password } = req.body;
    const usernameRegex = /^[a-zA-Z0-9]+$/;

    try {
        const existingUser = await userModel.findOne({ email: email });
        if (existingUser) {
            return res.status(400).send({ message: "User already exists!" });
        }
        if (!usernameRegex.test(username)) {
            return res
                .status(400)
                .send({ message: "Some characters are not allowed!" });
        }
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = await userModel.create({
            email: email,
            password: hashedPassword,
            username: username,
        });

        const jwtToken = jwt.sign(
            {
                _id: user._id,
                email: user.email,
            },
            process.env.JWT_KEY,
            {
                expiresIn: "1d",
            }
        );

        res.cookie("token", jwtToken, {
            path: "/",
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
            httpOnly: true,
            sameSite: "lax",
        });

        return res.status(201).send({
            username: user.username,
            picture: user.picture,
            email: user.email,
            savedCodes: user.savedCodes,
        });
    } catch (error) {
        return res.status(500).send({ message: "Error signing up!", error: error });
    }
};


//login

export const login = async (req, res) => {
    const { userId, password } = req.body;
    try {
        let existingUser;

        if (userId.includes("@")) {
            existingUser = await userModel.findOne({ email: userId });
        } else {
            existingUser = await userModel.findOne({ username: userId });
        }

        if (!existingUser) {
            return res.status(400).send({ message: "User not found" });
        }

        const passwordMatched = await bcrypt.compare(
            password,
            existingUser.password
        );

        if (!passwordMatched) {
            return res.status(400).send({ message: "wrong password" });
        }

        const jwtToken = jwt.sign(
            {
                _id: existingUser._id,
                email: existingUser.email,
            },
            process.env.JWT_KEY,
            {
                expiresIn: "1d",
            }
        );

        res.cookie("token", jwtToken, {
            path: "/",
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
            httpOnly: true,
            sameSite: "lax",
        });

        return res.status(200).send({
            username: existingUser.username,
            picture: existingUser.picture,
            email: existingUser.email,
            savedCodes: existingUser.savedCodes,
        });
    } catch (error) {
        return res.status(500).send({ message: "Error log in!", error: error });
    }
};

// logout

export const logout = async (req, res) => {
    try {
        res.clearCookie("token");
        return res.status(200).send({ message: "logged out successfully!" });
    } catch (error) {
        return res.status(500).send({ message: "Error logging out!", error });
    }
};


//userdetails

export const userDetails = async (req, res) => {
    const userId = req._id;
    try {
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).send({ message: "Cannot find the user!" });
        }
        return res.status(200).send({
            username: user.username,
            picture: user.picture,
            email: user.email,
            savedCodes: user.savedCodes,
        });
    } catch (error) {
        return res.status(500).send({ message: "Cannot fetch user details" });
    }
};

