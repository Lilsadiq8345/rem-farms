import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'; // Assuming you're using MUI for date/time picker
import { Button, TextField, Snackbar } from '@mui/material';

const LiveView = () => {
  const [liveSessions, setLiveSessions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [scheduledTime, setScheduledTime] = useState(null);
  const [callType, setCallType] = useState('instant');
  const [reminder, setReminder] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    const fetchLiveSessions = async () => {
      setLoading(true);
      try {
        const response = await axios.get('/api/live-sessions'); // API to fetch live sessions
        setLiveSessions(response.data);
      } catch (error) {
        console.error('Error fetching live sessions:', error);
        setSnackbarMessage('Failed to load live sessions.');
        setOpenSnackbar(true);
      } finally {
        setLoading(false);
      }
    };

    fetchLiveSessions();
  }, []);

  const handleScheduleCall = async () => {
    // Check if scheduled time is in the past
    if (scheduledTime && new Date(scheduledTime) < new Date()) {
      setSnackbarMessage('Scheduled time cannot be in the past.');
      setOpenSnackbar(true);
      return;
    }

    const callData = { callType, scheduledTime, reminder };

    try {
      await axios.post('/api/schedule-call', callData); // Replace with actual API for scheduling calls
      setSnackbarMessage('Call Scheduled Successfully!');
      setOpenSnackbar(true);
    } catch (error) {
      console.error('Error scheduling call:', error);
      setSnackbarMessage('Error scheduling the call.');
      setOpenSnackbar(true);
    }
  };

  const handleInstantCall = async () => {
    try {
      await axios.post('/api/start-instant-call'); // Replace with actual API for starting an instant call
      setSnackbarMessage('Instant Video Call Started!');
      setOpenSnackbar(true);
    } catch (error) {
      console.error('Error starting instant call:', error);
      setSnackbarMessage('Error starting the instant call.');
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Live Video Calls</h2>

      {loading ? (
        <div className="flex justify-center items-center">
          <div className="spinner">Loading...</div> {/* You can use a spinner here */}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {liveSessions.length === 0 ? (
              <p>No live sessions available.</p>
            ) : (
              liveSessions.map((session) => (
                <div key={session.id} className="p-4 bg-gray-100 rounded-lg shadow-md">
                  <img
                    src={session.thumbnailUrl || '/fallback-thumbnail.png'}
                    alt={session.title}
                    className="w-full h-32 object-cover rounded"
                    onError={(e) => e.target.src = '/fallback-thumbnail.png'} // Handle image load errors
                  />
                  <h3 className="text-lg font-semibold mt-4">{session.title}</h3>
                  <p>{session.description}</p>
                  <a
                    href={session.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 text-white px-4 py-2 rounded mt-4 inline-block"
                  >
                    Watch Now
                  </a>
                </div>
              ))
            )}
          </div>

          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-4">Schedule a Call</h3>
            <div className="flex flex-col space-y-4">
              <div>
                <label className="block font-medium">Call Type</label>
                <select
                  value={callType}
                  onChange={(e) => setCallType(e.target.value)}
                  className="border p-2 rounded w-full"
                >
                  <option value="instant">Instant Call</option>
                  <option value="scheduled">Scheduled Call</option>
                </select>
              </div>

              {callType === 'scheduled' && (
                <div>
                  <label className="block font-medium">Scheduled Time</label>
                  <DateTimePicker
                    value={scheduledTime}
                    onChange={setScheduledTime}
                    renderInput={(props) => <TextField {...props} />}
                  />
                </div>
              )}

              <div>
                <label className="block font-medium">Set a Reminder</label>
                <input
                  type="checkbox"
                  checked={reminder}
                  onChange={(e) => setReminder(e.target.checked)}
                  className="mr-2"
                />
                <span>Remind me before the call</span>
              </div>

              <div className="flex gap-4">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={callType === 'instant' ? handleInstantCall : handleScheduleCall}
                  className="mt-4"
                >
                  {callType === 'instant' ? 'Start Instant Call' : 'Schedule Call'}
                </Button>
              </div>
            </div>
          </div>
        </>
      )}

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
      />
    </div>
  );
};

export default LiveView;
