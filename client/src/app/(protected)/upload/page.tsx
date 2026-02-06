"use client";

import api from "@/lib/api";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Upload as UploadIcon,
  FileText,
  X,
  CheckCircle,
  AlertCircle,
  CloudUpload,
  FileUp,
  File,
  BarChart3,
  Shield,
  Loader2,
  FileSpreadsheet,
  Image as ImageIcon,
  FolderOpen,
  ArrowRight,
  Check,
  AlertTriangle,
  Lock,
  Brain,
} from "lucide-react";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState<"idle" | "success" | "error">("idle");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;

    if (selectedFile) {
      // Validate file type
      const allowedTypes = [
        'application/pdf',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'text/csv',
        'application/json',
        'image/jpeg',
        'image/png'
      ];

      if (!allowedTypes.includes(selectedFile.type)) {
        alert("Please upload a valid file type (PDF, Excel, CSV, JSON, or image)");
        return;
      }

      // Validate file size (10MB max)
      if (selectedFile.size > 10 * 1024 * 1024) {
        alert("File size must be less than 10MB");
        return;
      }

      setFile(selectedFile);
      setUploadStatus("idle");
      setUploadProgress(0);
    }
  };

  const upload = async () => {
    if (!file) {
      alert("Please select a file first");
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    try {
      const form = new FormData();
      form.append("file", file);

      // Simulate progress (in real app, use axios upload progress)
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      await api.post("/upload/", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      clearInterval(progressInterval);
      setUploadProgress(100);
      setUploadStatus("success");

      // Auto-redirect after 2 seconds
      setTimeout(() => {
        router.push("/analysis");
      }, 2000);

    } catch (error) {
      setUploadStatus("error");
      console.error("Upload failed:", error);
      alert("Upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      // Create a proper ChangeEvent for the file input
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(droppedFile);

      const syntheticEvent = {
        target: {
          files: dataTransfer.files
        }
      } as unknown as React.ChangeEvent<HTMLInputElement>;

      handleFileChange(syntheticEvent);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const getFileIcon = (fileType: string) => {
    if (fileType.includes('pdf')) {
      return <FileText className="w-6 h-6" />;
    } else if (fileType.includes('excel') || fileType.includes('spreadsheet')) {
      return <FileSpreadsheet className="w-6 h-6" />;
    } else if (fileType.includes('csv')) {
      return <BarChart3 className="w-6 h-6" />;
    } else if (fileType.includes('image')) {
      return <ImageIcon className="w-6 h-6" />;
    } else if (fileType.includes('json')) {
      return <FileText className="w-6 h-6" />;
    }
    return <File className="w-6 h-6" />;
  };

  const getFileColor = (fileType: string) => {
    if (fileType.includes('pdf')) return 'text-red-400';
    if (fileType.includes('excel') || fileType.includes('spreadsheet')) return 'text-green-400';
    if (fileType.includes('csv')) return 'text-blue-400';
    if (fileType.includes('image')) return 'text-purple-400';
    if (fileType.includes('json')) return 'text-yellow-400';
    return 'text-gray-400';
  };

  return (
    <div className="min-h-screen p-6 bg-linear-to-br from-gray-900 via-gray-900 to-gray-950">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-10 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-linear-to-br from-cyan-500/10 to-blue-500/10 rounded-xl">
              <UploadIcon className="w-8 h-8 text-cyan-400" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              Upload Financial Documents
            </h1>
          </div>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto flex items-center justify-center gap-2">
            Upload your financial statements, receipts, or reports for AI-powered analysis
          </p>
        </div>

        {/* Upload Area */}
        <div className="glass rounded-2xl p-8 border-2 border-dashed border-gray-800/50 hover:border-cyan-500/50 transition-all duration-300 mb-8 group">
          <div
            className={`relative ${!file ? 'cursor-pointer' : ''}`}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => !file && fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileChange}
              className="hidden"
              accept=".pdf,.xlsx,.xls,.csv,.json,.jpg,.jpeg,.png"
            />

            {!file ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 mx-auto mb-6 bg-linear-to-br from-cyan-500/10 to-blue-500/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <CloudUpload className="w-10 h-10 text-cyan-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2 flex items-center justify-center gap-2">
                  <FileUp className="w-5 h-5" />
                  Drag & Drop your file here
                </h3>
                <p className="text-gray-400 mb-4">or click to browse files</p>
                <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
                  <Check className="w-4 h-4" />
                  Supports: PDF, Excel, CSV, JSON, Images (max 10MB)
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* File Preview */}
                <div className="flex items-center justify-between p-4 bg-gray-900/50 rounded-xl group/file">
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 bg-linear-to-br from-cyan-500/10 to-blue-500/10 rounded-lg ${getFileColor(file.type)}`}>
                      {getFileIcon(file.type)}
                    </div>
                    <div>
                      <p className="text-white font-medium truncate max-w-xs group-hover/file:text-cyan-300 transition-colors">{file.name}</p>
                      <p className="text-gray-400 text-sm flex items-center gap-2">
                        {formatFileSize(file.size)} • {file.type.split('/').pop()?.toUpperCase()}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setFile(null);
                      if (fileInputRef.current) fileInputRef.current.value = "";
                    }}
                    className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors duration-200 group/delete"
                  >
                    <X className="w-5 h-5 group-hover/delete:rotate-90 transition-transform" />
                  </button>
                </div>

                {/* Upload Progress */}
                {isUploading && (
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm items-center">
                      <span className="text-gray-300 flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Uploading...
                      </span>
                      <span className="text-cyan-400 font-medium">{uploadProgress}%</span>
                    </div>
                    <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-linear-to-r from-cyan-500 to-blue-500 transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                {/* Success Message */}
                {uploadStatus === "success" && (
                  <div className="p-4 bg-linear-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-green-400 font-medium flex items-center gap-2">
                          Upload Successful!
                          <ArrowRight className="w-4 h-4 animate-pulse" />
                        </p>
                        <p className="text-green-300/70 text-sm">Redirecting to analysis...</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Error Message */}
                {uploadStatus === "error" && (
                  <div className="p-4 bg-linear-to-r from-red-500/10 to-pink-500/10 border border-red-500/30 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                        <AlertCircle className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-red-400 font-medium">Upload Failed</p>
                        <p className="text-red-300/70 text-sm">Please try again or check your file</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={upload}
            disabled={!file || isUploading || uploadStatus === "success"}
            className="px-8 py-3.5 bg-linear-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-cyan-500/30 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-lg group relative overflow-hidden w-full sm:w-auto"
          >
            <div className="absolute inset-0 bg-linear-to-r from-cyan-500/0 via-white/20 to-cyan-500/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            <span className="relative flex items-center justify-center gap-2">
              {isUploading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Brain className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  Upload & Analyze
                </>
              )}
            </span>
          </button>

          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-8 py-3.5 backdrop-blur-md bg-white/5 border border-white/10 text-cyan-400 hover:text-white hover:border-cyan-500/50 font-semibold rounded-xl hover:shadow-glow hover:shadow-cyan-500/30 transition-all duration-300 w-full sm:w-auto flex items-center justify-center gap-2 group"
            disabled={isUploading}
          >
            <FolderOpen className="w-5 h-5 group-hover:scale-110 transition-transform" />
            Choose Different File
          </button>
        </div>

        {/* File Requirements */}
        <div className="mt-12 glass rounded-2xl p-6 border border-gray-800/50">
          <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
            Supported Documents & Features
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-3 group">
                <div className="w-10 h-10 bg-linear-to-br from-red-500/10 to-orange-500/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <FileText className="w-5 h-5 text-red-400" />
                </div>
                <div>
                  <p className="text-white font-medium group-hover:text-red-300 transition-colors">Financial Statements</p>
                  <p className="text-gray-400 text-sm">Balance sheets, income statements, cash flow statements</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 group">
                <div className="w-10 h-10 bg-linear-to-br from-green-500/10 to-emerald-500/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <FileSpreadsheet className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <p className="text-white font-medium group-hover:text-green-300 transition-colors">Excel & CSV Files</p>
                  <p className="text-gray-400 text-sm">Transaction data, expense reports, financial models</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 group">
                <div className="w-10 h-10 bg-linear-to-br from-purple-500/10 to-pink-500/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <ImageIcon className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <p className="text-white font-medium group-hover:text-purple-300 transition-colors">Invoices & Receipts</p>
                  <p className="text-gray-400 text-sm">PDF or image formats for expense tracking</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 group">
                <div className="w-10 h-10 bg-linear-to-br from-cyan-500/10 to-blue-500/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Shield className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <p className="text-white font-medium group-hover:text-cyan-300 transition-colors">Secure & Private</p>
                  <p className="text-gray-400 text-sm">Encryption and access controls</p>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Features */}
          <div className="mt-8 pt-6 border-t border-gray-800/50">
            <h4 className="text-white font-medium mb-4 flex items-center gap-2">
              AI-Powered Analysis Features
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-900/50 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 bg-linear-to-br from-cyan-500/20 to-blue-500/20 rounded flex items-center justify-center">
                    <BarChart3 className="w-3 h-3 text-cyan-400" />
                  </div>
                  <span className="text-white text-sm font-medium">Trend Analysis</span>
                </div>
                <p className="text-gray-400 text-xs">Identify financial patterns and trends</p>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 bg-linear-to-br from-purple-500/20 to-pink-500/20 rounded flex items-center justify-center">
                    <AlertTriangle className="w-3 h-3 text-purple-400" />
                  </div>
                  <span className="text-white text-sm font-medium">Risk Detection</span>
                </div>
                <p className="text-gray-400 text-xs">Spot potential financial risks early</p>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 bg-linear-to-br from-green-500/20 to-emerald-500/20 rounded flex items-center justify-center">
                    <CheckCircle className="w-3 h-3 text-green-400" />
                  </div>
                  <span className="text-white text-sm font-medium">Optimization Tips</span>
                </div>
                <p className="text-gray-400 text-xs">Get personalized improvement suggestions</p>
              </div>
            </div>
          </div>
        </div>

        {/* Upload Tips */}
        <div className="mt-6 text-center">
          <p className="text-gray-500 text-sm flex items-center justify-center gap-2">
            <Lock className="w-4 h-4" />
            Your files are processed securely and automatically deleted after analysis
          </p>
        </div>
      </div>
    </div>
  );
}