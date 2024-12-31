import express from "express";
import sendResponse from "../helpers/sendResponse.js";
import jwt from "jsonwebtoken";
import "dotenv/config";
import User from "../models/User.js";
const router = express.Router();

export async function authenticateUser(req, res, next) {
  try {
    const bearerToken = req?.headers?.authorization;
    const token = bearerToken?.split(" ")[1];
    if (!token) return sendResponse(res, 403, null, true, "Token Not Found");
    const decoded = jwt.verify(token, process.env.AUTH_SECRET);
    if (decoded) {
      const user = await User.findById(decoded._id);
      if (!user)
        return sendResponse(res, 500, null, true, "Token not registered");
      req.user = decoded;
      next();
    } else {
      sendResponse(res, 403, null, true, "Token not found in DB");
    }
  } catch (err) {
    sendResponse(res, 404, null, true, err.message);
  }
}




export async function authenticateAdmin(req, res, next) {
  try {
    const bearerToken = req?.headers?.authorization;
    const token = bearerToken?.split(" ")[1];
    if (!token) return sendResponse(res, 403, null, true, "Token Not Found");
    const decoded = jwt.verify(token, process.env.AUTH_SECRET);
    if (decoded) {
      const user = await User.findById(decoded._id);
      if (!user)
        return sendResponse(res, 500, null, true, "Token not registered");
      req.user = decoded;
      next();
    } else {
      sendResponse(res, 403, null, true, "Token not found in DB");
    }
  } catch (err) {
    sendResponse(res, 404, null, true, err.message);
  }
}