'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FileDown, FolderArchive, Loader2 } from 'lucide-react';

export default function CleanedFilesList() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [downloading, setDownloading] = useState(null);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
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

    fetchFiles();
  }, []);

  const handleDownload = (filename) => {
    setDownloading(filename);
    // Simulate download completion after 1.5 seconds
    setTimeout(() => {
      setDownloading(null);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-10 ">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <div className="inline-flex items-center justify-center bg-white p-4 rounded-full shadow-md mb-4">
          <FolderArchive className="w-8 h-8 text-blue-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Cleaned Dataset Files</h2>
        <p className="text-gray-600">Download your processed datasets</p>
      </motion.div>

      {/* Files Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-3xl bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden"
      >
        {/* Card Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <FolderArchive className="w-5 h-5" />
            Available Files
          </h3>
        </div>

        {/* Card Body */}
        <div className="p-6">
          {loading && (
            <div className="flex flex-col items-center justify-center py-8">
              <Loader2 className="w-8 h-8 text-blue-600 animate-spin mb-3" />
              <p className="text-gray-600">Loading cleaned files...</p>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-lg">
              <p className="text-red-600">{error}</p>
            </div>
          )}

          {!loading && files.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No cleaned files available yet.</p>
              <p className="text-gray-400 text-sm mt-1">Upload and clean a dataset to see files here.</p>
            </div>
          )}

          {files.length > 0 && (
            <motion.ul
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
              className="divide-y divide-gray-200"
            >
              {files.map((file, index) => (
                <motion.li
                  key={index}
                  className="py-4"
                  variants={{
                    hidden: { opacity: 0, x: -10 },
                    visible: { opacity: 1, x: 0 }
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center min-w-0">
                      <div className="bg-blue-100 p-2 rounded-lg mr-4">
                        <FileDown className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{file}</p>
                        <p className="text-xs text-gray-500">CSV File</p>
                      </div>
                    </div>
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href={`http://localhost:5000/download/cleaned-file/${file}`}
                      download
                      onClick={() => handleDownload(file)}
                      className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-all ${
                        downloading === file 
                          ? 'bg-blue-400 text-white cursor-wait' 
                          : 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow-md'
                      }`}
                    >
                      {downloading === file ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Downloading...
                        </>
                      ) : (
                        <>
                          <FileDown className="w-4 h-4" />
                          Download
                        </>
                      )}
                    </motion.a>
                  </div>
                </motion.li>
              ))}
            </motion.ul>
          )}
        </div>
      </motion.div>

      {/* Help Text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-6 text-center text-gray-500 text-sm max-w-md"
      >
        <p>Files are automatically deleted after 7 days. Download important datasets promptly.</p>
      </motion.div>
    </div>
  );
}