import project from "../models/project.model.js";
import projectModel from "../models/project.model.js";
import mongoose from "mongoose";

export const createProject = async ({ name, userId }) => {
  if (!name) {
    throw new Error("Name is required");
  }
  if (!userId) {
    throw new Error("User ID is required");
  }

  let project;
  try {
    project = await projectModel.create({
      name,
      users: [userId],
    });
  } catch (error) {
    if (error.code === 11000) {
      throw new Error("Project name already exists");
    }
    throw error;
  }

  return project;
};

export const getAllProjectByUserId = async ({ userId }) => {
  if (!userId) {
    throw new Error("userid is required");
  }

  const allUserProjects = await projectModel.find({
    users: userId,
  });
  return allUserProjects;
};

export const addUsersToProject = async ({ projectId, users, userId }) => {
    // Validate projectId
    if (!projectId) {
      throw new Error("project id is required");
    }
    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      throw new Error("invalid project id");
    }
  
    // Validate users array
    if (!users) {
      throw new Error("user id is required");
    }
    if (
      !Array.isArray(users) ||
      users.some((userId) => !mongoose.Types.ObjectId.isValid(userId))
    ) {
      throw new Error("invalid userId(s) in users array");
    }
  
    // Validate userId
    if (!userId) {
      throw new Error("userId id is required");
    }
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new Error("invalid userId");
    }
  
    // Check if the user belongs to the project
    const project = await projectModel.findOne({
      _id: projectId,
      users: userId,
    });
  
    if (!project) {
      throw new Error("user does not belong to this project");
    }
  
    // Update the project by adding new users
    const updatedProject = await projectModel.findOneAndUpdate(
      { _id: projectId },
      {
        $addToSet: { users: { $each: users } }, // Correct usage of $each
      },
      { new: true }
    );
  
    return updatedProject;
  };

  export const getProjectById = async ({ projectId }) => {
    if (!projectId) {
      throw new Error("Project ID is required");
    }
    
    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      throw new Error("Invalid project ID");
    }
  
    const project = await projectModel.findOne({ _id: projectId }).populate('users');
  
    return project;
  };
 