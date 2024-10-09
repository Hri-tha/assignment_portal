const Assignment = require('../models/assignmentModel');

// Upload Assignment
exports.uploadAssignment = async (req, res) => {
  const { task, adminId } = req.body;
  const newAssignment = new Assignment({
    userId: req.user.id,
    task,
    admin: adminId
  });
  await newAssignment.save();
  res.json({ message: 'Assignment uploaded successfully' });
};

// View Admin Assignments
exports.viewAssignments = async (req, res) => {
  const assignments = await Assignment.find({ admin: req.user.id }).populate('userId', 'username');
  res.json(assignments);
};

// Accept/Reject Assignment
exports.updateAssignmentStatus = async (req, res) => {
  const { status } = req.body;  // Either 'accepted' or 'rejected'
  const assignment = await Assignment.findById(req.params.id);
  
  if (!assignment) return res.status(404).json({ message: 'Assignment not found' });

  assignment.status = status;
  await assignment.save();
  
  res.json({ message: `Assignment ${status}` });
};
