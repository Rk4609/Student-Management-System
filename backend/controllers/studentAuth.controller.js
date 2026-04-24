import { asynchandler } from "../utills/asyncHandler.js";
import { ApiError } from "../utills/ApiError.js";
import { StudentAuth } from "../models/studentAuth.model.js";
import { ApiResponse } from "../utills/ApiResponse.js";

const generateAccessTokenandRefreshToken = async (studentId) => {
  try {
    const student = await StudentAuth.findById(studentId);
    const accessToken = student.generateAccessToken();
    const refreshToken = student.generateRefreshToken();

    student.refreshToken = refreshToken;
    await student.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    console.log("Errors", error);
    throw new ApiError(
      500,
      "Something went wrong generating refreshToken and accessToken"
    );
  }
};

const registerStudent = asynchandler(async (req, res) => {
  const { fullName, email, password } = req.body;

  if (
    [fullName, email, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const existedStudent = await StudentAuth.findOne({
    $or: [ { email }],
  });

  if (existedStudent) {
    throw new ApiError(409, "Student with email  already exists");
  }

  const student = await StudentAuth.create({
    fullName,
    email,
    password,
  });

  const createdStudent = await StudentAuth.findById(student._id).select(
    "-password -refreshToken"
  );

  if (!createdStudent) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  return res
    .status(201)
    .json(
      new ApiResponse(200, createdStudent, "Student registered successfully")
    );
});

const loginStudent = asynchandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "Email or password is required");
  }

  const student =await StudentAuth.findOne({
    $or: [{ email }],
  });

  if (!student) {
    throw new ApiError(404, "Student is not Found");
  }

  const isValidPassword = await student.isPasswordCorrect(password);
  if (!isValidPassword) {
    throw new ApiError(401, "Envalid credentials");
  }

  const { accessToken, refreshToken } = generateAccessTokenandRefreshToken(
    student._id
  );

  const loggedInStudent = await StudentAuth.findById(student._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        201,
        {
          student: loggedInStudent,
          accessToken,
          refreshToken,
        },
        "Student logged in successfully"
      )
    );
});

export { registerStudent,loginStudent };
