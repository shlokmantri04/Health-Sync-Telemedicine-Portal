const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'secret_doctor_key';

exports.register = async (req, res) =>
{
    try
    {
        const { name, email, password } = req.body;

        // Check if the doctor is already registered
        let user = await User.findOne({ email });
        if (user)
        {
            return res.status(400).json({ success: false, message: 'Doctor is already registered' });
        }

        // Hash the password securely
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Save the new doctor
        user = new User({ name, email, password: hashedPassword });
        await user.save();

        // Create a JSON Web Token (JWT)
        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1d' });

        res.status(201).json({
            success: true,
            token,
            user: { id: user._id, name, email }
        });
    } catch (error)
    {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
};

exports.login = async (req, res) =>
{
    try
    {
        const { email, password } = req.body;

        // Verify user exists
        const user = await User.findOne({ email });
        if (!user)
        {
            return res.status(400).json({ success: false, message: 'Invalid email or password' });
        }

        // Check if password directly matches the hashed one
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
        {
            return res.status(400).json({ success: false, message: 'Invalid email or password' });
        }

        // Issue JWT
        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1d' });

        res.status(200).json({
            success: true,
            token,
            user: { id: user._id, name: user.name, email }
        });
    } catch (error)
    {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
};
