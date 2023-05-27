import express from 'express';
import { deleteTask, mytask, newTask, updateTask } from '../controller/task.js';
import { isAuthentcated } from '../middleware/auth.js';

const router =express.Router();

router.post('/new',isAuthentcated,newTask);
router.get('/myTask',isAuthentcated,mytask);
router.route('/:id').put(isAuthentcated,updateTask).delete(isAuthentcated,deleteTask)

export default router;