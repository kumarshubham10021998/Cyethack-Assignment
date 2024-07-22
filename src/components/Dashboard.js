import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box, Chip, TextField, Button, Tabs, Tab, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, useMediaQuery, Menu, MenuItem, IconButton
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { addProfile, deleteProfile, setItems, updateProfile } from '../redux/actions/itemActions';
import data from '../data'; // Import the data from data.js

const Dashboard = () => {
  const items = useSelector((state) => state.items.items);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [tabValue, setTabValue] = useState('all');
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [newProfile, setNewProfile] = useState({
    scanName: '',
    targetURL: '',
    scanEngine: '',
    status: '',
    rank: '',
    totalVulnerabilities: '',
    severity: ''
  });
  const [errors, setErrors] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const isMobile = useMediaQuery('(max-width:600px)');

  useEffect(() => {
    // Initialize items from data.js when the component mounts
    dispatch(setItems(data));
  }, [dispatch]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditOpen(false);
  };

  const handleChange = (e) => {
    setNewProfile({ ...newProfile, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!newProfile.scanName) newErrors.scanName = 'Scan Name is required';
    if (!newProfile.targetURL) newErrors.targetURL = 'Target URL is required';
    if (!newProfile.scanEngine) newErrors.scanEngine = 'Scan Engine is required';
    if (!newProfile.status) newErrors.status = 'Status is required';
    if (!newProfile.rank) newErrors.rank = 'Rank is required';
    if (!newProfile.totalVulnerabilities) newErrors.totalVulnerabilities = 'Total Vulnerabilities is required';
    if (!newProfile.severity) newErrors.severity = 'Severity is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      const severityArray = newProfile.severity.split(',').map((sev) => parseInt(sev.trim(), 10));
      const profile = { ...newProfile, severity: severityArray };
      dispatch(addProfile(profile));
      handleClose();
      setNewProfile({
        scanName: '',
        targetURL: '',
        scanEngine: '',
        status: '',
        rank: '',
        totalVulnerabilities: '',
        severity: ''
      });
      setErrors({});
    }
  };

  const handleEditOpen = () => {
    setEditOpen(true);
    setOpen(false); // Close the add dialog
  };

  const handleEdit = () => {
    if (validateForm()) {
      const severityArray = newProfile.severity.split(',').map((sev) => parseInt(sev.trim(), 10));
      const updatedProfile = { ...newProfile, severity: severityArray };
      dispatch(updateProfile(selectedRow.id, updatedProfile)); // Pass the row ID to update
      handleClose();
      setNewProfile({
        scanName: '',
        targetURL: '',
        scanEngine: '',
        status: '',
        rank: '',
        totalVulnerabilities: '',
        severity: ''
      });
      setErrors({});
    }
  };

  const handleDelete = () => {
    if (selectedRow) {
      dispatch(deleteProfile(selectedRow.id)); // Pass the row ID to delete
    }
    handleClose();
  };

  const handleRowClick = (row) => {
    navigate(`/details/${row.scanName}`, { state: { profile: row } });
  };

  const handleMenuOpen = (event, row) => {
    event.stopPropagation(); // Prevent row click from triggering
    setAnchorEl(event.currentTarget);
    setSelectedRow(row);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedRow(null);
  };

  const filteredData = items
    .filter((row) => {
      if (tabValue === 'all') return true;
      if (tabValue === 'scheduled') return row.status.toLowerCase() === 'scheduled';
      if (tabValue === 'bin') return row.status.toLowerCase() === 'bin';
      return false;
    })
    .filter((row) =>
      row.scanName.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 1: return '#ff0000'; // High severity - Red
      case 2: return '#ff9900'; // Medium severity - Orange
      case 3: return '#ffff00'; // Low severity - Yellow
      default: return '#00ff00'; // Default/Unknown severity - Green
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant={isMobile ? "h6" : "h4"} gutterBottom>
        Dashboard
      </Typography>
      <Typography variant="h6">Welcome, {user?.username || 'Guest'}</Typography>
      <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', width: isMobile ? '100%' : '80%' }}>
          <TextField
            label="Search Scan Name"
            value={searchQuery}
            onChange={handleSearchChange}
            variant="outlined"
            size="small"
            fullWidth
            sx={{ flex: 1 }}
          />
          <SearchIcon sx={{ ml: 1 }} />
        </Box>
        <Button variant="contained" color="primary" onClick={handleClickOpen}>
          Add New Profile
        </Button>
      </Box>
      <Tabs value={tabValue} onChange={handleTabChange} indicatorColor="primary" textColor="dark" sx={{ justifyContent: 'flex-start' }}>
        <Tab value="all" label="All" sx={{ backgroundColor: tabValue === 'all' ? 'primary.main' : 'white', color: tabValue === 'all' ? 'white' : 'black' }} />
        <Tab value="scheduled" label="Scheduled Scan" sx={{ backgroundColor: tabValue === 'scheduled' ? 'primary.main' : 'white', color: tabValue === 'scheduled' ? 'white' : 'black' }} />
        <Tab value="bin" label="Bin" sx={{ backgroundColor: tabValue === 'bin' ? 'primary.main' : 'white', color: tabValue === 'bin' ? 'white' : 'black' }} />
      </Tabs>
      <TableContainer component={Paper} sx={{ overflowX: 'auto', mt: 2 }}>
        <Table aria-label="scan data table">
          <TableHead>
            <TableRow>
              <TableCell>Scan Name</TableCell>
              <TableCell>Target URL</TableCell>
              <TableCell>Scan Engine</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Rank</TableCell>
              <TableCell>Total Vulnerabilities</TableCell>
              <TableCell>Severity</TableCell>
              <TableCell>More</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((row, index) => (
              <TableRow key={index} onClick={() => handleRowClick(row)} style={{ cursor: 'pointer' }}>
                <TableCell>{row.scanName}</TableCell>
                <TableCell>{row.targetURL}</TableCell>
                <TableCell>{row.scanEngine}</TableCell>
                <TableCell>{row.status}</TableCell>
                <TableCell>{row.rank}</TableCell>
                <TableCell>{row.totalVulnerabilities}</TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', flexWrap: 'nowrap' }}>
                    {row.severity.map((severity, i) => (
                      <Chip
                        key={i}
                        label={severity}
                        sx={{
                          backgroundColor: getSeverityColor(severity),
                          borderRadius: '0px',
                        }}
                      />
                    ))}
                  </Box>
                </TableCell>
                <TableCell>
                  <IconButton onClick={(e) => handleMenuOpen(e, row)}>
                    <MoreVertIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleEditOpen}>Edit</MenuItem>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Profile</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill in the details to add a new profile.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            name="scanName"
            label="Scan Name"
            type="text"
            fullWidth
            value={newProfile.scanName}
            onChange={handleChange}
            error={!!errors.scanName}
            helperText={errors.scanName}
          />
          <TextField
            margin="dense"
            name="targetURL"
            label="Target URL"
            type="text"
            fullWidth
            value={newProfile.targetURL}
            onChange={handleChange}
            error={!!errors.targetURL}
            helperText={errors.targetURL}
          />
          <TextField
            margin="dense"
            name="scanEngine"
            label="Scan Engine"
            type="text"
            fullWidth
            value={newProfile.scanEngine}
            onChange={handleChange}
            error={!!errors.scanEngine}
            helperText={errors.scanEngine}
          />
          <TextField
            margin="dense"
            name="status"
            label="Status"
            type="text"
            fullWidth
            value={newProfile.status}
            onChange={handleChange}
            error={!!errors.status}
            helperText={errors.status}
          />
          <TextField
            margin="dense"
            name="rank"
            label="Rank"
            type="text"
            fullWidth
            value={newProfile.rank}
            onChange={handleChange}
            error={!!errors.rank}
            helperText={errors.rank}
          />
          <TextField
            margin="dense"
            name="totalVulnerabilities"
            label="Total Vulnerabilities"
            type="text"
            fullWidth
            value={newProfile.totalVulnerabilities}
            onChange={handleChange}
            error={!!errors.totalVulnerabilities}
            helperText={errors.totalVulnerabilities}
          />
          <TextField
            margin="dense"
            name="severity"
            label="Severity (comma separated)"
            type="text"
            fullWidth
            value={newProfile.severity}
            onChange={handleChange}
            error={!!errors.severity}
            helperText={errors.severity}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Add Profile
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={editOpen} onClose={handleClose}>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Update the details of the selected profile.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            name="scanName"
            label="Scan Name"
            type="text"
            fullWidth
            value={newProfile.scanName}
            onChange={handleChange}
            error={!!errors.scanName}
            helperText={errors.scanName}
          />
          <TextField
            margin="dense"
            name="targetURL"
            label="Target URL"
            type="text"
            fullWidth
            value={newProfile.targetURL}
            onChange={handleChange}
            error={!!errors.targetURL}
            helperText={errors.targetURL}
          />
          <TextField
            margin="dense"
            name="scanEngine"
            label="Scan Engine"
            type="text"
            fullWidth
            value={newProfile.scanEngine}
            onChange={handleChange}
            error={!!errors.scanEngine}
            helperText={errors.scanEngine}
          />
          <TextField
            margin="dense"
            name="status"
            label="Status"
            type="text"
            fullWidth
            value={newProfile.status}
            onChange={handleChange}
            error={!!errors.status}
            helperText={errors.status}
          />
          <TextField
            margin="dense"
            name="rank"
            label="Rank"
            type="text"
            fullWidth
            value={newProfile.rank}
            onChange={handleChange}
            error={!!errors.rank}
            helperText={errors.rank}
          />
          <TextField
            margin="dense"
            name="totalVulnerabilities"
            label="Total Vulnerabilities"
            type="text"
            fullWidth
            value={newProfile.totalVulnerabilities}
            onChange={handleChange}
            error={!!errors.totalVulnerabilities}
            helperText={errors.totalVulnerabilities}
          />
          <TextField
            margin="dense"
            name="severity"
            label="Severity (comma separated)"
            type="text"
            fullWidth
            value={newProfile.severity}
            onChange={handleChange}
            error={!!errors.severity}
            helperText={errors.severity}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleEdit} color="primary">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Dashboard;
