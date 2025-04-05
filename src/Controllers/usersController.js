import { db } from "../db/connection.js";
import { usersTable } from "../db/schema/users.js";
import { success, error as errorResponse } from "../utils/response.js";
import { eq } from "drizzle-orm";

const getAllUsers = async (req, res) => {
  try {
    const users = await db.select().from(usersTable);

    if (!users || users.length === 0) {
      return errorResponse(res, "No users found", null, 404);
    }

    return success(res, "Users fetched successfully", users, 200);
  } catch (err) {
    return errorResponse(res, "An error occurred while fetching users", err, 500);
  }
};

const createUser = async (req, res) => {
  try {
    const { name, email } = req.validated;

    const existing = await db.select().from(usersTable).where(eq(usersTable.email, email));
    if (existing.length > 0) {
      return errorResponse(res, "Email already exists", null, 409);
    }

    const result = await db.insert(usersTable).values({ name, email });

    const [newUser] = await db.select().from(usersTable)
      .where(eq(usersTable.id, result[0].insertId));

    return success(res, "User created successfully", newUser, 201);
  } catch (err){
        return errorResponse(res, "An error occurred while creating the user", err.message, 500);
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return errorResponse(res, "User ID is required", null, 400);
    }

    const user = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, Number(id)));

    if (!user || user.length === 0) {
      return errorResponse(res, "User not found", null, 404);
    }

    return success(res, "User fetched successfully", user[0], 200);
  } catch (err) {
    return errorResponse(res, "An error occurred while fetching the user", err, 500);
  }
};

export default {
  getAllUsers,
  createUser,
  getUserById,
};
