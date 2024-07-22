import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  AppBar, Toolbar, Typography, Box, Grid, Paper, ToggleButton, ToggleButtonGroup,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow
} from '@mui/material';
import {
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { styled } from '@mui/system';

const COLORS = ['#00C49F', '#FFBB28', '#FF8042', '#FF0000'];

const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'center',
  color: 'white',
}));

const Details = () => {
  const location = useLocation();
  const { profile } = location.state;
  const [alignment, setAlignment] = useState('home');
  const [view, setView] = useState('vulnerabilities');

  const handleAlignment = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };

  const handleViewChange = (event, newView) => {
    if (newView !== null) {
      setView(newView);
    }
  };

  const severityData = [
    { name: 'Low', value: profile.severity[3] || 0 },
    { name: 'Medium', value: profile.severity[2] || 0 },
    { name: 'High', value: profile.severity[1] || 0 },
    { name: 'Critical', value: profile.severity[0] || 0 },
  ];

  const totalVulnerabilities = profile.totalVulnerabilities || 0;
  const topVulnerabilities = profile.topVulnerabilities || [];

  return (
    <Box sx={{ flexGrow: 1, mt: '5%' }}>
      <AppBar position="static" sx={{ backgroundColor: 'white', color: 'black' }}>
        <Toolbar>
          <ToggleButtonGroup
            value={alignment}
            exclusive
            onChange={handleAlignment}
            aria-label="text alignment"
            size="small"
            sx={{ flexGrow: 1, justifyContent: 'flex-start' }}
          >
            <ToggleButton value="home" aria-label="home" sx={{ backgroundColor: alignment === 'home' ? 'primary.main' : 'default' }}>
              Home
            </ToggleButton>
            <ToggleButton value="scanner" aria-label="scanner result" sx={{ backgroundColor: alignment === 'scanner' ? 'primary.main' : 'default' }}>
              Scanner Result
            </ToggleButton>
            <ToggleButton value="report" aria-label="report" sx={{ backgroundColor: alignment === 'report' ? 'primary.main' : 'default' }}>
              Report
            </ToggleButton>
          </ToggleButtonGroup>
        </Toolbar>
      </AppBar>

      <Grid container spacing={2} sx={{ p: 2, mt: 2 }}>
        <Grid item xs={6} sm={3} md={2.4}>
          <Item sx={{ backgroundColor: '#800080' }}>
            <Typography variant="h5">{totalVulnerabilities}</Typography>
            <Typography>Total Vulnerabilities</Typography>
          </Item>
        </Grid>
        <Grid item xs={6} sm={3} md={2.4}>
          <Item sx={{ backgroundColor: '#FF0000' }}>
            <Typography variant="h5">{profile.severity[0]}</Typography>
            <Typography>Critical</Typography>
          </Item>
        </Grid>
        <Grid item xs={6} sm={3} md={2.4}>
          <Item sx={{ backgroundColor: '#FFA500' }}>
            <Typography variant="h5">{profile.severity[1]}</Typography>
            <Typography>High</Typography>
          </Item>
        </Grid>
        <Grid item xs={6} sm={3} md={2.4}>
          <Item sx={{ backgroundColor: '#FFD700' }}>
            <Typography variant="h5">{profile.severity[2]}</Typography>
            <Typography>Medium</Typography>
          </Item>
        </Grid>
        <Grid item xs={6} sm={3} md={2.4}>
          <Item sx={{ backgroundColor: '#008000' }}>
            <Typography variant="h5">{profile.severity[3]}</Typography>
            <Typography>Low</Typography>
          </Item>
        </Grid>
      </Grid>

      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Severity Distribution (Pie Chart)
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={severityData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  label
                >
                  {severityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Severity Distribution (Bar Chart)
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={severityData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#8884d8">
                  {severityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>

      <Box sx={{ mt: 2 }}>
        <ToggleButtonGroup
          value={view}
          exclusive
          onChange={handleViewChange}
          aria-label="view toggle"
          sx={{ mb: 2 }}
        >
          <ToggleButton value="vulnerabilities" aria-label="top vulnerabilities">
            Top Vulnerabilities
          </ToggleButton>
          <ToggleButton value="cve" aria-label="most common CVE">
            Most Common CVE
          </ToggleButton>
        </ToggleButtonGroup>

        {view === 'vulnerabilities' ? (
          <Paper>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Severity</TableCell>
                    <TableCell>Top Vulnerabilities</TableCell>
                    <TableCell align="right">Most Common CVE</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {topVulnerabilities.map((vulnerability, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Typography
                          sx={{
                            display: 'inline-block',
                            px: 2,
                            py: 1,
                            borderRadius: '12px',
                            backgroundColor:
                              vulnerability.severity === 'Critical'
                                ? '#FF0000'
                                : vulnerability.severity === 'High'
                                  ? '#FFA500'
                                  : vulnerability.severity === 'Medium'
                                    ? '#FFD700'
                                    : '#008000',
                            color: 'white',
                          }}
                        >
                          {vulnerability.severity}
                        </Typography>
                      </TableCell>
                      <TableCell>{vulnerability.description}</TableCell>
                      <TableCell align="right">{vulnerability.cveCount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        ) : (
          <Paper>
            {/* Render the CVE details here */}
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Common Vulnerabilities and Exposures (CVE)</TableCell>
                    <TableCell align="right">Count</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* Replace the following with actual CVE data */}
                  {profile.mostCommonCVEs.map((cve, index) => (
                    <TableRow key={index}>
                      <TableCell>{cve.name}</TableCell>
                      <TableCell align="right">{cve.count}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        )}
      </Box>
    </Box>
  );
};

export default Details;
