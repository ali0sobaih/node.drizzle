import { db } from "../db/connection.js";
import { booksTable } from "../db/schema/books.js";
import { authorsTable } from "../db/schema/authors.js";
import { success, error as errorResponse } from "../utils/response.js";
import { eq } from "drizzle-orm";


const publishBook = async (req,res) => {
    try{
        const userId = req.user.id;
        const {title, description} = req.validated;

        const authors = await db.select().from(authorsTable).where(eq(authorsTable.user_id, userId));
        if (authors.length === 0) {
            return errorResponse(res, "Only authors can publish books!", null, 403);
        }

        const authorId = authors[0].id;


        await db.insert(booksTable).values({ title, description, authorId });

        return success(res, "book was added!", null, 200);


    }catch (err){
        return errorResponse(res, "An error occurred while publishing", err.message, 500);
    }
}

const showBooks = async (req,res) => {
    try{
        const books = await db.select().from(booksTable);

        if(books.length === 0){
            return success(res, "no books found!", null, 404);
        }

        return success(res, "all books", books, 200);
        
    }catch(err){
        return errorResponse(res, "An error occurred", err.message, 500);
    }
}


const deleteBook = async (req, res) => {
    try {
      const bookId = Number(req.params.id);
  
      const books = await db.select().from(booksTable).where(eq(booksTable.id, bookId));
      if (books.length === 0) {
        return errorResponse(res, "Book not found!", null, 404);
      }
  
      await db.delete(booksTable).where(eq(booksTable.id, bookId));
  
      return success(res, "Deleted!", null, 200);
  
    } catch (err) {
      return errorResponse(res, "An error occurred", err.message, 500);
    }
  };
  
  

export default{
    publishBook,
    showBooks,
    deleteBook
} 