import express from 'express';
import {
  createResource,
  getAllResources,
  getResourceById,
  updateResourceById,
  deleteResourceById,
  getPaginatedAndSortedResources,
} from '../controllers/resourceController';
import {authMiddleware} from '../middlewares/authMiddleware';
const router = express.Router();


router.post('/createResource',authMiddleware, createResource);
router.get('/getAllResources',authMiddleware, getAllResources);
router.get('/getResourceById/:id',authMiddleware, getResourceById);
router.put('/updateResourceById/:id',authMiddleware, updateResourceById);
router.delete('/deleteResourceById/:id',authMiddleware, deleteResourceById);
router.get('/getPaginatedResources', authMiddleware,getPaginatedAndSortedResources);

export default router;
