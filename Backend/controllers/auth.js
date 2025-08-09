const User = require("../models/User");
const { generateAuthToken } = require("../middleware/authMiddleware");
const bcrypt = require("bcryptjs");

const dashboard = async (req, res) => {
  const { email, password } = req.body;

  try {
    const findUser = await User.findOne({ email });

    if (!findUser) {
      return res.status(404).json({ message: "Email not found." });
    }

    const isMatch = await bcrypt.compare(password, findUser.password);
    if (!isMatch && findUser.password !== password) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const { role: userRoles, username, _id } = findUser;
    let url = "";

    if (userRoles.length === 1 && userRoles.includes("user")) {
      return res.status(403).json({
        message: "Access denied.",
      });
    }

    if (userRoles.includes("admin")) {
      url = `${process.env.FRONTEND_URL}/admin`;
    } else {
      return res.status(403).json({
        message: "Access denied.",
      });
    }

    const token = await generateAuthToken(findUser);

    return res.status(200).json({
      message: `Redirecting to ${url}`,
      url,
      role: userRoles,
      username,
      id: _id,
      token,
    });
  } catch (error) {
    console.error("Error during dashboard redirection:", error);
    return res.status(500).json({
      error: "An error occurred during dashboard access. Please try again.",
    });
  }
};

const Sign = async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: "Please enter all fields" });
  }

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user = new User({
      username: name,
      email,
      password: hashedPassword,
      role,
    });

    await user.save();

    const token = await generateAuthToken(user);
    return res.status(200).json({ message: "Sign in successful", token, user });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const getMyProfile = async (req, res) => {
  if (!req.user || !req.user.id) {
    return res
      .status(401)
      .json({ message: "Not authorized, no user ID in token." });
  }

  try {
    const userId = req.user.id;

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    let userData = {
      _id: user._id,
      username: user.username,
      email: user.email,
      roles: user.role,
    };

    return res.status(200).json({
      message: "User profile fetched successfully.",
      userData: userData,
    });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while fetching profile." });
  }
};

const getProfile = async (req, res) => {
  if (req.user) {
    return res.status(200).json(req.user);
  } else {
    return res.status(400).json({ message: "Authoriztion no Token is Valid" });
  }
};

module.exports = { dashboard, Sign, getMyProfile, getProfile };
