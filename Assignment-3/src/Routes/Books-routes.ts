import { Router } from 'express';
import { getBooks, getBookByID, createBook, updateBook, deleteBook} from '../Controllers/Books-controllers';

const router = Router();

router.get('/books', getBooks);
router.get('/books/:id', getBookByID);
router.post('/books/create', createBook);
router.put('/books/update/:id', updateBook);
router.delete('/books/delete/:id', deleteBook);


export default router;
