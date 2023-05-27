import ErrorHandler from "../middleware/error.js";
import { task } from "../models/task.js";

export const newTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    await task.create({
      title,
      description,
      user: req.currUser,
    });
    res.status(201).json({
      success: true,
      message: "task is added successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const mytask = async (req, res, next) => {
  try {
    const user_id = req.currUser._id;

    const tasks = await task.find({ user: user_id });

    res.status(200).json({
      success: true,
      tasks,
    });
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const task = await task.findById(id);
    if (!task) return next(new ErrorHandler("Task not found", 404));
    task.isCompleted = !task.isCompleted;
    await task.save();
    res.status(200).json({
      success: true,
      message: "task is updated",
    });
  } catch (error) {
    next(error);
  }
};
export const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const task = await task.findById(id);
    if (!task) return next(new ErrorHandler("Task not found", 404));
    await task.deleteOne();
    res.status(200).json({
      success: true,
      message: "task is deleted",
    });
  } catch (error) {
    next(error);
  }
};
