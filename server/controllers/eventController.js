import Event from '../models/Event.js';

// @desc    Get all events
// @route   GET /api/events
// @access  Public
export const getEvents = async (req, res) => {
  try {
    const events = await Event.find().populate('creator', 'name email');
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single event
// @route   GET /api/events/:id
// @access  Public
export const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate('creator', 'name email')
      .populate('participants', 'name email');

    if (event) {
      res.json(event);
    } else {
      res.status(404).json({ message: 'Event not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create new event
// @route   POST /api/events
// @access  Private
export const createEvent = async (req, res) => {
  try {
    const { title, description, date, location, category, maxParticipants, banner } = req.body;

    const event = new Event({
      title,
      description,
      date,
      location,
      category,
      maxParticipants,
      banner,
      creator: req.user._id,
    });

    const createdEvent = await event.save();
    res.status(201).json(createdEvent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update an event
// @route   PUT /api/events/:id
// @access  Private
export const updateEvent = async (req, res) => {
  try {
    const { title, description, date, location, category, maxParticipants, banner } = req.body;

    const event = await Event.findById(req.params.id);

    if (event) {
      // Check if user is the creator
      if (event.creator.toString() !== req.user._id.toString()) {
        return res.status(401).json({ message: 'User not authorized to update this event' });
      }

      event.title = title || event.title;
      event.description = description || event.description;
      event.date = date || event.date;
      event.location = location || event.location;
      event.category = category || event.category;
      event.maxParticipants = maxParticipants || event.maxParticipants;
      event.banner = banner || event.banner;

      const updatedEvent = await event.save();
      res.json(updatedEvent);
    } else {
      res.status(404).json({ message: 'Event not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete an event
// @route   DELETE /api/events/:id
// @access  Private
export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (event) {
      if (event.creator.toString() !== req.user._id.toString()) {
        return res.status(401).json({ message: 'User not authorized to delete this event' });
      }
      
      await Event.deleteOne({ _id: event._id });
      res.json({ message: 'Event removed' });
    } else {
      res.status(404).json({ message: 'Event not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Join an event
// @route   POST /api/events/:id/join
// @access  Private
export const joinEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (event) {
      if (event.participants.includes(req.user._id)) {
        return res.status(400).json({ message: 'You have already joined this event' });
      }

      if (event.maxParticipants && event.participants.length >= event.maxParticipants) {
        return res.status(400).json({ message: 'Event has reached maximum participants' });
      }

      event.participants.push(req.user._id);
      await event.save();
      res.json({ message: 'Successfully joined the event' });
    } else {
      res.status(404).json({ message: 'Event not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Leave an event
// @route   POST /api/events/:id/leave
// @access  Private
export const leaveEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (event) {
      if (!event.participants.includes(req.user._id)) {
        return res.status(400).json({ message: 'You have not joined this event' });
      }

      event.participants = event.participants.filter(
        (p) => p.toString() !== req.user._id.toString()
      );
      await event.save();
      res.json({ message: 'Successfully left the event' });
    } else {
      res.status(404).json({ message: 'Event not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user's dashboard events (created and joined)
// @route   GET /api/events/user/dashboard
// @access  Private
export const getUserDashboardEvents = async (req, res) => {
  try {
    const createdEvents = await Event.find({ creator: req.user._id });
    const joinedEvents = await Event.find({ participants: req.user._id });
    
    res.json({
      createdEvents,
      joinedEvents
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
