'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileBarChart2, Sparkles, Upload, Download, FileCheck, X } from 'lucide-react';

export default function FileUploadAndCleanedDatasetSection() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [cleanedFile, setCleanedFile] = useState('');
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [uploaded, setUploaded] = useState(false);
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [fileName, setFileName] = useState('');

  const [learningType, setLearningType] = useState('');
  const [modelTask, setModelTask] = useState('');
  const [targetColumn, setTargetColumn] = useState('');

  const resetForm = () => {
    setFile(null);
    setFileName('');
    setLearningType('');
    setModelTask('');
    setTargetColumn('');
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setFileName(selectedFile ? selectedFile.name : '');
  };

  const handleRemoveFile = () => {
    setFile(null);
    setFileName('');
  };

  const handleUpload = async () => {
    setMessage({ text: '', type: '' });
    setCleanedFile('');
    setError('');

    if (!file) return setMessage({ text: 'Please select a file.', type: 'error' });
    if (!learningType) return setMessage({ text: 'Please select a learning type.', type: 'error' });
    if (learningType === 'supervised') {
      if (!modelTask) return setMessage({ text: 'Please select a model task.', type: 'error' });
      if (!targetColumn) return setMessage({ text: 'Please enter a target column.', type: 'error' });
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('learningType', learningType);
      if (learningType === 'supervised') {
        formData.append('modelTask', modelTask);
        formData.append('targetColumn', targetColumn);
      }

      const res = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (data.error) {
        setMessage({ text: data.error, type: 'error' });
        return;
      }

      setMessage({ text: data.message || 'File uploaded and cleaned successfully!', type: 'success' });
      setCleanedFile(data.cleaned_filename || '');
      setUploaded(true);
      setIsFileUploaded(true);
      
      // Reset form fields after successful upload
      resetForm();

      // Clear success message after 2 seconds
      const timer = setTimeout(() => {
        setMessage({ text: '', type: '' });
      }, 2000);

      return () => clearTimeout(timer);
    } catch (error) {
      setMessage({ text: 'Upload failed. Please try again.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        setLoading(true);
        const res = await fetch('http://localhost:5000/download/cleaned-files');
        const data = await res.json();
        if (data.files) {
          setFiles(data.files);
        } else {
          setError('No cleaned files found.');
        }
      } catch (err) {
        setError('Failed to load cleaned dataset files.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (isFileUploaded) {
      fetchFiles();
    }
  }, [isFileUploaded]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex flex-col items-center px-4 py-10 "
    >
      {/* Animated Heading */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center mb-12"
      >
        <h1 className="text-3xl sm:text-4xl font-bold text-yellow-400 flex items-center justify-center gap-3">
          <motion.span 
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
          >
            <Sparkles className="text-yellow-400" />
          </motion.span>
          Dataset Cleaning Wizard
          <motion.span 
            animate={{ rotate: [0, -10, 10, 0] }}
            transition={{ repeat: Infinity, duration: 3, delay: 0.5 }}
          >
            <Sparkles className="text-yellow-400" />
          </motion.span>
        </h1>
        <p className="text-black mt-2">Upload your dataset and get it cleaned automatically</p>
      </motion.div>

      {/* Upload Section */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-lg space-y-6 border border-gray-100"
      >
        {/* File Upload with Custom Styled Button */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Dataset File</label>
          {!fileName ? (
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-blue-300 rounded-xl cursor-pointer bg-blue-50 hover:bg-blue-100 transition-colors">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-8 h-8 mb-3 text-blue-500" />
                <p className="mb-2 text-sm text-gray-600">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500">
                  CSV or Excel files only
                </p>
              </div>
              <input 
                type="file" 
                accept=".csv, .xlsx" 
                onChange={handleFileChange} 
                className="hidden" 
              />
            </label>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200"
            >
              <div className="flex items-center gap-2">
                <FileCheck className="text-blue-600" />
                <span className="text-sm text-blue-800 truncate max-w-xs">{fileName}</span>
              </div>
              <button
                onClick={handleRemoveFile}
                className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </div>

        {/* Learning Type Selection */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Learning Type</label>
          <select
            value={learningType}
            onChange={(e) => setLearningType(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-700 transition-all"
          >
            <option value="">Select Learning Type</option>
            <option value="supervised">Supervised Learning</option>
            <option value="unsupervised">Unsupervised Learning</option>
          </select>
        </div>

        {/* Conditional Fields for Supervised Learning */}
        <AnimatePresence>
          {learningType === 'supervised' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-4 overflow-hidden"
            >
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Model Task</label>
                <select
                  value={modelTask}
                  onChange={(e) => setModelTask(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-700 transition-all"
                >
                  <option value="">Select Model Task</option>
                  <option value="classification">Classification</option>
                  <option value="regression">Regression</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Target Column</label>
                <input
                  type="text"
                  value={targetColumn}
                  onChange={(e) => setTargetColumn(e.target.value)}
                  placeholder="Enter target column name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-700 transition-all"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Upload Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleUpload}
          disabled={loading || !file}
          className={`w-full py-3 px-4 rounded-lg font-medium flex items-center justify-center gap-2 transition-all ${
            loading 
              ? 'bg-blue-400 cursor-not-allowed' 
              : !file 
                ? 'bg-gray-300 cursor-not-allowed text-gray-500' 
                : 'bg-blue-600 hover:bg-blue-700 text-white'
          } shadow-md`}
        >
          {loading ? (
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
              Processing...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              Clean My Dataset
            </>
          )}
        </motion.button>

        {/* Message Display */}
        <AnimatePresence>
          {message.text && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`p-3 rounded-lg border ${
                message.type === 'error' 
                  ? 'bg-red-50 border-red-200 text-red-700' 
                  : 'bg-green-50 border-green-200 text-green-700'
              }`}
            >
              {message.text}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Download Cleaned File */}
        {cleanedFile && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200 flex flex-col sm:flex-row items-center justify-between gap-3"
          >
            <div className="flex items-center gap-2">
              <FileCheck className="text-blue-600" />
              <span className="text-gray-700">Your cleaned file is ready!</span>
            </div>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={`http://localhost:5000/download/cleaned-file/${cleanedFile}`}
              download
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <Download className="w-4 h-4" />
              Download
            </motion.a>
          </motion.div>
        )}
      </motion.div>

      {/* Cleaned Datasets List Section */}
      <AnimatePresence>
        {uploaded && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-2xl mt-10 bg-white p-8 rounded-2xl shadow-lg border border-gray-100"
          >
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-3 text-gray-800">
              <FileBarChart2 className="text-blue-600" />
              <span>Your Cleaned Datasets</span>
            </h2>

            {loading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : error ? (
              <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg">
                {error}
              </div>
            ) : files.length > 0 ? (
              <motion.ul className="space-y-3">
                {files.map((file, index) => (
                  <motion.li 
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between bg-gray-50 hover:bg-gray-100 p-4 rounded-lg transition-colors border border-gray-200"
                  >
                    <span className="text-gray-700 truncate pr-2">{file}</span>
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href={`http://localhost:5000/download/cleaned-file/${file}`}
                      download
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-sm flex items-center gap-1 transition-colors"
                    >
                      <Download className="w-3 h-3" />
                      Download
                    </motion.a>
                  </motion.li>
                ))}
              </motion.ul>
            ) : (
              <div className="bg-gray-50 border border-gray-200 text-gray-500 p-4 rounded-lg text-center">
                No cleaned files available yet
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}