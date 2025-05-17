"use client"
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiUpload, FiImage, FiDownload, FiX, FiHelpCircle } from 'react-icons/fi';
import { 
  FaChartBar, 
  FaChartLine, 
  FaChartPie, 
  FaChartArea,
  FaBox
} from 'react-icons/fa';
import { GiHistogram } from 'react-icons/gi';
import { SiPandas } from 'react-icons/si';
import { TbChartDots } from 'react-icons/tb';
import { MdScatterPlot } from 'react-icons/md'; // Using MdScatterPlot instead of FaChartScatter
const PlotGenerator = () => {
  const [file, setFile] = useState(null);
  const [columns, setColumns] = useState([]);
  const [xAxis, setXAxis] = useState('');
  const [yAxis, setYAxis] = useState('');
  const [hue, setHue] = useState('');
  const [plotType, setPlotType] = useState('');
  const [plotUrl, setPlotUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [fileName, setFileName] = useState('');
  const [showHelp, setShowHelp] = useState(false);

 const plotTypeOptions = [
    { 
      value: 'bar', 
      label: 'Bar Chart', 
      icon: <FaChartBar />,
      description: 'Compare values across categories using rectangular bars'
    },
    { 
      value: 'line', 
      label: 'Line Chart', 
      icon: <FaChartLine />,
      description: 'Show trends over time or ordered categories'
    },
    { 
      value: 'scatter', 
      label: 'Scatter Plot', 
      icon: <MdScatterPlot />, 
      description: 'Display relationships between two numerical variables'
    },
    { 
      value: 'hist', 
      label: 'Histogram', 
      icon: <GiHistogram />,
      description: 'Show distribution of numerical data using bins'
    },
    { 
      value: 'pie', 
      label: 'Pie Chart', 
      icon: <FaChartPie />,
      description: 'Show proportions of parts to whole'
    },
    { 
      value: 'area', 
      label: 'Area Chart', 
      icon: <FaChartArea />,
      description: 'Show cumulative totals over time'
    },
    { 
      value: 'box', 
      label: 'Box Plot', 
      icon: <FaBox />,
      description: 'Show distribution through quartiles and outliers'
    },
    { 
      value: 'violin', 
      label: 'Violin Plot', 
      icon: <TbChartDots />,
      description: 'Combine box plot with kernel density estimation'
    },
  ];

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setFileName(selectedFile ? selectedFile.name : '');
    setPlotUrl(null);
    setColumns([]);
    setMessage({ text: '', type: '' });
  };

  const handleRemoveFile = () => {
    setFile(null);
    setFileName('');
    setPlotUrl(null);
    setColumns([]);
  };

  const handleFileUpload = async () => {
    setPlotUrl(null);
    if (!file) {
      setMessage({ text: 'Please select a file first', type: 'error' });
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      setUploadLoading(true);
      const response = await axios.post('http://127.0.0.1:5000/upload', formData);
      setColumns(response.data.columns);
      setMessage({ text: 'File uploaded successfully! Select plot details', type: 'success' });
      
      setTimeout(() => {
        setMessage(prev => prev.type === 'success' ? { text: '', type: '' } : prev);
      }, 3000);
    } catch (error) {
      console.error(error);
      setMessage({ text: 'Error uploading file', type: 'error' });
    } finally {
      setUploadLoading(false);
    }
  };

  const handleGeneratePlot = async () => {
    if (!plotType || !xAxis) {
      setMessage({ text: 'Please select both plot type and X-axis', type: 'error' });
      return;
    }

    if ((plotType === 'bar' || plotType === 'line' || plotType === 'scatter' || 
         plotType === 'area' || plotType === 'box' || plotType === 'violin') && !yAxis) {
      setMessage({ text: 'Y-axis is required for this plot type', type: 'error' });
      return;
    }

    setPlotUrl(null);
    setLoading(true);
    setMessage({ text: 'Generating your plot...', type: 'info' });

    try {
      const res = await axios.post(
        'http://127.0.0.1:5000/plot',
        {
          type: plotType,
          x: xAxis,
          y: (plotType === 'pie' || plotType === 'hist') ? null : yAxis,
          hue: hue || null
        },
        { responseType: 'blob' }
      );

      const url = URL.createObjectURL(new Blob([res.data]));
      setPlotUrl(url);
      setMessage({ text: 'Plot generated successfully!', type: 'success' });
      
      setTimeout(() => {
        setMessage(prev => prev.type === 'success' ? { text: '', type: '' } : prev);
      }, 3000);
    } catch (error) {
      console.error(error);
      setMessage({ text: 'Error generating plot', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = plotUrl;
    link.download = `plot-${plotType}-${new Date().toISOString().slice(0, 10)}.png`;
    link.click();
  };

  const getPlotRequirements = () => {
    switch(plotType) {
      case 'bar':
      case 'line':
      case 'scatter':
      case 'area':
      case 'box':
      case 'violin':
        return 'Requires X and Y axes';
      case 'hist':
      case 'pie':
        return 'Requires only X axis';
      default:
        return 'Select a plot type to see requirements';
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-10 ">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl bg-white rounded-xl shadow-xl overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white text-center relative">
          <h2 className="text-2xl md:text-3xl font-bold flex items-center justify-center gap-3">
            <motion.span
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
            >
              <FiImage className="text-blue-200" />
            </motion.span>
            Advanced Data Visualization
            <motion.span
              animate={{ rotate: [0, -10, 10, 0] }}
              transition={{ repeat: Infinity, duration: 3, delay: 0.5 }}
            >
              <FiImage className="text-blue-200" />
            </motion.span>
          </h2>
          <p className="text-blue-100 mt-2">Create professional visualizations from your data</p>
          
          <button 
            onClick={() => setShowHelp(!showHelp)}
            className="absolute top-4 right-4 text-blue-200 hover:text-white"
            aria-label="Help"
          >
            <FiHelpCircle size={24} />
          </button>
        </div>

        {/* Help Panel */}
        <AnimatePresence>
          {showHelp && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-blue-50 border-b border-blue-200 overflow-hidden"
            >
              <div className="p-4">
                <h3 className="font-medium text-blue-800 mb-2">Visualization Guide</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {plotTypeOptions.map((plot) => (
                    <div key={plot.value} className="bg-white p-3 rounded-lg border border-blue-100">
                      <div className="flex items-center gap-2 text-blue-600">
                        {plot.icon}
                        <span className="font-medium">{plot.label}</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{plot.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <div className="p-6 bg-gray-50">
          {/* Message Alert */}
          <AnimatePresence>
            {message.text && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`mb-4 p-3 rounded-lg flex items-center justify-between ${
                  message.type === 'error' ? 'bg-red-50 text-red-700 border border-red-200' :
                  message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' :
                  'bg-blue-50 text-blue-700 border border-blue-200'
                }`}
              >
                <span>{message.text}</span>
                <button 
                  onClick={() => setMessage({ text: '', type: '' })}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FiX />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* File Upload */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">1. Upload your dataset</label>
            <div className="flex flex-col sm:flex-row gap-3 items-center">
              {!fileName ? (
                <label className="flex-1 cursor-pointer">
                  <div className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-center transition-colors flex items-center justify-center gap-2">
                    <FiUpload />
                    Choose File (CSV/Excel)
                  </div>
                  <input
                    type="file"
                    accept=".csv, .xls, .xlsx"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              ) : (
                <div className="flex-1 flex items-center justify-between bg-blue-50 border border-blue-200 rounded-lg px-4 py-2">
                  <span className="text-blue-800 truncate">{fileName}</span>
                  <button 
                    onClick={handleRemoveFile}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FiX />
                  </button>
                </div>
              )}
              <button
                onClick={handleFileUpload}
                disabled={uploadLoading || !file}
                className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  uploadLoading 
                    ? 'bg-blue-400 text-white cursor-not-allowed' 
                    : !file 
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                <FiUpload />
                {uploadLoading ? 'Uploading...' : 'Upload'}
              </button>
            </div>
          </div>

          {/* Plot Configuration */}
          {columns.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <h3 className="text-lg font-medium text-gray-800">2. Configure your visualization</h3>

              {/* Plot Type Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Chart Type</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {plotTypeOptions.map((option) => (
                    <motion.button
                      key={option.value}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setPlotType(option.value)}
                      className={`flex flex-col items-center gap-1 p-3 rounded-lg border transition-all ${
                        plotType === option.value
                          ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-inner'
                          : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                      }`}
                    >
                      <span className="text-xl">{option.icon}</span>
                      <span className="text-sm">{option.label}</span>
                    </motion.button>
                  ))}
                </div>
                {plotType && (
                  <p className="mt-2 text-sm text-gray-500">
                    <span className="font-medium">Requirements:</span> {getPlotRequirements()}
                  </p>
                )}
              </div>

              {/* Axis Selection */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">X-axis</label>
                  <select
                    value={xAxis}
                    onChange={(e) => setXAxis(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-700 transition-all"
                  >
                    <option value="">Select column</option>
                    {columns.map((col) => (
                      <option key={col} value={col}>{col}</option>
                    ))}
                  </select>
                </div>

                {(plotType && plotType !== 'pie' && plotType !== 'hist') && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Y-axis</label>
                    <select
                      value={yAxis}
                      onChange={(e) => setYAxis(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-700 transition-all"
                    >
                      <option value="">Select column</option>
                      {columns.map((col) => (
                        <option key={col} value={col}>{col}</option>
                      ))}
                    </select>
                  </div>
                )}

                {(plotType && plotType !== 'pie' && plotType !== 'hist') && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Color Group (Optional)</label>
                    <select
                      value={hue}
                      onChange={(e) => setHue(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-700 transition-all"
                    >
                      <option value="">None</option>
                      {columns.map((col) => (
                        <option key={col} value={col}>{col}</option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleGeneratePlot}
                disabled={loading || !plotType || !xAxis || ((plotType !== 'pie' && plotType !== 'hist') && !yAxis)}
                className={`w-full py-3 px-4 rounded-lg font-medium flex items-center justify-center gap-2 transition-all ${
                  loading 
                    ? 'bg-indigo-400 cursor-not-allowed' 
                    : !plotType || !xAxis || ((plotType !== 'pie' && plotType !== 'hist') && !yAxis)
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-indigo-600 hover:bg-indigo-700'
                } text-white shadow-md`}
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
                    Generating...
                  </>
                ) : (
                  <>
                    <FaChartLine />
                    Generate Visualization
                  </>
                )}
              </motion.button>
            </motion.div>
          )}

          {/* Plot Display */}
          {plotUrl && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="mt-8 space-y-4"
            >
              <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm bg-white p-4">
                <h4 className="text-lg font-medium text-gray-800 mb-3 flex items-center gap-2">
                  <SiPandas className="text-blue-600" />
                  Your Visualization
                </h4>
                <div className="border rounded-lg p-2 bg-gray-50">
                  <img
                    src={plotUrl}
                    alt="Generated plot"
                    className="w-full h-auto object-contain"
                  />
                </div>
              </div>
              <div className="flex justify-center gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleDownload}
                  className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors shadow-md"
                >
                  <FiDownload />
                  Download Image
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => window.open(plotUrl, '_blank')}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors shadow-md"
                >
                  <FiImage />
                  View Full Size
                </motion.button>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default PlotGenerator;