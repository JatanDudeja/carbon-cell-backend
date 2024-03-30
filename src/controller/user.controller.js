import User from "../model/user.model.js";

const generateAccessTokenAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId); // get user from db

    const accessToken = await user.generateAccessToken(); // create access token for the user based on _id and username
    const refreshToken = await user.generateRefreshToken(); // create refresh token for the user based on _id and username

    return {
      accessToken,
      refreshToken,
    };
  } catch (error) {
    console.log("accesstoken generation error");
    throw error;
  }
};

const registerUser = async (req, res) => {
  const { username, password } = req.body;

  if (username.trim() === "" || password.trim() === "") {
    return res.status(400).send({
      statusCode: 400,
      error: "Username or password cannot be empty",
    });
  }

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(409).json({
        statusCode: 409,
        message: `A user with the username '${username}' already exists.`,
      });
    }

    // Create a new user
    const newUser = await User.create({ username, password });

    // Fetch the created user data excluding sensitive information
    const createdUserData = await User.findById(newUser._id).select(
      "-password -refreshToken"
    );

    // Respond with success status and user data
    return res.status(201).json({ statusCode: 201, data: createdUserData });
  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).json({
      statusCode: 500,
      message: "An error occurred while registering the user.",
    });
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  if (username.trim() === "" || password.trim() === "") {
    return res.status(400).send({
      statusCode: 400,
      error: "Username or Password can not be empty",
    });
  }

  const user = await User.findOne({ username });

  if (!user) {
    res.status(404).send("User Not Found");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    return res.status(401).send({
      statusCode: 401,
      message: "Incorrect Email or Password",
    });
  }

  const { accessToken, refreshToken } =
    await generateAccessTokenAndRefreshToken(user?._id);

  const loggedInUser = await User.findById(user?._id).select(
    "-password -refreshToken"
  );

  const cookieOptions = {
    httpOnly: true, // use true here after testing
    secure: true, // use true here as well after testing
  };

  res
    .status(200)
    .cookie("accessToken", accessToken, cookieOptions)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .send({
      statusCode: 200,
      data: {
        user: loggedInUser,
        accessToken,
        refreshToken,
      },
      message: "Logged In Successfully",
    });
};

const logoutUser = async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: undefined,
      },
    },
    {
      new: true, // the new updated value of this field gets returned.
    }
  );

  const cookieOptions = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", cookieOptions)
    .clearCookie("refreshToken", cookieOptions)
    .send({statusCode : 200, message : "User logged out successfully."});
};

export { registerUser, loginUser, logoutUser };
