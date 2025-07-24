import React, { useState, useEffect } from 'react';
import './index.scss';

const NewsSection = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        // Using NewsAPI with your API key
        const response = await fetch(
          'https://newsapi.org/v2/top-headlines?country=us&category=technology&pageSize=5&apiKey=b62047fd97994db6a37c6e98fda606bd'
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch news');
        }
        
        const data = await response.json();
        setNews(data.articles || []);
      } catch (error) {
        console.error('Error fetching news:', error);
        // Enhanced fallback mock data
        setNews([
          {
            title: "AI Revolution Transforms Tech Industry",
            description: "Artificial intelligence continues to reshape how companies operate and innovate across all sectors...",
            url: "https://example.com/ai-news",
            urlToImage: null,
            publishedAt: new Date().toISOString()
          },
          {
            title: "Startup Funding Reaches Record Highs",
            description: "Venture capital investments surge as investors show confidence in emerging technologies...",
            url: "https://example.com/funding-news",
            urlToImage: null,
            publishedAt: new Date(Date.now() - 3600000).toISOString()
          },
          {
            title: "Cloud Computing Market Expansion",
            description: "Major cloud providers announce new services and infrastructure improvements...",
            url: "https://example.com/cloud-news",
            urlToImage: null,
            publishedAt: new Date(Date.now() - 7200000).toISOString()
          },
          {
            title: "Cybersecurity Trends for 2024",
            description: "Security experts outline key threats and protection strategies for the coming year...",
            url: "https://example.com/security-news",
            urlToImage: null,
            publishedAt: new Date(Date.now() - 10800000).toISOString()
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) {
    return (
      <div className="news-section">
        <h4>Trending News</h4>
        <div className="news-loading">Loading news...</div>
      </div>
    );
  }

  return (
    <div className="news-section">
      <h4>Trending News</h4>
      <div className="news-list">
        {news.slice(0, 4).map((article, index) => (
          <div key={index} className="news-item">
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              <h5>{article.title}</h5>
              <p>{article.description?.substring(0, 100)}...</p>
              <span className="news-time">
                {new Date(article.publishedAt).toLocaleDateString()}
              </span>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsSection;
