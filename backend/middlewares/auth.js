import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import jwt from 'jsonwebtoken';
import { User } from '../models/index.js';

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded JWT:", decoded);
    req.user = decoded; 
    next();
  } catch (err) {
    console.error("JWT verification error:", err);
    return res.status(403).json({ error: "Invalid or expired token." });
  }
};

// ✅ Google OAuth Strategy
passport.use(new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const { displayName, emails } = profile;
      const email = emails[0].value;

      let user = await User.findOne({ where: { email } });

      if (!user) {
        // ✅ Create JWT token for new user
        const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '7d' });

        // ✅ Save new user with token
        user = await User.create({
          name: displayName,
          email,
          password: '', // No password for Google login
          phone: null,     // You can let them update later
          token,
        });
      } else {
        // ✅ Update token for existing user
        const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '7d' });
        await user.update({ token });
      }

return done(null, { user, accessToken });
    } catch (err) {
      console.error('Google OAuth error:', err);
      return done(err, null);
    }
  }
));

// 🔁 Passport Session Handling (optional if you're using JWT for frontend sessions)
passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((obj, done) => {
  done(null, obj);
});

export default passport;
