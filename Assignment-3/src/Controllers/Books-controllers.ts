import { Request, Response } from 'express'

type BookType = {
    ID: number,
    Title: string,
    Author: string,
}

const Books: BookType[] = [
    {
        ID: 1,
        Title: "Maths",
        Author: "Elon Musk",
    },
    {
        ID: 2,
        Title: "Science",
        Author: "Bill Gates",
    }
]

export const getBooks = (req: Request, res: Response) => {
    const AllBooks = {
        messege: "All books got successfully",
        data: Books,
    };
    res.status(200).json(AllBooks);
}

export const getBookByID = (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (isNaN(id)) return res.status(400).json({ messege: "Invalid ID" });

    const book = Books.find((book) => book.ID === id);

    if (!book) return res.status(404).json({ messege: 'Book not found' });

    return res.status(200).json({ data: book })
}

export const createBook = (req: Request, res: Response) => {
    const { Title, Author } = req.body;

    const newBook: BookType = {
        ID: Books.length + 1,
        Title,
        Author,
    };

    if (!Title || !Author) {
        return res.status(400).json({ message: "Please provide all fields" });
    }

    Books.push(newBook);

    res.status(201).json({
        message: "Book created successfully",
        data: newBook,
    });
}

export const updateBook = (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const { Title, Author } = req.body;

    if (isNaN(id)) return res.status(400).json({ messege: "Invalid ID" });

    const bookIndex = Books.findIndex((book) => book.ID === id);

    if (bookIndex) return res.status(404).json({ messege: 'Book not found' });

    if (!Title || !Author) {
        return res.status(400).json({ message: "Please provide all fields" });
    }

    Books[bookIndex] = {
        ID: id,
        Title,
        Author,
    };

    return res.status(200).json({
        message: "Book updated successfully",
        data: Books[bookIndex],
    });
}


export const deleteBook = (req: Request, res: Response) => {

    const bookID = Number(req.params.id);

    if (!bookID) {
        return res.status(400).json(
            {
                message: "Book ID is required"
            });
    }

    const index = Books.findIndex(book => book.ID === bookID);

    const deletedBook = Books.splice(index, 1);

    if (deletedBook.length === 0) {
        return res.status(404).json(
            {
                message: "Book not found!"
            }
        )
    }

    res.status(200).json(
        {
            message: "Deleted Successfully",
            data: deletedBook
        })
}