import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setItems, setSelectedItem } from '../redux/actions/itemActions';
import { useNavigate } from 'react-router-dom';
import { dataItems } from '../dataItems';
import './List.css';

const List = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.items.items);
  const navigate = useNavigate();

  useEffect(() => {
    // Dispatch action to set items from dataItems
    dispatch(setItems(dataItems));
  }, [dispatch]);

  const handleClick = (item) => {
    dispatch(setSelectedItem(item));
    sessionStorage.setItem('selectedItem', JSON.stringify(item));
    navigate('/details');
  };

  return (
    <div className="container">
      <h1>List of Items</h1>
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Scan Name</th>
              <th>Target URL</th>
              <th>Scan Engine</th>
              <th>Status</th>
              <th>Rank</th>
              <th>Total Vulnerabilities</th>
              <th>Severity</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.scanName} onClick={() => handleClick(item)}>
                <td>{item.scanName}</td>
                <td>
                  <a href={item.targetUrl} target="_blank" rel="noopener noreferrer">
                    {item.targetUrl}
                  </a>
                </td>
                <td>{item.scanEngine}</td>
                <td>{item.status}</td>
                <td>{item.rank}</td>
                <td>{item.totalVulnerabilities}</td>
                <td>
                  <div className="severity">
                    <span className="badge badge-success">{item.severity.green}</span>
                    <span className="badge badge-warning">{item.severity.orange}</span>
                    <span className="badge badge-danger">{item.severity.red}</span>
                    <span className="badge badge-secondary">{item.severity.gray}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default List;
