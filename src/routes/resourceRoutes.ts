import express from 'express';
import {
  createResource,
  getAllResources,
  getResourceById,
  updateResourceById,
  deleteResourceById,
} from '../controllers/resourceController';

const router = express.Router();


router.post('/createResource', createResource);
router.get('/getAllResources', getAllResources);
router.get('/getResourceById/:id', getResourceById);
router.put('/updateResourceById/:id', updateResourceById);
router.delete('/deleteResourceById/:id', deleteResourceById);

export default router;
