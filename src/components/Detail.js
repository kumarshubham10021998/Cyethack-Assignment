import React from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Typography, Paper, Chip, Divider } from '@mui/material';
import { PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

const Detail = () => {
  const location = useLocation();
  const { profile } = location.state || {};

  if (!profile) {
    return (
      <Box sx={{ p: 2 }}>
        <Typography variant="h6">Profile not found</Typography>
      </Box>
    );
  }

  const COLORS = ['#ff0000', '#ff9900', '#ffcc00', '#33cc33'];

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Profile Details
      </Typography>
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6">Scan Name: {profile.scanName}</Typography>
        <Typography variant="h6">Target URL: {profile.targetURL}</Typography>
        <Typography variant="h6">Scan Engine: {profile.scanEngine}</Typography>
        <Typography variant="h6">Status: {profile.status}</Typography>
        <Typography variant="h6">Rank: {profile.rank}</Typography>
        <Typography variant="h6">Total Vulnerabilities: {profile.totalVulnerabilities}</Typography>
        <Typography variant="h6">Severity:</Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
          {profile.severity.map((severity, index) => (
            <Chip
              key={index}
              label={severity}
              sx={{
                backgroundColor: getSeverityColor(severity),
                margin: '2px',
              }}
            />
          ))}
        </Box>
        <Divider sx={{ my: 2 }} />
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={[
                { name: 'Critical', value: profile.severity[0] },
                { name: 'High', value: profile.severity[1] },
                { name: 'Medium', value: profile.severity[2] },
                { name: 'Low', value: profile.severity[3] }
              ]}
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              label
            >
              {COLORS.map((color, index) => (
                <Cell key={`cell-${index}`} fill={color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
        <Divider sx={{ my: 2 }} />
        <Typography variant="h6" gutterBottom>
          Top Vulnerabilities
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={profile.topVulnerabilities}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </Paper>
    </Box>
  );
};

const getSeverityColor = (severity) => {
  if (severity > 90) return '#ff0000';
  if (severity > 70) return '#ff9900';
  if (severity > 50) return '#ffcc00';
  return '#33cc33';
};

export default Detail;
