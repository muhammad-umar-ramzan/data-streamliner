// File: app/page.js
"use client";

import Link from "next/link";
import { FaUpload, FaRobot, FaChartLine, FaFileDownload, FaFilePdf, FaPython } from 'react-icons/fa';
import { FiBarChart2, FiDatabase, FiCpu, FiFileText } from 'react-icons/fi';

export default function HomePage() {
  return (
    <div className="min-h-screen ">
      {/* Hero Section */}
      <section className="relative py-28 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
              Transform Your <span className="text-indigo-700">Data Workflow</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed font-medium">
              From raw data to production-ready models — clean datasets, generate reports, download visualizations, and export trained models all in one platform.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-20">
              <Link 
                href="/clean-data" 
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-lg shadow-md transition-all flex items-center justify-center gap-3 text-lg font-medium hover:shadow-lg transform hover:-translate-y-1"
              >
                <FaUpload className="text-xl" />
                Start Cleaning Data
              </Link>
              <Link 
                href="/train" 
                className="bg-fuchsia-200 hover:bg-gray-50 text-indigo-600 border border-indigo-200 px-8 py-4 rounded-lg shadow-md transition-all flex items-center justify-center gap-3 text-lg font-medium hover:shadow-lg transform hover:-translate-y-1"
              >
                <FaRobot className="text-xl" />
                Train ML Model
              </Link>
            </div>
          </div>

          {/* Hero Preview */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl max-w-5xl mx-auto border border-gray-200 overflow-hidden">
            <div className="aspect-w-16 aspect-h-9 bg-gradient-to-r  from-indigo-600 to-purple-600 text-white rounded-xl flex items-center justify-center p-8">
              <div className="text-center">
                <div className="flex justify-center gap-6 mb-6">
                  <div className="bg-fuchsia-200 p-4 rounded-lg shadow-md border border-gray-100">
                    <FaFilePdf className="mx-auto text-4xl text-red-500 mb-2" />
                    <p className="text-sm font-medium text-gray-600">PDF Reports</p>
                  </div>
                  <div className="bg-fuchsia-200 p-4 rounded-lg shadow-md border border-gray-100">
                    <FaFileDownload className="mx-auto text-4xl text-blue-500 mb-2" />
                    <p className="text-sm font-medium text-gray-600">Clean Data</p>
                  </div>
                  <div className="bg-fuchsia-200 p-4 rounded-lg shadow-md border border-gray-100">
                    <FaPython className="mx-auto text-4xl text-yellow-500 mb-2" />
                    <p className="text-sm font-medium text-gray-600">Model Files</p>
                  </div>
                </div>
                <h3 className="text-2xl font-semibold text-white mb-2">Export Your Results</h3>
                <p className="text-white max-w-md mx-auto">Download everything you need for your data science workflow</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 rounded-2xl  backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block bg-indigo-100 text-indigo-600 px-4 py-1 rounded-full text-sm font-medium mb-4">
              Powerful Features
            </span>
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Complete Data Science Toolkit</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to go from raw data to actionable insights
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 - Data Cleaning */}
            <div className="bg-fuchsia-200 p-8 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100 hover:border-indigo-200">
              <div className="bg-indigo-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <FiDatabase className="text-indigo-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Smart Data Cleaning</h3>
              <p className="text-gray-600 mb-4">
                Automatically detect and fix missing values, outliers, and inconsistent data.
              </p>
              <ul className="space-y-2 text-sm text-gray-500 mb-4">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-indigo-400 rounded-full"></span>
                  Automatic type detection
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-indigo-400 rounded-full"></span>
                  Outlier handling
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-indigo-400 rounded-full"></span>
                  Download cleaned CSV
                </li>
              </ul>
              <Link href="/clean-data" className="text-indigo-600 font-medium inline-flex items-center gap-1 hover:text-indigo-800">
                Try it now <span>→</span>
              </Link>
            </div>

            {/* Feature 2 - Report Generation */}
            <div className="bg-fuchsia-200 p-8 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100 hover:border-purple-200 transform md:-translate-y-3">
              <div className="bg-purple-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <FaFilePdf className="text-purple-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Automated Reports</h3>
              <p className="text-gray-600 mb-4">
                Generate comprehensive PDF reports with statistics and visualizations.
              </p>
              <ul className="space-y-2 text-sm text-gray-500 mb-4">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                  EDA summary reports
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                  Model performance metrics
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                  Download as PDF
                </li>
              </ul>
              <Link href="/report" className="text-purple-600 font-medium inline-flex items-center gap-1 hover:text-purple-800">
                See examples <span>→</span>
              </Link>
            </div>

            {/* Feature 3 - Model Training */}
            <div className="bg-fuchsia-200 p-8 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100 hover:border-pink-200">
              <div className="bg-pink-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <FiCpu className="text-pink-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Model Training</h3>
              <p className="text-gray-600 mb-4">
                Train and evaluate machine learning models with intuitive controls.
              </p>
              <ul className="space-y-2 text-sm text-gray-500 mb-4">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-pink-400 rounded-full"></span>
                  Classification & Regression
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-pink-400 rounded-full"></span>
                  Performance metrics
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-pink-400 rounded-full"></span>
                  Download trained models
                </li>
              </ul>
              <Link href="/train" className="text-pink-600 font-medium inline-flex items-center gap-1 hover:text-pink-800">
                Start training <span>→</span>
              </Link>
            </div>

            {/* Feature 4 - Clean File Download */}
            <div className="bg-fuchsia-200 p-8 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100 hover:border-blue-200">
              <div className="bg-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <FaFileDownload className="text-blue-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Download Clean Data</h3>
              <p className="text-gray-600 mb-4">
                Export your processed datasets in multiple formats for further analysis.
              </p>
              <ul className="space-y-2 text-sm text-gray-500 mb-4">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                  CSV format
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                  Preserve transformations
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                  One-click download
                </li>
              </ul>
              <Link href="/download-clean-data" className="text-blue-600 font-medium inline-flex items-center gap-1 hover:text-blue-800">
                Learn more <span>→</span>
              </Link>
            </div>

            {/* Feature 5 - Model Export */}
            <div className="bg-fuchsia-200 p-8 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100 hover:border-teal-200 transform md:-translate-y-3">
              <div className="bg-teal-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <FaPython className="text-teal-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Export Trained Models</h3>
              <p className="text-gray-600 mb-4">
                Download your trained models as pickle files for production use.
              </p>
              <ul className="space-y-2 text-sm text-gray-500 mb-4">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-teal-400 rounded-full"></span>
                  Pickle file format
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-teal-400 rounded-full"></span>
                  Includes all dependencies
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-teal-400 rounded-full"></span>
                  Ready for deployment
                </li>
              </ul>
              <Link href="/pickle-file" className="text-teal-600 font-medium inline-flex items-center gap-1 hover:text-teal-800">
                See options <span>→</span>
              </Link>
            </div>

            {/* Feature 6 - Visualization Export */}
            <div className="bg-fuchsia-200 p-8 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100 hover:border-amber-200">
              <div className="bg-amber-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <FiBarChart2 className="text-amber-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Save Visualizations</h3>
              <p className="text-gray-600 mb-4">
                Download charts and graphs as high-quality images for presentations.
              </p>
              <ul className="space-y-2 text-sm text-gray-500 mb-4">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-amber-400 rounded-full"></span>
                  PNG format
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-amber-400 rounded-full"></span>
                  Customizable sizes
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-amber-400 rounded-full"></span>
                  Transparent backgrounds
                </li>
              </ul>
              <Link href="/eda" className="text-amber-600 font-medium inline-flex items-center gap-1 hover:text-amber-800">
                View gallery <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 ">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block bg-purple-100 text-purple-600 px-4 py-1 rounded-full text-sm font-medium mb-4">
              Simple Process
            </span>
            <h2 className="text-4xl font-bold text-gray-800 mb-4">From Data to Insights in 3 Steps</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our streamlined workflow makes data science accessible to everyone
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-fuchsia-200 p-8 rounded-xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-all">
              <div className="bg-indigo-100 text-indigo-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl font-bold">
                1
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-gray-800">Upload Your Data</h3>
              <p className="text-gray-600 mb-4">
                Drag and drop your CSV, Excel, or JSON files into our platform.
              </p>
              <div className="mt-6">
                <FiDatabase className="mx-auto text-4xl text-indigo-400" />
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-fuchsia-200 p-8 rounded-xl shadow-sm border border-gray-100 text-center transform md:-translate-y-6 hover:shadow-md transition-all">
              <div className="bg-purple-100 text-purple-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl font-bold">
                2
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-gray-800">Process & Analyze</h3>
              <p className="text-gray-600 mb-4">
                Clean your data, generate reports, or train machine learning models.
              </p>
              <div className="mt-6">
                <FaChartLine className="mx-auto text-4xl text-purple-400" />
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-fuchsia-200 p-8 rounded-xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-all">
              <div className="bg-pink-100 text-pink-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl font-bold">
                3
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-gray-800">Export Results</h3>
              <p className="text-gray-600 mb-4">
                Download cleaned data, trained models, PDF reports, or visualizations.
              </p>
              <div className="mt-6">
                <FaFileDownload className="mx-auto text-4xl text-pink-400" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-r mb-4 from-indigo-600 to-purple-600 text-white rounded-2xl mx-4">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Streamline Your Data Workflow?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
            Join thousands of professionals who automated their data cleaning, analysis, and modeling.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="/clean-data" 
              className="bg-fuchsia-200 text-indigo-600 hover:bg-gray-100 px-8 py-4 rounded-lg shadow-lg font-semibold transition-all flex items-center justify-center gap-3 text-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <FaUpload className="text-xl" />
              Get Started Free
            </Link>
            <Link 
              href="/work" 
              className="bg-transparent border-2 border-white/30 hover:border-white/50 text-white px-8 py-4 rounded-lg font-semibold transition-all flex items-center justify-center gap-3 text-lg"
            >
              <FiFileText className="text-xl" />
              View Documentation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}