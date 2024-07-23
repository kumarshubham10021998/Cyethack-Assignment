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

const COLORS = ['#FF0000', '#FFA500', '#FFD700', '#00C49F']; // Red, Orange, Yellow, Green

const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'center',
  color: 'white',
}));

const Detail = () => {
  const location = useLocation();
  // For demonstration, use the first item from dataItems as the profile data
  const profile = location.state?.profile || dataItems[0];
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

  // Mapping severity levels from 'dataItems' to severity data
  const severityData = [
    { name: 'Critical', value: profile.severity?.red || 0 },
    { name: 'High', value: profile.severity?.orange || 0 },
    { name: 'Medium', value: profile.severity?.gray || 0 }, // Using gray for Medium if no yellow available
    { name: 'Low', value: profile.severity?.green || 0 },
  ];

  const totalVulnerabilities = profile.totalVulnerabilities || 0;
  const topVulnerabilities = profile.topVulnerabilities || [];
  const mostCommonCVEs = profile.mostCommonCVEs || [];

  console.log("Severity Data:", severityData); // Debugging line
  console.log("Selected View:", view); // Debugging line

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
        {severityData.map((data, index) => (
          <Grid item xs={6} sm={3} md={2.4} key={data.name}>
            <Item sx={{ backgroundColor: COLORS[index] }}>
              <Typography variant="h5">{data.value}</Typography>
              <Typography>{data.name}</Typography>
            </Item>
          </Grid>
        ))}
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
                                    : '#00C49F',
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
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Common Vulnerabilities and Exposures (CVE)</TableCell>
                    <TableCell align="right">Count</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {mostCommonCVEs.map((cve, index) => (
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

export default Detail;

// Sample dataItems
export const dataItems = [
  {
    scanName: 'Itsecgames active scanning from VM',
    targetUrl: 'http://www.itsecgames.com/',
    scanEngine: 'Engine - Jan 10',
    status: 'Completed',
    rank: 'B',
    totalVulnerabilities: 212,
    severity: { green: 5, orange: 78, red: 99, gray: 30 },
  },
  // Other data items...
];
