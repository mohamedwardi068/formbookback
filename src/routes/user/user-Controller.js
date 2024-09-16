const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Client = require('../../models/user/client'); 

// Environment variable for JWT secret
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Helper function to generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET, { expiresIn: '1h' });
};

const signup = async (req, res) => {
  try {
    const { firstName, lastName, email, phonenumber, password, address } = req.body;

    // Check if email already exists
    const existingClient = await Client.findOne({ email });
    if (existingClient) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new client with the updated schema fields
    const newClient = new Client({
      firstName,
      lastName,
      email,
      phonenumber,
      password: hashedPassword,
      address // This can be optional
    });

    await newClient.save();

    // Generate JWT token
    const token = generateToken(newClient._id);

    res.status(201).json({ token, client: newClient });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if client exists
    const client = await Client.findOne({ email });
    if (!client) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Compare provided password with stored hashed password
    const isMatch = await bcrypt.compare(password, client.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = generateToken(client._id);

    res.status(200).json({ token, client });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const updatePassword = async (req, res) => {
  try {
    const { email, oldPassword, newPassword } = req.body;

    // Find client by email
    const client = await Client.findOne({ email });
    if (!client) {
      return res.status(400).json({ message: 'Client not found' });
    }

    // Compare old password
    const isMatch = await bcrypt.compare(oldPassword, client.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Old password is incorrect' });
    }

    // Hash the new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Update the password
    client.password = hashedNewPassword;
    await client.save();

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  signup,
  login,
  updatePassword
};
