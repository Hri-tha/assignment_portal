const express = require('express');
const { uploadAssignment, viewAssignments, updateAssignmentStatus } = require('../controllers/assignmentController');
const verifyToken = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/upload', verifyToken, uploadAssignment);
router.get('/assignments', verifyToken, viewAssignments);
router.post('/assignments/:id/:status', verifyToken, updateAssignmentStatus);

module.exports = router;
