import jwt from 'jsonwebtoken';

export default function adminAuthMiddleware(req, res, next) {
  try {
    const auth = req.headers.authorization || '';
    const [, token] = auth.split(' ');
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    if (!payload.admin) {
      return res.status(403).json({ message: 'Forbidden: Not an admin' });
    }

    req.user = { admin: true };
    next();
  } catch (e) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}
