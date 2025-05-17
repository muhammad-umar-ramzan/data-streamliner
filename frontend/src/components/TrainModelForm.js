'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileBarChart2, Sparkles, Upload, Download, FileCheck, X, Loader2 } from 'lucide-react';

export default function TrainModelForm() {
  // File upload state
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [message, setMessage] = useState({ text: '', type: '' });
  const [loading, setLoading] = useState(false);
  
  // Model training state
  const [learningType, setLearningType] = useState('');
  const [task, setTask] = useState('');
  const [targetColumn, setTargetColumn] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [result, setResult] = useState(null);
  const [pickleFiles, setPickleFiles] = useState([]);
  const [cleanedFileName, setCleanedFileName] = useState('');

  const supervisedModels = {
    classification: [
      'LogisticRegression',
      'KNeighborsClassifier',
      'SVC',
      'DecisionTreeClassifier',
      'RandomForestClassifier',
      'GaussianNB',
      'XGBClassifier',
      'LGBMClassifier',
      'CatBoostClassifier'
    ],
    regression: [
      'LinearRegression',
      'Ridge',
      'Lasso',
      'DecisionTreeRegressor',
      'RandomForestRegressor',
      'XGBRegressor',
      'LGBMRegressor',
      'CatBoostRegressor',
      'SVR'
    ]
  };

  const unsupervisedModels = ['KMeans'];

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setFileName(selectedFile ? selectedFile.name : '');
    setResult(null);
    setMessage({ text: '', type: '' });
    setPickleFiles([]);
    setCleanedFileName('');
  };

  const handleRemoveFile = () => {
    setFile(null);
    setFileName('');
  };

  const fetchPickleFiles = async () => {
    try {
      const res = await fetch('http://localhost:5000/download/models');
      const data = await res.json();
      if (data.files) {
        setPickleFiles(data.files);
      }
    } catch (error) {
      console.error('Failed to load pickle files', error);
    }
  };

  const handleTrain = async () => {
    setMessage({ text: '', type: '' });
    setResult(null);
    setPickleFiles([]);
    setCleanedFileName('');
    setLoading(true);

    if (!file) {
      setMessage({ text: 'Please select a dataset file.', type: 'error' });
      setLoading(false);
      return;
    }

    if (!selectedModel) {
      setMessage({ text: 'Please select a model.', type: 'error' });
      setLoading(false);
      return;
    }

    const uploadUrl = 'http://localhost:5000/upload';
    const trainUrl = learningType === 'supervised'
      ? 'http://localhost:5000/train/supervised'
      : 'http://localhost:5000/train/kmeans';

    const uploadFormData = new FormData();
    uploadFormData.append('file', file);
    uploadFormData.append('learningType', learningType);
    if (learningType === 'supervised') {
      uploadFormData.append('targetColumn', targetColumn);
      uploadFormData.append('modelTask', task);
    }

    try {
      // First upload the file
      const uploadRes = await fetch(uploadUrl, {
        method: 'POST',
        body: uploadFormData,
      });

      const uploadData = await uploadRes.json();
      if (uploadData.error) {
        setMessage({ text: `Upload Error: ${uploadData.error}`, type: 'error' });
        setLoading(false);
        return;
      }

      // Don't show success message for upload - only show if there's an error

      // Then train the model
      const trainFormData = new FormData();
      trainFormData.append('file', file);
      trainFormData.append('model_name', selectedModel);

      if (learningType === 'supervised') {
        trainFormData.append('modelTask', task);
        trainFormData.append('targetColumn', targetColumn);
      } else {
        trainFormData.append('clusters', '3'); // Default number of clusters
      }

      const trainRes = await fetch(trainUrl, {
        method: 'POST',
        body: trainFormData,
      });

      const trainData = await trainRes.json();

      if (trainData.error) {
        setMessage({ text: `Training Error: ${trainData.error}`, type: 'error' });
        setLoading(false);
        return;
      }

      setResult(trainData);

      if (trainData.cleaned_file) {
        setCleanedFileName(trainData.cleaned_file);
      }

      await fetchPickleFiles();
    } catch (error) {
      console.error('Training failed', error);
      setMessage({ text: 'Training failed due to a server error.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

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
        <h1 className="text-3xl sm:text-4xl font-bold text-blue-800 flex items-center justify-center gap-3">
          <motion.span 
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
          >
            <Sparkles className="text-blue-800" />
          </motion.span>
          Model Training Wizard
          <motion.span 
            animate={{ rotate: [0, -10, 10, 0] }}
            transition={{ repeat: Infinity, duration: 3, delay: 0.5 }}
          >
            <Sparkles className="text-blue-800" />
          </motion.span>
        </h1>
        <p className="text-black mt-2">Upload your dataset and train a machine learning model</p>
      </motion.div>

      {/* Upload and Training Section */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-lg space-y-6 border border-gray-100"
      >
        {/* File Upload */}
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
            onChange={(e) => {
              setLearningType(e.target.value);
              setTargetColumn('');
              setSelectedModel('');
              setTask('');
            }}
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
                <label className="block text-sm font-medium text-gray-700">Task Type</label>
                <select
                  value={task}
                  onChange={(e) => setTask(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-700 transition-all"
                >
                  <option value="">Select Task Type</option>
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

        {/* Model Selection */}
        <AnimatePresence>
          {learningType && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-2"
            >
              <label className="block text-sm font-medium text-gray-700">Select Model</label>
              <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-700 transition-all"
              >
                <option value="">Select Model</option>
                {(learningType === 'supervised'
                  ? task
                    ? supervisedModels[task]
                    : []
                  : unsupervisedModels
                ).map((model, index) => (
                  <option key={index} value={model}>
                    {model}
                  </option>
                ))}
              </select>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Train Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleTrain}
          disabled={loading || !file || !selectedModel}
          className={`w-full py-3 px-4 rounded-lg font-medium flex items-center justify-center gap-2 transition-all ${
            loading 
              ? 'bg-blue-400 cursor-not-allowed' 
              : !file || !selectedModel
                ? 'bg-gray-300 cursor-not-allowed text-gray-500' 
                : 'bg-blue-600 hover:bg-blue-700 text-white'
          } shadow-md`}
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Training Model...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              Train Model
            </>
          )}
        </motion.button>

        {/* Message Display - Only for errors */}
        <AnimatePresence>
          {message.text && message.type === 'error' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`p-3 rounded-lg border bg-red-50 border-red-200 text-red-700`}
            >
              {message.text}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results Section */}
        {result && !result.error && (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    className="mt-6 border border-gray-200 rounded-xl overflow-hidden shadow-sm"
  >
    {/* Main Heading */}
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 border-b border-gray-200">
      <h3 className="text-xl font-semibold text-gray-800 text-center">
        TRAINING RESULTS
      </h3>
    </div>
    
    <div className="bg-white p-5">
      {/* Results Table */}
      <div className="overflow-x-auto mb-6">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Metric</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Model Name</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{result.model}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">Trained</span>
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Task Type</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 capitalize">{result.task}</td>
              <td className="px-6 py-4 whitespace-nowrap"></td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {result.task === 'classification' ? 'Accuracy' : 'R² Score'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {result.score.toFixed(4)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {result.score > 0.7 ? (
                  <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Excellent</span>
                ) : result.score > 0.4 ? (
                  <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">Good</span>
                ) : (
                  <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800">Needs Improvement</span>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Download Sections */}
      <div className="space-y-5">

        {/* Model Files - with bold heading */}
        {pickleFiles.length > 0 && (
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h4 className="text-sm font-bold text-gray-700 mb-3 text-center uppercase">TRAINED MODEL FILES</h4>
            <div className="space-y-3">
              {pickleFiles.map((file, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-center justify-between bg-white hover:bg-gray-100 p-3 rounded-md transition-colors border border-gray-200"
                >
                  <div className="truncate pr-4">
                    <p className="text-sm text-gray-800 truncate">{file}</p>
                  </div>
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href={`http://localhost:5000/download/model/${file}`}
                    download
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm flex items-center gap-2 transition-colors"
                  >
                    <Download size={16} />
                    Download
                  </motion.a>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  </motion.div>
)}
      </motion.div>
    </motion.div>
  );
}