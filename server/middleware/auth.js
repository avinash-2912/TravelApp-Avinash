const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Ensure decoded token contains userId and role
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

const isOrganizer = (req, res, next) => {
  if (req.user.role !== 'organizer') {
    return res.status(403).json({ message: 'Organizer access required' });
  }
  next();
};

module.exports = { auth, isOrganizer };
