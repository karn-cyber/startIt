import UserProfile from './pages/UserProfile';
import Settings from './pages/Settings';

// Add these routes to your existing routes
<Route path="/profile/:userEmail" element={<UserProfile />} />
<Route path="/settings" element={<Settings />} />
