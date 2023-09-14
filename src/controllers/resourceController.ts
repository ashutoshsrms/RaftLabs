import { Request, Response } from 'express';
import Resource, { ResourceDocument } from '../models/Resource';
import {CACHE_KEY} from '../config'

import NodeCache from 'node-cache';
const cache = new NodeCache();


// Create a new resource
export const createResource = async (req: Request, res: Response) => {
  try {
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
    const cachedResources: ResourceDocument[] | undefined = cache.get(CACHE_KEY);
    if (cachedResources) {
      // If cached data exists, return it
      return res.status(200).json({ resources: cachedResources });
    }
    const resources = await Resource.find();
    cache.set(CACHE_KEY, resources, 60);
    res.json(resources);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Get a single resource by ID
export const getResourceById = async (req: Request, res: Response) => {
  const _id = req.params.id;

  try {
    const resource = await Resource.findById(_id);
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


export const getPaginatedAndSortedResources = async (req: Request, res: Response) => {
  try {
    const { page = '1', pageSize = '10', sortBy = 'createdAt', sortOrder = 'desc' } = req.query;
    const pageNumber = parseInt(String(page), 10);
    const limit = parseInt(String(pageSize), 10);

    if (isNaN(pageNumber) || isNaN(limit) || pageNumber < 1 || limit < 1) {
      return res.status(400).json({ message: 'Invalid query parameters' });
    }

    // Calculate skip value
    const skip = (pageNumber - 1) * limit;

    // Construct sorting object
    const sortOptions: { [key: string]: 'asc' | 'desc' } = {};
    sortOptions[sortBy as string] = sortOrder as 'asc' | 'desc';

    // Query the database to get paginated and sorted resources
    const resources: ResourceDocument[] = await Resource.find()
      .skip(skip)
      .limit(limit)
      .sort(sortOptions)
      .exec();

    // Calculate the total count of resources
    const totalCount: number = await Resource.countDocuments();

    res.status(200).json({ resources, totalCount });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
