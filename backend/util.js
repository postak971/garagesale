import jwt from 'jsonwebtoken';
import config from "./config";

// eslint-disable-next-line arrow-body-style
export const generateToken = (user) => {
    return jwt.sign({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
    }, config.JWT_SECRET);
};