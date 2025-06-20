import express from 'express';
import { deleteUser, getUser, getUserListings, test } from '../controllers/user.controllers.js';
// import { deleteUser, test, updateUser, getUserListings, getUser } from '../controllers/user.controller.js';
import { updateUser } from '../controllers/user.controllers.js';
import { verifyToken } from '../utils/verifyUser.js';


const router = express.Router();

router.get('/test', test);
router.post('/update/:id', verifyToken, updateUser)
router.delete('/delete/:id', verifyToken, deleteUser)
router.get('/listings/:id', verifyToken, getUserListings)
router.get('/:id', verifyToken, getUser)

export default router;