import React, { useState, useEffect } from 'react';
import { getCurrentUser } from '../api/FirestoreAPIs';
import { postJob, subscribeToJobs } from '../api/JobsAPI';
import './JobsComponent.scss';
import Footer from './common/Footer';
import Loader from './common/Loader';
import { toast } from 'react-toastify';

const JobsComponent = () => {
  const [user, setUser] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPostForm, setShowPostForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [jobForm, setJobForm] = useState({
    title: '',
    company: '',
    location: '',
    type: 'Full-time',
    description: '',
    requirements: '',
    salary: '',
    applicationUrl: ''
  });

  const userEmail = localStorage.getItem('userEmail');

  const fetchJobsFromAPI = async () => {
    try {
      console.log('Testing Indeed API with correct key...');
      
      const response = await fetch(
        'https://indeed12.p.rapidapi.com/company/Ubisoft/jobs?locality=us&start=1',
        {
          method: 'GET',
          headers: {
            'x-rapidapi-host': 'indeed12.p.rapidapi.com',
            'x-rapidapi-key': '46d9b17128mshf74b2bca3cc059ep1a4246jsndcb8f6ec95a6'
          }
        }
      );
      
      console.log('API Response Status:', response.status);
      
      if (response.ok) {
        const data = await response.json();
        console.log('API Data:', data);
        
        let apiJobs = [];
        if (Array.isArray(data)) {
          apiJobs = data;
        } else if (data.jobs) {
          apiJobs = data.jobs;
        } else if (data.data) {
          apiJobs = data.data;
        } else if (data.hits) {
          apiJobs = data.hits;
        }
        
        if (apiJobs.length > 0) {
          const formattedJobs = apiJobs.slice(0, 8).map((job, index) => ({
            id: `indeed-${index}`,
            title: job.title || job.jobTitle || 'Software Developer',
            company: job.company || job.companyName || 'Tech Company',
            location: job.location || job.jobLocation || 'Remote',
            type: job.jobType || job.employment_type || 'Full-time',
            description: job.description || job.jobDescription || 'Exciting opportunity to work with cutting-edge technologies.',
            requirements: job.requirements || job.qualifications || 'Experience with modern development tools',
            salary: job.salary || job.salaryRange || 'Competitive',
            applicationUrl: job.url || job.jobUrl || '#',
            postedBy: 'External',
            createdAt: job.datePosted || new Date().toISOString()
          }));
          
          return formattedJobs;
        }
      } else {
        console.error('API Error:', response.status, await response.text());
      }
      
      return [];
    } catch (error) {
      console.error('API Fetch Error:', error);
      return [];
    }
  };

  useEffect(() => {
    getCurrentUser(setUser);
    
    const unsubscribe = subscribeToJobs(async (userJobs) => {
      console.log('Real-time user jobs:', userJobs);
      
      // Try to fetch API jobs with your key
      const apiJobs = await fetchJobsFromAPI();
      
      // Enhanced mock data as fallback
      const mockJobs = apiJobs.length === 0 ? [
        {
          id: 'mock1',
          title: 'Senior React Developer',
          company: 'TechFlow Inc.',
          location: 'San Francisco, CA',
          type: 'Full-time',
          description: 'Join our team to build next-generation web applications using React, TypeScript, and modern development practices. Work on challenging projects with a collaborative team.',
          requirements: 'React, TypeScript, Redux, 4+ years experience',
          salary: '$130,000 - $170,000',
          applicationUrl: 'https://example.com/apply/react-dev',
          postedBy: 'External',
          createdAt: new Date().toISOString()
        },
        {
          id: 'mock2',
          title: 'Full Stack Engineer',
          company: 'StartupHub',
          location: 'Austin, TX',
          type: 'Full-time',
          description: 'Build scalable web applications from frontend to backend. Work with React, Node.js, and cloud technologies in a fast-paced startup environment.',
          requirements: 'React, Node.js, AWS, MongoDB, 3+ years experience',
          salary: '$110,000 - $150,000',
          applicationUrl: 'https://example.com/apply/fullstack',
          postedBy: 'External',
          createdAt: new Date(Date.now() - 86400000).toISOString()
        },
        {
          id: 'mock3',
          title: 'Frontend Developer',
          company: 'DesignCorp',
          location: 'New York, NY',
          type: 'Full-time',
          description: 'Create beautiful, responsive user interfaces using modern frontend technologies. Collaborate with designers and backend developers.',
          requirements: 'HTML, CSS, JavaScript, React, 2+ years experience',
          salary: '$90,000 - $120,000',
          applicationUrl: 'https://example.com/apply/frontend',
          postedBy: 'External',
          createdAt: new Date(Date.now() - 172800000).toISOString()
        },
        {
          id: 'mock4',
          title: 'Backend Developer',
          company: 'DataSystems',
          location: 'Seattle, WA',
          type: 'Full-time',
          description: 'Design and implement robust backend systems and APIs. Work with databases, microservices, and cloud infrastructure.',
          requirements: 'Python, Django, PostgreSQL, Docker, 3+ years experience',
          salary: '$115,000 - $145,000',
          applicationUrl: 'https://example.com/apply/backend',
          postedBy: 'External',
          createdAt: new Date(Date.now() - 259200000).toISOString()
        },
        {
          id: 'mock5',
          title: 'DevOps Engineer',
          company: 'CloudTech',
          location: 'Denver, CO',
          type: 'Full-time',
          description: 'Manage CI/CD pipelines, cloud infrastructure, and deployment automation. Ensure system reliability and scalability.',
          requirements: 'AWS, Docker, Kubernetes, Jenkins, 4+ years experience',
          salary: '$125,000 - $160,000',
          applicationUrl: 'https://example.com/apply/devops',
          postedBy: 'External',
          createdAt: new Date(Date.now() - 345600000).toISOString()
        },
        {
          id: 'mock6',
          title: 'Mobile Developer',
          company: 'AppStudio',
          location: 'Los Angeles, CA',
          type: 'Full-time',
          description: 'Develop cross-platform mobile applications using React Native. Create smooth, performant mobile experiences.',
          requirements: 'React Native, iOS, Android, 3+ years experience',
          salary: '$105,000 - $135,000',
          applicationUrl: 'https://example.com/apply/mobile',
          postedBy: 'External',
          createdAt: new Date(Date.now() - 432000000).toISOString()
        },
        
      ] : [];
      
      setJobs([...userJobs, ...apiJobs, ...mockJobs]);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handlePostJob = async (e) => {
    e.preventDefault();
    try {
      const jobData = {
        ...jobForm,
        postedBy: userEmail,
        posterName: user?.name || 'Anonymous',
        createdAt: new Date().toISOString(),
        id: Date.now().toString()
      };
      
      await postJob(jobData);
      toast.success('Job posted successfully!');
      setJobForm({
        title: '',
        company: '',
        location: '',
        type: 'Full-time',
        description: '',
        requirements: '',
        salary: '',
        applicationUrl: ''
      });
      setShowPostForm(false);
      // No need to call fetchJobs() - real-time subscription will update automatically
    } catch (error) {
      toast.error('Error posting job');
      console.error('Error posting job:', error);
    }
  };

  const filteredJobs = jobs.filter(job => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    job.location.toLowerCase().includes(locationFilter.toLowerCase())
  );

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="jobs-page">
      <div className="jobs-header">
        <h1>Job Opportunities</h1>
        <button 
          className="post-job-btn"
          onClick={() => setShowPostForm(!showPostForm)}
        >
          {showPostForm ? 'Cancel' : 'Post a Job'}
        </button>
      </div>

      {showPostForm && (
        <div className="job-post-form">
          <h3>Post a New Job</h3>
          <form onSubmit={handlePostJob}>
            <div className="form-row">
              <input
                type="text"
                placeholder="Job Title"
                value={jobForm.title}
                onChange={(e) => setJobForm({...jobForm, title: e.target.value})}
                required
              />
              <input
                type="text"
                placeholder="Company"
                value={jobForm.company}
                onChange={(e) => setJobForm({...jobForm, company: e.target.value})}
                required
              />
            </div>
            <div className="form-row">
              <input
                type="text"
                placeholder="Location"
                value={jobForm.location}
                onChange={(e) => setJobForm({...jobForm, location: e.target.value})}
                required
              />
              <select
                value={jobForm.type}
                onChange={(e) => setJobForm({...jobForm, type: e.target.value})}
              >
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
              </select>
            </div>
            <textarea
              placeholder="Job Description"
              value={jobForm.description}
              onChange={(e) => setJobForm({...jobForm, description: e.target.value})}
              required
            />
            <textarea
              placeholder="Requirements"
              value={jobForm.requirements}
              onChange={(e) => setJobForm({...jobForm, requirements: e.target.value})}
            />
            <div className="form-row">
              <input
                type="text"
                placeholder="Salary Range"
                value={jobForm.salary}
                onChange={(e) => setJobForm({...jobForm, salary: e.target.value})}
              />
              <input
                type="url"
                placeholder="Application URL"
                value={jobForm.applicationUrl}
                onChange={(e) => setJobForm({...jobForm, applicationUrl: e.target.value})}
                required
              />
            </div>
            <button type="submit" className="submit-job-btn">Post Job</button>
          </form>
        </div>
      )}

      <div className="jobs-filters">
        <input
          type="text"
          placeholder="Search jobs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <input
          type="text"
          placeholder="Filter by location..."
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
          className="location-input"
        />
      </div>

      <div className="jobs-list">
        {filteredJobs.length === 0 ? (
          <div className="no-jobs">No jobs found matching your criteria.</div>
        ) : (
          filteredJobs.map((job) => (
            <div key={job.id} className="job-card">
              <div className="job-header">
                <h3>{job.title}</h3>
                <span className="job-type">{job.type}</span>
              </div>
              <div className="job-company">{job.company}</div>
              <div className="job-location">{job.location}</div>
              <div className="job-salary">{job.salary}</div>
              <div className=
"job-description">
                {job.description?.substring(0, 200)}...
              </div>
              {job.requirements && (
                <div className="job-requirements">
                  <strong>Requirements:</strong> {job.requirements.substring(0, 150)}...
                </div>
              )}
              <div className="job-footer">
                <span className="job-posted">
                  Posted {new Date(job.createdAt).toLocaleDateString()}
                  {job.postedBy !== 'External' && ` by ${job.posterName}`}
                </span>
                <a 
                  href={job.applicationUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="apply-btn"
                >
                  Apply Now
                </a>
              </div>
            </div>
          ))
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default JobsComponent;
