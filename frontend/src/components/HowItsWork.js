import { FaChartLine, FaBroom, FaRobot, FaFilePdf, FaArrowRight, FaLightbulb } from 'react-icons/fa';
import { FiUploadCloud } from 'react-icons/fi';

export default function HowItWorks() {
  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 ">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            How <span className="text-blue-600">Data Streamliner</span> Works
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            A step-by-step guide to using our powerful data science tools
          </p>
        </div>

        {/* Getting Started */}
        <div className="mb-20">
          <div className="flex flex-col items-center mb-12">
            <div className="relative">
              <div className="absolute -inset-0.5 bg-fuchsia-200 rounded-xl opacity-25"></div>
              <div className="relative  p-6 rounded-lg border border-gray-200 shadow-sm">
                <FiUploadCloud className="text-5xl text-blue-600 mx-auto mb-4" />
                <h2 className="text-2xl font-semibold text-center text-gray-900 mb-3">
                  Getting Started
                </h2>
                <p className="text-gray-700 text-center max-w-md">
                  Begin your data journey in just three simple steps
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
            {[
              {
                icon: <FiUploadCloud className="text-3xl" />,
                title: "1. Upload Data",
                desc: "Import your CSV or Excel files"
              },
              {
                icon: <FaArrowRight className="text-3xl" />,
                title: "2. Select Tool",
                desc: "Choose from our specialized tools"
              },
              {
                icon: <FaFilePdf className="text-3xl" />,
                title: "3. Get Results",
                desc: "Download outputs instantly"
              }
            ].map((step, index) => (
              <div key={index} className="group">
                <div className="h-full p-6 border bg-blue-200 border-gray-200 rounded-xl shadow-xs hover:shadow-md transition-shadow">
                  <div className="text-blue-600 mb-4 group-hover:text-blue-700 transition-colors">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">{step.title}</h3>
                  <p className="text-gray-600">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tools Section */}
        <div className="space-y-16">
          {[
            {
              icon: <FaChartLine className="text-3xl text-blue-600" />,
              title: "Exploratory Analysis",
              steps: [
                "Upload your dataset (CSV/Excel)",
                "Columns automatically populate in X/Y-axis selectors",
                "Choose plot type and configure axes",
                "Generate interactive visualizations",
                "Download plots as PNG/SVG"
              ],
              note: "Perfect for initial data exploration and pattern discovery",
              color: "blue"
            },
            {
              icon: <FaBroom className="text-3xl text-purple-600" />,
              title: "Data Cleaning",
              steps: [
                "Upload your data file",
                "Select learning type (Supervised/Unsupervised)",
                "For Supervised: Specify task type and target column",
                "Automatic handling of missing values and outliers",
                "Download cleaned dataset immediately"
              ],
              note: "Target column name must be exact for supervised tasks",
              color: "purple"
            },
            {
              icon: <FaRobot className="text-3xl text-green-600" />,
              title: "Model Training",
              steps: [
                "Upload your prepared dataset",
                "Choose learning approach",
                "Select appropriate model type",
                "Specify target column (for supervised)",
                "Train model and download pickle file"
              ],
              note: "Data is automatically cleaned before training",
              color: "green"
            },
            {
              icon: <FaFilePdf className="text-3xl text-amber-600" />,
              title: "Report Generation",
              steps: [
                "Upload your dataset",
                "Click 'Generate Report'",
                "System creates comprehensive analysis",
                "Includes statistics and visualizations",
                "Download as PDF document"
              ],
              note: "Great for documentation and presentations",
              color: "amber"
            }
          ].map((tool, index) => (
            <div key={index} className="group relative">
              {/* Decorative element */}
              <div className={`absolute -left-2 top-3 h-3/4 w-1 bg-${tool.color}-100 rounded-full`}></div>
              
              <div className="pl-8">
                <div className="flex items-start gap-6">
                  <div className={`bg-${tool.color}-50 p-4 rounded-lg border border-${tool.color}-100`}>
                    {tool.icon}
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-900 flex items-center gap-3">
                      {tool.title}
                    </h2>
                    <ul className="space-y-3 mb-4">
                      {tool.steps.map((step, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className={`inline-flex items-center justify-center h-6 w-6 rounded-full bg-${tool.color}-100 text-${tool.color}-600 text-sm font-medium mt-0.5 flex-shrink-0`}>
                            {i + 1}
                          </span>
                          <span className="text-gray-700">{step}</span>
                        </li>
                      ))}
                    </ul>
                    {tool.note && (
                      <div className={`bg-${tool.color}-50 border-l-4 border-${tool.color}-400 p-3 rounded-r-lg`}>
                        <div className="flex items-start gap-2">
                          <FaLightbulb className={`text-${tool.color}-500 mt-0.5 flex-shrink-0`} />
                          <p className={`text-${tool.color}-800 text-sm`}>{tool.note}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Feedback CTA */}
        <div className="mt-24 text-center">
          <div className="inline-block bg-fuchsia-200 px-8 py-8 rounded-2xl border border-gray-200 shadow-xs">
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">
              Have Questions or Suggestions?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              We value your feedback to improve Data Streamliner
            </p>
            <a 
              href="/feedback" 
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-medium shadow-md transition-all"
            >
              Share Your Feedback
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}