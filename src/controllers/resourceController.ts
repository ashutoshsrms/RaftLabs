// src/controllers/resourceController.ts
import { Request, Response } from 'express';
import Resource, { ResourceDocument } from '../models/Resource';

// Create a new resource
export const createResource = async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    const newResource: ResourceDocument = new Resource(req.body);
    await newResource.save();
    res.status(201).json(newResource);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Get all resources
export const getAllResources = async (req: Request, res: Response) => {
  try {
    const resources = await Resource.find();
    res.json(resources);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Get a single resource by ID
export const getResourceById = async (req: Request, res: Response) => {
  const resourceId = req.params.id;

  try {
    const resource = await Resource.findById(resourceId);
    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }
    res.json(resource);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Update a resource by ID
export const updateResourceById = async (req: Request, res: Response) => {
  const resourceId = req.params.id;

  try {
    const updatedResource = await Resource.findByIdAndUpdate(
      resourceId,
      req.body,
      { new: true }
    );

    if (!updatedResource) {
      return res.status(404).json({ message: 'Resource not found' });
    }

    res.json(updatedResource);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Delete a resource by ID
export const deleteResourceById = async (req: Request, res: Response) => {
  const resourceId = req.params.id;

  try {
    const deletedResource = await Resource.findByIdAndRemove(resourceId);

    if (!deletedResource) {
      return res.status(404).json({ message: 'Resource not found' });
    }

    res.json({ message: 'Resource deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
