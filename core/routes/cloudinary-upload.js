import express from "express";
import {
  cloudinary,
  uploadSingle,
  uploadMultiple,
} from "../config/cloudinary.js";
import { ExpenseFileModel } from "../db.js";
import { authenticateToken } from "../middleware/auth.js";
import { sanitizeInput, uploadLimiter } from "../middleware/security.js";

const router = express.Router();

// Helper function to upload buffer to Cloudinary
const uploadToCloudinary = (buffer, options = {}) => {
  return new Promise((resolve, reject) => {
    const uploadOptions = {
      folder: "cibilize-uploads",
      resource_type: "auto",
      ...options,
    };

    cloudinary.uploader
      .upload_stream(uploadOptions, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      })
      .end(buffer);
  });
};

// Single file upload endpoint
router.post(
  "/upload",
  uploadLimiter,
  authenticateToken,
  uploadSingle,
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          error: "No file uploaded",
          message: "Please select a file to upload",
        });
      }

      const timestamp = Date.now();
      const originalName = req.file.originalname.split(".")[0];
      const publicId = `${req.user.id}_${timestamp}_${originalName}`;

      // Upload to Cloudinary
      const result = await uploadToCloudinary(req.file.buffer, {
        public_id: publicId,
        resource_type: "auto",
      });

      // Save file record to database
      const fileRecord = await ExpenseFileModel.create({
        userId: req.user.id,
        fileKey: result.public_id,
        fileName: req.file.originalname,
        fileUrl: result.secure_url,
        fileSize: result.bytes,
        mimeType: req.file.mimetype,
      });

      console.log(
        `✅ File uploaded to Cloudinary for user ${req.user.id}:`,
        fileRecord.id,
      );

      res.json({
        success: true,
        fileId: fileRecord.id,
        message: "File uploaded successfully",
        file: {
          id: fileRecord.id,
          fileName: req.file.originalname,
          fileUrl: result.secure_url,
          fileSize: result.bytes,
          mimeType: req.file.mimetype,
          publicId: result.public_id,
        },
      });
    } catch (error) {
      console.error("Cloudinary upload error:", error);
      res.status(500).json({
        error: "Upload failed",
        message: error.message || "Failed to upload file",
      });
    }
  },
);

// Multiple files upload endpoint
router.post(
  "/upload-multiple",
  uploadLimiter,
  authenticateToken,
  uploadMultiple,
  async (req, res) => {
    try {
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({
          error: "No files uploaded",
          message: "Please select files to upload",
        });
      }

      const uploadPromises = req.files.map(async (file) => {
        const timestamp = Date.now();
        const originalName = file.originalname.split(".")[0];
        const publicId = `${req.user.id}_${timestamp}_${originalName}`;

        // Upload to Cloudinary
        const result = await uploadToCloudinary(file.buffer, {
          public_id: publicId,
          resource_type: "auto",
        });

        // Save file record to database
        const fileRecord = await ExpenseFileModel.create({
          userId: req.user.id,
          fileKey: result.public_id,
          fileName: file.originalname,
          fileUrl: result.secure_url,
          fileSize: result.bytes,
          mimeType: file.mimetype,
        });

        return {
          id: fileRecord.id,
          fileName: file.originalname,
          fileUrl: result.secure_url,
          fileSize: result.bytes,
          mimeType: file.mimetype,
          publicId: result.public_id,
        };
      });

      const uploadedFiles = await Promise.all(uploadPromises);

      console.log(
        `✅ ${uploadedFiles.length} files uploaded to Cloudinary for user ${req.user.id}`,
      );

      res.json({
        success: true,
        message: `${uploadedFiles.length} files uploaded successfully`,
        files: uploadedFiles,
      });
    } catch (error) {
      console.error("Cloudinary multiple upload error:", error);
      res.status(500).json({
        error: "Upload failed",
        message: error.message || "Failed to upload files",
      });
    }
  },
);

// Get user's uploaded files
router.get("/files", authenticateToken, async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;

    const files = await ExpenseFileModel.findByUserId(req.user.id, {
      limit: parseInt(limit),
      offset,
    });

    res.json({
      files,
      pagination: {
        currentPage: parseInt(page),
        itemsPerPage: parseInt(limit),
      },
    });
  } catch (error) {
    console.error("Error fetching files:", error);
    res.status(500).json({
      error: "Failed to fetch files",
      message: "Internal server error",
    });
  }
});

// Delete file from Cloudinary and database
router.delete("/files/:fileId", authenticateToken, async (req, res) => {
  try {
    const { fileId } = req.params;

    // Get file record
    const file = await ExpenseFileModel.findById(fileId);

    if (!file) {
      return res.status(404).json({
        error: "File not found",
        message: "The specified file could not be found",
      });
    }

    if (file.user_id !== req.user.id) {
      return res.status(403).json({
        error: "Access denied",
        message: "You don't have permission to delete this file",
      });
    }

    // Delete from Cloudinary
    try {
      await cloudinary.uploader.destroy(file.file_key, {
        resource_type: "auto",
      });
      console.log(`✅ File deleted from Cloudinary: ${file.file_key}`);
    } catch (cloudinaryError) {
      console.warn(
        "Warning: Failed to delete from Cloudinary:",
        cloudinaryError.message,
      );
      // Continue with database deletion even if Cloudinary deletion fails
    }

    // Delete from database
    const deleted = await ExpenseFileModel.delete(fileId, req.user.id);

    if (!deleted) {
      return res.status(404).json({
        error: "File not found",
        message: "File not found or you don't have permission to delete it",
      });
    }

    res.json({
      message: "File deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting file:", error);
    res.status(500).json({
      error: "Failed to delete file",
      message: "Internal server error",
    });
  }
});

// Get file details by ID
router.get("/files/:fileId", authenticateToken, async (req, res) => {
  try {
    const { fileId } = req.params;

    const file = await ExpenseFileModel.findById(fileId);

    if (!file) {
      return res.status(404).json({
        error: "File not found",
        message: "The specified file could not be found",
      });
    }

    if (file.user_id !== req.user.id) {
      return res.status(403).json({
        error: "Access denied",
        message: "You don't have permission to view this file",
      });
    }

    res.json({
      file: {
        id: file.id,
        fileName: file.file_name,
        fileUrl: file.file_url,
        fileSize: file.file_size,
        mimeType: file.mime_type,
        uploadStatus: file.upload_status,
        processingStatus: file.processing_status,
        extractedExpensesCount: file.extracted_expenses_count,
        processingError: file.processing_error,
        processedAt: file.processed_at,
        createdAt: file.created_at,
        updatedAt: file.updated_at,
      },
    });
  } catch (error) {
    console.error("Error fetching file details:", error);
    res.status(500).json({
      error: "Failed to fetch file details",
      message: "Internal server error",
    });
  }
});

export default router;
