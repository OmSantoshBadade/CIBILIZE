# Cloudinary Integration Setup Guide

## Overview

This guide explains how to set up Cloudinary for secure file uploads in the Cibilize expense tracker application. Cloudinary provides a comprehensive cloud-based solution for uploading, storing, managing, and delivering images, videos, and other file formats.

## Features

✅ **Multi-Format Support** - Upload PDF, CSV, Excel, Images, Word documents  
✅ **Cloud Storage** - Secure storage on Cloudinary's global CDN  
✅ **AI-Powered Processing** - Gemini AI extracts and categorizes expenses  
✅ **Progress Tracking** - Real-time upload progress and processing status  
✅ **File Management** - View, process, and delete uploaded files  
✅ **Database Integration** - Automatic syncing with expense records  
✅ **Automatic Optimization** - Images are automatically optimized for web delivery

## Setup Instructions

### 1. Create Cloudinary Account

1. Go to [Cloudinary.com](https://cloudinary.com/)
2. Sign up for a free account (generous free tier available)
3. Navigate to your Dashboard
4. Copy your Cloud Name, API Key, and API Secret

### 2. Configure Environment Variables

Add these variables to your `.env` file:

```env
# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret
CLOUDINARY_URL=cloudinary://your-api-key:your-api-secret@your-cloud-name
```

### 3. Database Schema

The database schema includes:

- `expense_files` table for tracking uploaded files
- `file_id` column in `expenses` table for linking expenses to files
- Proper indexes and foreign key relationships

### 4. API Endpoints

The following endpoints are available:

#### File Upload

- `POST /api/upload/upload` - Upload single file
- `POST /api/upload/upload-multiple` - Upload multiple files

#### File Management

- `GET /api/upload/files` - List user's uploaded files
- `GET /api/upload/files/:fileId` - Get file details
- `DELETE /api/upload/files/:fileId` - Delete a file

#### Processing

- `POST /api/expense-processing/process/:fileId` - Process file with AI
- `GET /api/expense-processing/status/:fileId` - Get processing status

### 5. Supported File Types

The system supports the following file formats:

#### Images

- **JPEG** (.jpg, .jpeg) - Photos, scanned receipts
- **PNG** (.png) - Screenshots, digital receipts

#### Documents

- **PDF** (.pdf) - Bank statements, invoices, receipts
- **CSV** (.csv) - Exported transaction data
- **Excel** (.xlsx, .xls) - Spreadsheet data
- **Word** (.doc, .docx) - Document files

#### File Limits

- **Maximum file size**: 10MB per file
- **Maximum files per upload**: 5 files (multiple upload)
- **Storage**: Unlimited with Cloudinary's free tier (up to usage limits)

## How It Works

### Upload Flow

1. **User selects file(s)** → Frontend validates file type and size
2. **File uploads to Cloudinary** → Secure cloud storage with automatic optimization
3. **File record saved** → Database entry created with Cloudinary metadata
4. **AI processing triggered** → Gemini AI extracts expenses from supported formats
5. **Expenses saved** → Categorized transactions added to database
6. **UI updates** → Real-time status updates and expense refresh

### AI Processing by File Type

#### PDF Files

- **Bank statements** - Extract transaction history
- **Receipts** - Parse merchant, amount, date
- **Invoices** - Extract billing information

#### CSV/Excel Files

- **Transaction exports** - Parse structured data
- **Expense reports** - Extract categorized expenses
- **Bank data** - Process exported account data

#### Image Files

- **Receipt photos** - OCR text extraction
- **Screenshots** - Parse digital receipts
- **Scanned documents** - Extract text and data

#### Word Documents

- **Expense reports** - Parse formatted expense data
- **Invoices** - Extract billing information

### Cloudinary Features Used

#### Storage & Organization

- **Folders** - Files organized in `cibilize-uploads/` folder
- **Public IDs** - Unique identifiers with user ID and timestamp
- **Metadata** - File information stored with each upload

#### Security

- **Signed uploads** - Secure upload process
- **Access control** - User-based file access
- **Auto-deletion** - Files removed when deleted from database

#### Optimization

- **Auto-format** - Automatic format optimization for images
- **Compression** - Reduced file sizes without quality loss
- **CDN delivery** - Fast global content delivery

## Configuration Options

### Upload Configuration

```javascript
// File type restrictions
const allowedTypes = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "application/pdf",
  "text/csv",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

// Upload options
const uploadOptions = {
  folder: "cibilize-uploads",
  resource_type: "auto",
  public_id: `${userId}_${timestamp}_${filename}`,
};
```

### Processing Configuration

The system automatically determines processing method based on file type:

- **PDF/Images**: OCR + text extraction
- **CSV/Excel**: Structured data parsing
- **Word**: Document text extraction

## Cloudinary Pricing

### Free Tier (Perfect for Development)

- **Storage**: 25GB
- **Bandwidth**: 25GB/month
- **Transformations**: 25,000/month
- **API calls**: Unlimited

### Paid Plans (Production)

- **Plus**: $89/month - 100GB storage, 100GB bandwidth
- **Advanced**: $224/month - 500GB storage, 500GB bandwidth
- **Custom**: Enterprise pricing available

## Security Features

- **Secure uploads** with signed URLs
- **User isolation** - Users can only access their own files
- **Automatic HTTPS** for all file URLs
- **Input validation** and sanitization
- **Rate limiting** on upload endpoints
- **File type validation** server-side

## Monitoring and Debugging

### Logs to Monitor

```bash
# Backend logs
✅ File uploaded to Cloudinary for user {userId}: {fileId}
🤖 Processing file with Gemini AI: {fileName}
✅ Gemini extracted {count} expenses
✅ Successfully processed {successCount}/{totalFound} expenses

# Error logs
❌ Cloudinary upload error: {error}
❌ Processing failed: {error}
🔄 Falling back to basic extraction
```

### Cloudinary Dashboard

Monitor usage in your Cloudinary dashboard:

- **Media Library** - View all uploaded files
- **Usage Analytics** - Track storage and bandwidth
- **Transformations** - Monitor image optimizations
- **API Logs** - Debug upload issues

## Development vs Production

### Development

- Use Cloudinary development environment
- Enable detailed logging and error messages
- Test with various file formats
- Monitor usage limits

### Production

- Use Cloudinary production environment
- Configure proper error handling and monitoring
- Set up backup and recovery procedures
- Monitor usage and costs
- Enable auto-optimization features

## Common Issues & Solutions

### Upload Failures

1. **File too large**: Check 10MB limit
2. **Invalid file type**: Verify supported formats
3. **Network issues**: Implement retry logic
4. **Cloudinary quota**: Check usage limits

### Processing Issues

1. **No expenses extracted**: File might not contain recognizable data
2. **OCR failures**: Image quality might be too low
3. **CSV parsing errors**: Check file format and encoding
4. **AI processing timeout**: Large files may need longer processing

### Performance Optimization

1. **Image compression**: Enable auto-optimization
2. **CDN delivery**: Use Cloudinary's global CDN
3. **Lazy loading**: Implement for file previews
4. **Caching**: Cache file metadata

## Migration from UploadThing

The migration includes:

1. **Removed UploadThing** dependencies and configuration
2. **Added Cloudinary** SDK and configuration
3. **Updated API endpoints** to use Cloudinary
4. **Enhanced file type support** beyond just PDF
5. **Improved error handling** and user feedback
6. **Better file management** with Cloudinary features

## Testing

### Test File Uploads

```bash
# Test single file upload
curl -X POST http://localhost:8000/api/upload/upload \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -F "file=@sample.pdf"

# Test multiple file upload
curl -X POST http://localhost:8000/api/upload/upload-multiple \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -F "files=@sample1.pdf" \
  -F "files=@sample2.csv"
```

### Test File Processing

```bash
# Process uploaded file
curl -X POST http://localhost:8000/api/expense-processing/process/FILE_ID \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"

# Check processing status
curl -X GET http://localhost:8000/api/expense-processing/status/FILE_ID \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## Next Steps

1. **Set up Cloudinary account** and configure environment variables
2. **Test file uploads** with different file types
3. **Monitor processing accuracy** and adjust AI prompts if needed
4. **Set up monitoring** for file uploads and processing
5. **Configure backup** strategies for important files
6. **Scale resources** as usage grows

## Support

For issues with:

- **Cloudinary**: Check their [documentation](https://cloudinary.com/documentation)
- **File processing**: Verify file formats and AI processing logs
- **Integration**: Check server logs and database records

The Cloudinary integration is now complete and ready for production use! 🚀

## Benefits Over UploadThing

✅ **More file formats** - Support for images, documents, spreadsheets  
✅ **Better performance** - Global CDN and automatic optimization  
✅ **More generous free tier** - 25GB vs 2GB storage  
✅ **Advanced features** - Image transformations, auto-optimization  
✅ **Better documentation** - Comprehensive guides and examples  
✅ **Enterprise ready** - Scalable infrastructure and support
