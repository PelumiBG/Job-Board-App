import User from '../models/user.js';

// Admin get all candidate
export const getAllcandidate = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Admin delete candidate
export const deleteCandidate = async (req, res) => {
  try {
    const { id } = req.params;

    //Validate ID before using it
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid User ID" });
    }

    const user = await Candidate.findById(id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    await user.deleteOne();
    res.status(200).json({ success: true, message: "User deleted successfully" });
    console.log(`User with ID ${id} deleted.`);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};