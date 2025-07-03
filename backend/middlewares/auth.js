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
        user = await User.create({
          name: displayName,
          email,
          password_hash: 'oauth',
          role: 'student', // default
        });

        const { StudentDetail } = await import('../models/index.js');
        await StudentDetail.create({ user_id: user.user_id });
      }

      const token = jwt.sign(
        { id: user.user_id, email: user.email, role: user.role }, // include role
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );

      await user.update({ token });

      return done(null, { user, token, accessToken });
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
