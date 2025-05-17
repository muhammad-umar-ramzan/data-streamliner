'use client';
import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiUpload, FiDownload, FiFile, FiX, FiCheckCircle } from 'react-icons/fi';
import { FaFileCsv, FaFileExcel } from 'react-icons/fa';

export default function ReportSection() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [downloadLink, setDownloadLink] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (validateFile(file)) {
      setSelectedFile(file);
      setDownloadLink(null);
    }
  };

  const validateFile = (file) => {
    if (!file) return false;
    const validTypes = ['text/csv', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
    const validExtensions = ['.csv', '.xls', '.xlsx'];
    return validTypes.includes(file.type) || 
           validExtensions.some(ext => file.name.toLowerCase().endsWith(ext));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (validateFile(file)) {
      setSelectedFile(file);
      setDownloadLink(null);
      // Reset file input to allow re-selection of same file
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    setDownloadLink(null);
    // Reset file input to allow re-selection of same file
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const generateReport = async () => {
    if (!selectedFile) return;

    setIsGenerating(true);
    setDownloadLink(null);

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);

      const response = await fetch('http://localhost:5000/upload_csv', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Failed to generate report');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      setDownloadLink(url);
    } catch (error) {
      console.error('Error generating report:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-10 ">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl font-bold text-purple-800 mb-2 flex items-center justify-center gap-2">
            <motion.span
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
            >
              <FiFile className="text-purple-800" />
            </motion.span>
            Data Report Generator
            <motion.span
              animate={{ rotate: [0, -10, 10, 0] }}
              transition={{ repeat: Infinity, duration: 3, delay: 0.5 }}
            >
              <FiFile className="text-purple-800" />
            </motion.span>
          </h2>
          <p className="text-black">Upload your CSV or Excel file to generate a report</p>
        </motion.div>

        {/* Form Card */}
        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          className="bg-white p-6 rounded-2xl shadow-lg border border-purple-200"
        >
          {/* Drag and Drop Area */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={triggerFileInput}
            className={`border-2 border-dashed rounded-xl p-6 mb-4 text-center transition-all cursor-pointer ${
              isDragging 
                ? 'border-purple-500 bg-purple-50' 
                : 'border-gray-300 hover:border-purple-400 hover:bg-purple-50'
            }`}
          >
            <div className="flex flex-col items-center justify-center">
              <FiUpload className="w-8 h-8 mb-3 text-purple-500" />
              <p className="text-gray-700 mb-1">
                Drag & drop your file here
              </p>
              <p className="text-sm text-gray-500 mb-3">or</p>
              <div className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors">
                Browse Files
              </div>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              accept=".csv,.xlsx,.xls"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          {/* Selected File */}
          <AnimatePresence>
            {selectedFile && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="flex items-center justify-between bg-purple-50 rounded-lg p-3 mb-4 border border-purple-200">
                  <div className="flex items-center gap-2">
                    {selectedFile.name.endsWith('.csv') ? (
                      <FaFileCsv className="text-purple-600 text-xl" />
                    ) : (
                      <FaFileExcel className="text-green-600 text-xl" />
                    )}
                    <span className="text-purple-800 truncate max-w-xs">
                      {selectedFile.name}
                    </span>
                  </div>
                  <button
                    onClick={removeFile}
                    className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50 transition-colors"
                  >
                    <FiX className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Generate Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={generateReport}
            disabled={!selectedFile || isGenerating}
            className={`w-full py-3 px-4 rounded-lg font-medium flex items-center justify-center gap-2 transition-all ${
              !selectedFile || isGenerating
                ? 'bg-gray-300 cursor-not-allowed text-gray-500'
                : 'bg-purple-600 hover:bg-purple-700 text-white'
            } shadow-md`}
          >
            {isGenerating ? (
              <>
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="inline-block"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </motion.span>
                Generating...
              </>
            ) : (
              <>
                <FiCheckCircle className="w-5 h-5" />
                Generate Report
              </>
            )}
          </motion.button>

          {/* Download Link */}
          <AnimatePresence>
            {downloadLink && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 flex justify-center"
              >
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href={downloadLink}
                  download="Data_Report.pdf"
                  className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <FiDownload className="w-5 h-5" />
                  Download Report
                </motion.a>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </div>
  );
}