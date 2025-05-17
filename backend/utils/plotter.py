import matplotlib
import seaborn as sns
import os
import numpy as np
from matplotlib import rcParams

# Use a non-interactive backend (Agg) for Matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt

# Set global style parameters
rcParams['figure.figsize'] = (12, 7)
rcParams['axes.spines.top'] = False
rcParams['axes.spines.right'] = False
rcParams['axes.titlepad'] = 20
rcParams['axes.labelpad'] = 10
sns.set_style("whitegrid")

GRAPH_FOLDER = 'graphs'
os.makedirs(GRAPH_FOLDER, exist_ok=True)

def generate_plot(df, graph_type, x_col, y_col=None, hue_col=None, palette='viridis'):
    """
    Generate various types of plots with enhanced design
    
    Parameters:
    - df: DataFrame containing the data
    - graph_type: Type of plot ('bar', 'line', 'scatter', 'pie', 'hist', 'box', 'violin')
    - x_col: Column name for x-axis
    - y_col: Column name for y-axis (optional for some plot types)
    - hue_col: Column name for color grouping (optional)
    - palette: Color palette to use (default: 'viridis')
    
    Returns:
    - Path to the saved image file
    """
    plt.figure()
    
    try:
        if graph_type == 'bar':
            ax = sns.barplot(x=x_col, y=y_col, data=df, hue=hue_col, palette=palette,
                            ci=None, estimator=np.mean)
            plt.xticks(rotation=45)
            plt.ylabel(y_col or 'Count')
            add_value_labels(ax)
            
        elif graph_type == 'line':
            if hue_col:
                ax = sns.lineplot(x=x_col, y=y_col, data=df, hue=hue_col, 
                                 palette=palette, marker='o')
            else:
                ax = plt.plot(df[x_col], df[y_col], marker='o')
            plt.ylabel(y_col)
            
        elif graph_type == 'scatter':
            ax = sns.scatterplot(x=x_col, y=y_col, data=df, hue=hue_col, 
                                palette=palette, s=100, alpha=0.7)
            add_trendline(df[x_col], df[y_col])
            
        elif graph_type == 'pie':
            counts = df[x_col].value_counts()
            colors = sns.color_palette(palette, len(counts))
            plt.pie(counts, labels=counts.index, autopct='%1.1f%%', 
                   colors=colors, startangle=90, wedgeprops={'edgecolor': 'white'})
            plt.axis('equal')
            
        elif graph_type == 'hist':
            ax = sns.histplot(x=df[x_col], kde=True, bins='auto', 
                             hue=hue_col, palette=palette, element='step')
            plt.xlabel(x_col)
            plt.ylabel('Frequency')
            
        elif graph_type == 'box':
            ax = sns.boxplot(x=x_col, y=y_col, data=df, hue=hue_col, 
                            palette=palette, showmeans=True,
                            meanprops={"marker":"o", "markerfacecolor":"white", 
                                      "markeredgecolor":"black", "markersize":"8"})
            plt.xticks(rotation=45)
            plt.ylabel(y_col)
            
        elif graph_type == 'violin':
            ax = sns.violinplot(x=x_col, y=y_col, data=df, hue=hue_col,
                               palette=palette, inner='quartile')
            plt.xticks(rotation=45)
            plt.ylabel(y_col)
            
        else:
            raise ValueError(f'Invalid graph type: {graph_type}')

        # Common formatting
        plt.title(f'{graph_type.capitalize()} Plot of {x_col}' + 
                 (f' vs {y_col}' if y_col else ''), pad=20)
        plt.xlabel(x_col)
        
        if hue_col and graph_type not in ['pie', 'hist']:
            plt.legend(title=hue_col, bbox_to_anchor=(1.05, 1), loc='upper left')
            
        plt.tight_layout()

        # Save the plot
        image_path = os.path.join(GRAPH_FOLDER, f'{graph_type}_plot.png')
        plt.savefig(image_path, dpi=300, bbox_inches='tight')
        plt.close()
        
        return image_path
        
    except Exception as e:
        plt.close()
        raise ValueError(f"Error generating plot: {str(e)}")

def add_value_labels(ax):
    """Add value labels on top of bars"""
    for p in ax.patches:
        height = p.get_height()
        ax.text(p.get_x() + p.get_width()/2., height + 0.01,
                f'{height:.2f}', ha='center', va='bottom')

def add_trendline(x, y):
    """Add a linear trendline to scatter plot"""
    z = np.polyfit(x, y, 1)
    p = np.poly1d(z)
    plt.plot(x, p(x), "r--", linewidth=1, alpha=0.5)