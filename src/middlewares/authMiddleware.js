import jwt from 'jsonwebtoken';

export function authenticate(req, res, next) {
  // Check if the JWT is present in headers or cookies
  const token = req.headers.authorization || req.cookies.token;

  // If token is not present, return an error response
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    // Verify and decode the JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the user data to the request object
    req.user = decoded.user;

    // Proceed to the next middleware or route handler
    next();
  } catch (err) {
    // If the JWT is invalid or expired, return an error response
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}
