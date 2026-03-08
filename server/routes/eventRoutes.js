import express from 'express';
import {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  joinEvent,
  leaveEvent,
  getUserDashboardEvents
} from '../controllers/eventController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.route('/').get(getEvents).post(protect, createEvent);
router.route('/user/dashboard').get(protect, getUserDashboardEvents);
router.route('/:id').get(getEventById).put(protect, updateEvent).delete(protect, deleteEvent);
router.route('/:id/join').post(protect, joinEvent);
router.route('/:id/leave').post(protect, leaveEvent);

export default router;
