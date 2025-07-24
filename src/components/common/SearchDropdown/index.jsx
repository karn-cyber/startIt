import React, { useState, useEffect } from 'react';
import { getAllUsers, getStatus } from '../../../api/FirestoreAPIs';
import { subscribeToJobs } from '../../../api/JobsAPI';
import { useNavigate } from 'react-router-dom';
import './index.scss';

const SearchDropdown = ({ query, onClose }) => {
  const [results, setResults] = useState({
    users: [],
    posts: [],
    jobs: []
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (query.trim().length > 0) {
      searchAll(query);
    }
  }, [query]);

  const searchAll = async (searchQuery) => {
    setLoading(true);
    try {
      const searchTerm = searchQuery.toLowerCase();
      
      // Search users
      const users = await getAllUsers();
      const filteredUsers = users.filter(user => 
        user.name?.toLowerCase().includes(searchTerm) ||
        user.email?.toLowerCase().includes(searchTerm) ||
        user.headline?.toLowerCase().includes(searchTerm)
      ).slice(0, 3);

      // Search posts
      getStatus((posts) => {
        const filteredPosts = posts.filter(post =>
          post.status?.toLowerCase().includes(searchTerm) ||
          post.userName?.toLowerCase().includes(searchTerm)
        ).slice(0, 3);

        // Search jobs
        subscribeToJobs((jobs) => {
          const filteredJobs = jobs.filter(job =>
            job.title?.toLowerCase().includes(searchTerm) ||
            job.company?.toLowerCase().includes(searchTerm) ||
            job.location?.toLowerCase().includes(searchTerm)
          ).slice(0, 3);

          setResults({
            users: filteredUsers,
            posts: filteredPosts,
            jobs: filteredJobs
          });
          setLoading(false);
        });
      });

    } catch (error) {
      console.error('Search error:', error);
      setLoading(false);
    }
  };

  const handleUserClick = (user) => {
    navigate(`/profile/${user.email}`);
    onClose();
  };

  const handlePostClick = (post) => {
    navigate('/homepage', { state: { scrollToPost: post.id } });
    onClose();
  };

  const handleJobClick = (job) => {
    navigate('/jobs');
    onClose();
  };

  const hasResults = results.users.length > 0 || results.posts.length > 0 || results.jobs.length > 0;

  return (
    <div className="search-dropdown">
      {loading ? (
        <div className="search-loading">Searching...</div>
      ) : hasResults ? (
        <>
          {results.users.length > 0 && (
            <div className="search-section">
              <h4>People</h4>
              {results.users.map((user) => (
                <div key={user.id} className="search-item" onClick={() => handleUserClick(user)}>
                  <img 
                    src={user.profilePic || `https://ui-avatars.com/api/?name=${user.name || 'User'}&background=0a66c2&color=fff`}
                    alt={user.name}
                    className="search-avatar"
                  />
                  <div className="search-info">
                    <div className="search-name">{user.name || 'Anonymous User'}</div>
                    <div className="search-subtitle">{user.headline || user.email}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {results.posts.length > 0 && (
            <div className="search-section">
              <h4>Posts</h4>
              {results.posts.map((post) => (
                <div key={post.id} className="search-item" onClick={() => handlePostClick(post)}>
                  <div className="search-info">
                    <div className="search-name">{post.userName}</div>
                    <div className="search-subtitle">{post.status?.substring(0, 60)}...</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {results.jobs.length > 0 && (
            <div className="search-section">
              <h4>Jobs</h4>
              {results.jobs.map((job) => (
                <div key={job.id} className="search-item" onClick={() => handleJobClick(job)}>
                  <div className="search-info">
                    <div className="search-name">{job.title}</div>
                    <div className="search-subtitle">{job.company} • {job.location}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        <div className="search-no-results">No results found for "{query}"</div>
      )}
    </div>
  );
};

export default SearchDropdown;
