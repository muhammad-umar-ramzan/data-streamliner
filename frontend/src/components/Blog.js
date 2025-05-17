// app/blog/page.js
'use client';
import { FaCalendarAlt, FaClock, FaTags, FaSearch, FaArrowLeft } from 'react-icons/fa';
import { FiExternalLink } from 'react-icons/fi';
import { useState } from 'react';

const blogPosts = [
  {
    id: 1,
    title: "Mastering Exploratory Data Analysis (EDA)",
    excerpt: "Uncover hidden patterns and insights in your data through comprehensive EDA techniques.",
    content: `
      <div class="space-y-6">
        <h2 class="text-2xl font-bold text-gray-800">What is EDA?</h2>
        <p>Exploratory Data Analysis is the critical first step in any data science project where we analyze datasets to summarize their main characteristics, often using visual methods.</p>
        
        <div class="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
          <h3 class="text-lg font-semibold text-blue-800">Key Benefits:</h3>
          <ul class="list-disc pl-5 space-y-1 mt-2">
            <li>Identifies outliers and anomalies</li>
            <li>Reveals underlying patterns</li>
            <li>Tests assumptions</li>
            <li>Determines optimal feature selection</li>
          </ul>
        </div>

        <h3 class="text-xl font-semibold text-gray-800 mt-6">Essential EDA Techniques</h3>
        <div class="grid md:grid-cols-2 gap-4 mt-4">
          <div class="bg-white p-4 rounded-lg shadow-xs border border-gray-200">
            <h4 class="font-medium text-blue-600">1. Statistical Summaries</h4>
            <p class="text-sm mt-1">Mean, median, mode, standard deviation, quartiles</p>
          </div>
          <div class="bg-white p-4 rounded-lg shadow-xs border border-gray-200">
            <h4 class="font-medium text-blue-600">2. Data Visualization</h4>
            <p class="text-sm mt-1">Histograms, box plots, scatter matrices</p>
          </div>
          <div class="bg-white p-4 rounded-lg shadow-xs border border-gray-200">
            <h4 class="font-medium text-blue-600">3. Correlation Analysis</h4>
            <p class="text-sm mt-1">Identify relationships between variables</p>
          </div>
          <div class="bg-white p-4 rounded-lg shadow-xs border border-gray-200">
            <h4 class="font-medium text-blue-600">4. Missing Data Analysis</h4>
            <p class="text-sm mt-1">Identify and handle missing values</p>
          </div>
        </div>

        <h3 class="text-xl font-semibold text-gray-800 mt-6">Python Implementation</h3>
        <pre class="bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto mt-2"><code>import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt

# Load dataset
df = pd.read_csv('data.csv')

# Basic statistics
print(df.describe())

# Correlation matrix
corr = df.corr()
sns.heatmap(corr, annot=True)

# Distribution plot
sns.displot(df['age'], kde=True)
plt.show()</code></pre>
      </div>
    `,
    date: "June 18, 2023",
    readTime: "10 min read",
    tags: ["EDA", "Data Analysis", "Visualization"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
  },
  {
    id: 2,
    title: "Advanced Data Cleaning Techniques",
    excerpt: "Professional methods to transform messy data into analysis-ready datasets.",
    content: `
      <div class="space-y-6">
        <h2 class="text-2xl font-bold text-gray-800">Data Cleaning Pipeline</h2>
        <p>Professional data scientists spend 60-80% of their time cleaning data. Here's a structured approach:</p>
        
        <div class="border-l-4 border-purple-500 pl-4 my-4">
          <h3 class="text-lg font-semibold text-purple-700">1. Handling Missing Data</h3>
          <ul class="list-disc pl-5 space-y-1 mt-2">
            <li><strong>Deletion:</strong> Remove rows/columns when appropriate</li>
            <li><strong>Imputation:</strong> Mean, median, mode, or predictive filling</li>
            <li><strong>Flagging:</strong> Create indicator variables</li>
          </ul>
        </div>

        <div class="border-l-4 border-blue-500 pl-4 my-4">
          <h3 class="text-lg font-semibold text-blue-700">2. Outlier Treatment</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <div>
              <h4 class="font-medium">Detection Methods:</h4>
              <ul class="list-disc pl-5 text-sm">
                <li>Z-score analysis</li>
                <li>IQR method</li>
                <li>Visual inspection</li>
              </ul>
            </div>
            <div>
              <h4 class="font-medium">Treatment Options:</h4>
              <ul class="list-disc pl-5 text-sm">
                <li>Capping/Winsorizing</li>
                <li>Transformation</li>
                <li>Removal</li>
              </ul>
            </div>
          </div>
        </div>

        <h3 class="text-xl font-semibold text-gray-800 mt-6">Practical Example</h3>
        <pre class="bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto mt-2"><code># Advanced cleaning with Pandas
def clean_data(df):
    # Handle missing values
    df['income'] = df['income'].fillna(df.groupby('education')['income'].transform('median'))
    
    # Remove outliers
    q1 = df['age'].quantile(0.25)
    q3 = df['age'].quantile(0.75)
    iqr = q3 - q1
    df = df[~((df['age'] < (q1 - 1.5*iqr)) | (df['age'] > (q3 + 1.5*iqr)))]
    
    # Standardize text
    df['country'] = df['country'].str.upper().str.strip()
    
    return df</code></pre>
      </div>
    `,
    date: "July 22, 2023",
    readTime: "12 min read",
    tags: ["Data Cleaning", "Pandas", "Preprocessing"],
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
  },
  {
    id: 3,
    title: "Feature Engineering for Machine Learning",
    excerpt: "Transform raw data into powerful features that boost model performance.",
    content: `
      <div class="space-y-6">
        <h2 class="text-2xl font-bold text-gray-800">The Art of Feature Engineering</h2>
        <p>Feature engineering is the process of transforming raw data into features that better represent the underlying problem to predictive models.</p>
        
        <div class="bg-purple-50 p-4 rounded-lg mt-4">
          <h3 class="text-lg font-semibold text-purple-800">Key Techniques</h3>
          <div class="grid md:grid-cols-2 gap-4 mt-3">
            <div>
              <h4 class="font-medium text-purple-700">1. Numerical Features</h4>
              <ul class="list-disc pl-5 text-sm mt-1">
                <li>Scaling (Standard, MinMax)</li>
                <li>Binning</li>
                <li>Log/Power transforms</li>
              </ul>
            </div>
            <div>
              <h4 class="font-medium text-purple-700">2. Categorical Features</h4>
              <ul class="list-disc pl-5 text-sm mt-1">
                <li>One-hot encoding</li>
                <li>Target encoding</li>
                <li>Embeddings</li>
              </ul>
            </div>
          </div>
        </div>

        <h3 class="text-xl font-semibold text-gray-800 mt-6">Temporal Feature Example</h3>
        <pre class="bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto mt-2"><code># Extract features from datetime
df['purchase_hour'] = df['timestamp'].dt.hour
df['purchase_dayofweek'] = df['timestamp'].dt.dayofweek
df['purchase_month'] = df['timestamp'].dt.month

# Cyclical encoding
df['hour_sin'] = np.sin(2*np.pi*df['purchase_hour']/24)
df['hour_cos'] = np.cos(2*np.pi*df['purchase_hour']/24)</code></pre>

        <div class="bg-blue-50 p-4 rounded-lg mt-6">
          <h3 class="text-lg font-semibold text-blue-800">Feature Selection Methods</h3>
          <table class="w-full mt-2">
            <thead class="bg-blue-100">
              <tr>
                <th class="p-2 text-left">Method</th>
                <th class="p-2 text-left">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b border-blue-200">
                <td class="p-2">Correlation Analysis</td>
                <td class="p-2">Remove highly correlated features</td>
              </tr>
              <tr class="border-b border-blue-200">
                <td class="p-2">Feature Importance</td>
                <td class="p-2">Tree-based model feature scores</td>
              </tr>
              <tr>
                <td class="p-2">PCA</td>
                <td class="p-2">Dimensionality reduction</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `,
    date: "August 5, 2023",
    readTime: "14 min read",
    tags: ["Feature Engineering", "Machine Learning", "Preprocessing"],
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=1385&q=80"
  },
  {
    id: 4,
    title: "Machine Learning Model Evaluation",
    excerpt: "Comprehensive guide to evaluating your ML models effectively.",
    content: `
      <div class="space-y-6">
        <h2 class="text-2xl font-bold text-gray-800">Model Evaluation Metrics</h2>
        <p>Choosing the right evaluation metric is crucial for assessing model performance accurately.</p>
        
        <div class="grid md:grid-cols-2 gap-6 mt-4">
          <div class="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
            <h3 class="text-lg font-semibold text-green-800">Classification Metrics</h3>
            <ul class="list-disc pl-5 space-y-1 mt-2">
              <li>Accuracy, Precision, Recall</li>
              <li>F1 Score, ROC-AUC</li>
              <li>Confusion Matrix</li>
              <li>Log Loss</li>
            </ul>
          </div>
          <div class="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
            <h3 class="text-lg font-semibold text-blue-800">Regression Metrics</h3>
            <ul class="list-disc pl-5 space-y-1 mt-2">
              <li>MAE, MSE, RMSE</li>
              <li>R² Score</li>
              <li>Adjusted R²</li>
              <li>MAPE</li>
            </ul>
          </div>
        </div>

        <h3 class="text-xl font-semibold text-gray-800 mt-6">Cross-Validation Techniques</h3>
        <div class="bg-gray-50 p-4 rounded-lg mt-2">
          <div class="grid md:grid-cols-3 gap-4">
            <div>
              <h4 class="font-medium">K-Fold</h4>
              <p class="text-sm mt-1">Standard approach with K splits</p>
            </div>
            <div>
              <h4 class="font-medium">Stratified</h4>
              <p class="text-sm mt-1">Preserves class distribution</p>
            </div>
            <div>
              <h4 class="font-medium">Time Series</h4>
              <p class="text-sm mt-1">Forward chaining validation</p>
            </div>
          </div>
        </div>

        <h3 class="text-xl font-semibold text-gray-800 mt-6">Implementation Example</h3>
        <pre class="bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto mt-2"><code>from sklearn.model_selection import cross_val_score
from sklearn.metrics import classification_report

# Cross-validation
scores = cross_val_score(model, X, y, cv=5, scoring='f1')

# Classification report
y_pred = model.predict(X_test)
print(classification_report(y_test, y_pred))</code></pre>
      </div>
    `,
    date: "August 20, 2023",
    readTime: "11 min read",
    tags: ["Model Evaluation", "Machine Learning", "Metrics"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
  },
  {
    id: 5,
    title: "Hyperparameter Tuning Methods",
    excerpt: "Optimize your model performance through systematic hyperparameter tuning.",
    content: `
      <div class="space-y-6">
        <h2 class="text-2xl font-bold text-gray-800">Hyperparameter Optimization</h2>
        <p>Systematic approaches to find the best model configurations.</p>
        
        <div class="grid md:grid-cols-3 gap-4 mt-4">
          <div class="bg-white p-4 rounded-lg shadow-xs border border-gray-200">
            <h4 class="font-medium text-blue-600">1. Grid Search</h4>
            <p class="text-sm mt-1">Exhaustive search over specified values</p>
          </div>
          <div class="bg-white p-4 rounded-lg shadow-xs border border-gray-200">
            <h4 class="font-medium text-blue-600">2. Random Search</h4>
            <p class="text-sm mt-1">Random sampling of parameter space</p>
          </div>
          <div class="bg-white p-4 rounded-lg shadow-xs border border-gray-200">
            <h4 class="font-medium text-blue-600">3. Bayesian Optimization</h4>
            <p class="text-sm mt-1">Probabilistic model-based approach</p>
          </div>
        </div>

        <h3 class="text-xl font-semibold text-gray-800 mt-6">Grid Search Example</h3>
        <pre class="bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto mt-2"><code>from sklearn.model_selection import GridSearchCV

param_grid = {
    'n_estimators': [50, 100, 200],
    'max_depth': [None, 5, 10],
    'min_samples_split': [2, 5, 10]
}

grid_search = GridSearchCV(
    estimator=RandomForestClassifier(),
    param_grid=param_grid,
    cv=5,
    scoring='accuracy'
)
grid_search.fit(X_train, y_train)

print("Best parameters:", grid_search.best_params_)</code></pre>

        <div class="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400 mt-6">
          <h3 class="text-lg font-semibold text-yellow-800">Best Practices</h3>
          <ul class="list-disc pl-5 space-y-1 mt-2">
            <li>Start with broad ranges then narrow down</li>
            <li>Use early stopping where possible</li>
            <li>Consider parallel computation</li>
            <li>Validate on holdout set</li>
          </ul>
        </div>
      </div>
    `,
    date: "September 3, 2023",
    readTime: "9 min read",
    tags: ["Hyperparameter Tuning", "Machine Learning", "Optimization"],
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
  }
];

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPost, setSelectedPost] = useState(null);

  const filteredPosts = blogPosts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen  py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Data Science <span className="text-blue-600">Insights</span>
          </h1>
          <p className="text-xl text-gray-800 max-w-2xl mx-auto">
            Expert articles on machine learning and data analysis
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-12 max-w-md mx-auto">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search articles or tags..."
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Blog Content */}
        {selectedPost ? (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Article Header */}
            <div className="relative">
              <img 
                src={selectedPost.image} 
                alt={selectedPost.title}
                className="w-full h-64 object-cover"
              />
              <button 
                onClick={() => setSelectedPost(null)}
                className="absolute top-4 left-4 bg-white/90 hover:bg-white text-gray-800 px-4 py-2 rounded-lg shadow-md flex items-center gap-2 transition-all"
              >
                <FaArrowLeft className="text-sm" />
                Back to articles
              </button>
            </div>
            
            {/* Article Content */}
            <div className="p-8">
              <div className="flex items-center text-sm text-gray-500 mb-4">
                <span className="flex items-center mr-4">
                  <FaCalendarAlt className="mr-1" />
                  {selectedPost.date}
                </span>
                <span className="flex items-center">
                  <FaClock className="mr-1" />
                  {selectedPost.readTime}
                </span>
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{selectedPost.title}</h1>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedPost.tags.map((tag, index) => (
                  <span 
                    key={index} 
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              <div 
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: selectedPost.content }}
              />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <article 
                key={post.id} 
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
                
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <span className="flex items-center mr-4">
                      <FaCalendarAlt className="mr-1" />
                      {post.date}
                    </span>
                    <span className="flex items-center">
                      <FaClock className="mr-1" />
                      {post.readTime}
                    </span>
                  </div>
                  
                  <h2 className="text-xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors">
                    <button onClick={() => setSelectedPost(post)} className="text-left">{post.title}</button>
                  </h2>
                  
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag, index) => (
                      <span 
                        key={index} 
                        className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <button 
                    onClick={() => setSelectedPost(post)}
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Read full article <FiExternalLink className="ml-1" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}