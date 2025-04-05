import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { db } from "../db/connection.js";
import { usersTable } from "../db/schema/users.js";
import { authorsTable } from "../db/schema/authors.js";
import { success, error as errorResponse } from "../utils/response.js";
import { eq } from "drizzle-orm";
import { authMiddleware } from "../Middlewares/authMiddleware.js";


const register = async (req,res) => {
    try{
        const {name, email, password} = req.validated;

        const existing = await db.select().from(usersTable).where(eq(usersTable.email, email));
        if (existing.length > 0) {
            return errorResponse(res, "Email already registered", null, 409);
        }

        const hashed = await bcrypt.hash(password, 10);
        const result = await db.insert(usersTable).values({ name, email, password: hashed });

        const [newUser] = await db.select().from(usersTable)
        .where(eq(usersTable.id, result[0].insertId));

        const token = jwt.sign(
            { id: newUser.id, email: newUser.email }, // Payload
            process.env.JWT_SECRET, // Secret key for signing the token
            { expiresIn: '1h' } // Token expiration (optional)
        );

        return success(res, "User created successfully", {newUser, token}, 201);
    }catch(err){
        return errorResponse(res, "An error occurred while creating the user", err.message, 500);
    }
    
}

const login = async (req, res) => {
  try {
    const { email, password } = req.validated;

    const users = await db.select().from(usersTable).where(eq(usersTable.email, email));
    const [user] = users;
    
    if (!user) {
      return errorResponse(res, "Invalid credentials - user not found", null, 401);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return errorResponse(res, "Invalid credentials - password mismatch", null, 401);
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    return success(res, "Logged in successfully", { token }, 200);
  } catch (err) {
    return errorResponse(res, "An error occurred while logging in", err.message, 500);
  }
};


const becomeAnAuther = async (req, res) => {
    try {
        const userId = req.user.id;
        const { name, bio } = req.validated;


        const existing = await db.select()
            .from(authorsTable)
            .where(eq(authorsTable.user_id, userId));

        if (existing.length > 0) {
            return errorResponse(res, "You already have an author profile", null, 409);
        }


        await db.insert(authorsTable)
            .values({ name, bio, user_id: userId });


        const [newAuthor] = await db.select()
            .from(authorsTable)
            .where(eq(authorsTable.user_id, userId));

        return success(res, "You're now an author!", newAuthor, 201);
    } catch (err) {
        console.error("SQL Error:", err);
        return errorResponse(res, "Failed to become an author", err.message, 500);
    }
};

export default { 
    register, 
    login , 
    becomeAnAuther};


