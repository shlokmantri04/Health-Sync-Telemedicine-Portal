const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'secret_doctor_key';

module.exports = (req, res, next) =>
{
    const authHeader = req.header('Authorization');

    if (!authHeader)
    {
        return res.status(401).json({ success: false, message: 'No authentication token provided, authorization denied.' });
    }

    try
    {
        const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;
        const decoded = jwt.verify(token, JWT_SECRET);

        // Attach user to current request context
        req.user = decoded;
        next();
    } catch (error)
    {
        res.status(401).json({ success: false, message: 'Invalid or expired authentication token.' });
    }
};
