import { asynchandler } from "../utills/asynchandler.js";
import { ApiError } from "../utills/ApiError.js";
import { StudentAuth } from "../models/studentAuth.model.js";
import { ApiResponse } from "../utills/ApiResponse.js";

const registerStudent = asynchandler(async (req, res) => {
  const { fullName, email, username, password } = req.body

  if (
    [fullName, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }
    
  const existedStudent = await StudentAuth.findOne({
      $or:[{username},{email}]
    })

    if (existedStudent) {
      throw new ApiError(409,"Student with email or username already exists")
    }

    const student = await StudentAuth.create({
            fullName,
            email,
            password,
            username:username.toLowerCase()
    })

    const createdStudent = await StudentAuth.findById(student._id).select(
      "-password -refreshToken"
    )
     
    if (!createdStudent) {
          throw new ApiError(500, "Something went wrong while registering the user");
    }

    return res.status(201).json(
      new ApiResponse(200, createdStudent,"Student registered successfully")
    )


});


export {registerStudent}