import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { query } from "../db.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL:
        process.env.GOOGLE_CALLBACK_URL || "/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value;
        const googleId = profile.id;
        const firstName = profile.name.givenName;
        const lastName = profile.name.familyName;
        const profilePicture = profile.photos[0]?.value;

        let result = await query(
          "SELECT * FROM users WHERE google_id = $1 OR email = $2",
          [googleId, email],
        );

        let user = result.rows[0];

        if (user) {
          if (!user.google_id) {
            await query(
              `UPDATE users SET 
                google_id = $1, 
                profile_picture = $2, 
                first_name = $3, 
                last_name = $4, 
                auth_provider = 'google',
                email_verified = true,
                last_login = CURRENT_TIMESTAMP
              WHERE id = $5`,
              [googleId, profilePicture, firstName, lastName, user.id],
            );
          } else {
            await query(
              `UPDATE users SET 
                profile_picture = $1, 
                first_name = $2, 
                last_name = $3,
                last_login = CURRENT_TIMESTAMP
              WHERE id = $4`,
              [profilePicture, firstName, lastName, user.id],
            );
          }

          result = await query("SELECT * FROM users WHERE id = $1", [user.id]);
          user = result.rows[0];
        } else {
          const insertResult = await query(
            `INSERT INTO users (
              email, google_id, profile_picture, first_name, last_name, 
              auth_provider, email_verified, last_login
            ) VALUES ($1, $2, $3, $4, $5, 'google', true, CURRENT_TIMESTAMP) 
            RETURNING *`,
            [email, googleId, profilePicture, firstName, lastName],
          );
          user = insertResult.rows[0];
        }

        return done(null, user);
      } catch (error) {
        console.error("Google OAuth error:", error);
        return done(error, null);
      }
    },
  ),
);

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    },
    async (payload, done) => {
      try {
        const result = await query(
          "SELECT id, email, username, auth_provider, is_active FROM users WHERE id = $1",
          [payload.id],
        );

        if (result.rows.length === 0) {
          return done(null, false);
        }

        const user = result.rows[0];

        if (!user.is_active) {
          return done(null, false);
        }

        return done(null, user);
      } catch (error) {
        return done(error, false);
      }
    },
  ),
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const result = await query(
      "SELECT id, email, username, first_name, last_name, profile_picture, auth_provider FROM users WHERE id = $1",
      [id],
    );

    if (result.rows.length === 0) {
      return done(null, false);
    }

    done(null, result.rows[0]);
  } catch (error) {
    done(error, null);
  }
});

export default passport;
