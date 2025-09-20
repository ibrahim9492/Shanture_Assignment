import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ReactECharts from 'echarts-for-react';
import { Container, Grid, Paper, Typography, CircularProgress, Box, Button, Alert } from '@mui/material';
import darkTheme from '../utils/echartsDarkTheme';
import { getRevenue, getRegionSales, getTopProducts, getTopCustomers, getAverageOrderValue } from '../services/api';

// Mock data fallback for testing (remove in production)
const mockRevenue = { totalRevenue: 15000 };
const mockRegionData = [
  { region: 'North', totalRevenue: 5000 },
  { region: 'South', totalRevenue: 6000 },
  { region: 'East', totalRevenue: 4000 },
];
const mockTopProducts = [
  { name: 'Product A', totalSales: 100 },
  { name: 'Product B', totalSales: 80 },
  { name: 'Product C', totalSales: 60 },
];
const mockTopCustomers = [
  { name: 'Customer X', totalSpent: 3000 },
  { name: 'Customer Y', totalSpent: 2500 },
  { name: 'Customer Z', totalSpent: 2000 },
];
const mockAvgOrderValue = { avgOrderValue: 125.50 };

const AnalyticsDashboard = ({ onLogout }) => {
  const [startDate, setStartDate] = useState(new Date('2024-01-01')); // Wider range for data
  const [endDate, setEndDate] = useState(new Date('2024-12-31'));
  const [data, setData] = useState(mockRevenue);
  const [regionData, setRegionData] = useState(mockRegionData);
  const [topProducts, setTopProducts] = useState(mockTopProducts);
  const [topCustomers, setTopCustomers] = useState(mockTopCustomers);
  const [avgOrderValue, setAvgOrderValue] = useState(mockAvgOrderValue);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      let fetchError = null;
      try {
        const [revenueRes, regionRes, productsRes, customersRes, avgOrderRes] = await Promise.all([
          getRevenue(startDate.toISOString(), endDate.toISOString()).catch(err => { fetchError = err; return mockRevenue; }),
          getRegionSales(startDate.toISOString(), endDate.toISOString()).catch(err => { fetchError = err; return mockRegionData; }),
          getTopProducts(startDate.toISOString(), endDate.toISOString()).catch(err => { fetchError = err; return mockTopProducts; }),
          getTopCustomers(startDate.toISOString(), endDate.toISOString()).catch(err => { fetchError = err; return mockTopCustomers; }),
          getAverageOrderValue(startDate.toISOString(), endDate.toISOString()).catch(err => { fetchError = err; return mockAvgOrderValue; }),
        ]);
        console.log('Fetched Data:', { revenueRes, regionRes, productsRes, customersRes, avgOrderRes }); // Log fetched data
        setData(revenueRes);
        setRegionData(regionRes);
        setTopProducts(productsRes);
        setTopCustomers(customersRes);
        setAvgOrderValue(avgOrderRes);
      } catch (err) {
        fetchError = err;
        console.error('Fetch All Error:', err); // Log overall error
        setData(mockRevenue);
        setRegionData(mockRegionData);
        setTopProducts(mockTopProducts);
        setTopCustomers(mockTopCustomers);
        setAvgOrderValue(mockAvgOrderValue);
      }
      if (fetchError) {
        const message = fetchError.message || 'Unknown error';
        if (message.includes('404')) {
          setError('Backend API endpoints not found (404). Using mock data. Check backend deployment.');
        } else if (message.includes('Unauthorized')) {
          setError('Unauthorized (401). Please log in again.');
          localStorage.removeItem('token');
          onLogout();
        } else {
          setError(`Fetch failed: ${message}. Using mock data.`);
        }
      }
      setLoading(false);
    };
    fetchData();
  }, [startDate, endDate, onLogout]);

  const revenueChartOptions = {
    ...darkTheme,
    xAxis: {
      type: 'category',
      data: ['Revenue'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [data?.totalRevenue || 0],
        type: 'bar',
        itemStyle: { color: '#90caf9' },
      },
    ],
    tooltip: {
      trigger: 'axis',
      backgroundColor: '#1d1d1d',
      textStyle: { color: '#ffffff' },
    },
  };

  const regionChartOptions = {
    ...darkTheme,
    series: [
      {
        type: 'pie',
        data: regionData.map((item) => ({
          value: item.totalRevenue,
          name: item.region,
        })),
        radius: '50%',
      },
    ],
    tooltip: {
      trigger: 'item',
      backgroundColor: '#1d1d1d',
      textStyle: { color: '#ffffff' },
    },
  };

  const topProductsChartOptions = {
    ...darkTheme,
    xAxis: {
      type: 'category',
      data: topProducts.map((item) => item.name),
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: topProducts.map((item) => item.totalSales),
        type: 'bar',
        itemStyle: { color: '#f48fb1' },
      },
    ],
    tooltip: {
      trigger: 'axis',
      backgroundColor: '#1d1d1d',
      textStyle: { color: '#ffffff' },
    },
  };

  const topCustomersChartOptions = {
    ...darkTheme,
    xAxis: {
      type: 'category',
      data: topCustomers.map((item) => item.name),
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: topCustomers.map((item) => item.totalSpent),
        type: 'bar',
        itemStyle: { color: '#ffca28' },
      },
    ],
    tooltip: {
      trigger: 'axis',
      backgroundColor: '#1d1d1d',
      textStyle: { color: '#ffffff' },
    },
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h4">Analytics Dashboard</Typography>
        <Button variant="contained" color="secondary" onClick={onLogout}>
          Logout
        </Button>
      </Box>
      {error && (
        <Alert severity="warning" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Paper sx={{ p: 2, backgroundColor: '#1d1d1d' }}>
            <Typography variant="h6">Select Date Range</Typography>
            <Box sx={{ mb: 2 }}>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                dateFormat="MM/dd/yyyy"
                className="custom-datepicker"
              />
            </Box>
            <Box>
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                dateFormat="MM/dd/yyyy"
                className="custom-datepicker"
              />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ p: 2, backgroundColor: '#1d1d1d' }}>
            <Typography variant="h6">Revenue Trend</Typography>
            {loading ? (
              <CircularProgress sx={{ color: '#90caf9' }} />
            ) : (
              <ReactECharts
                option={revenueChartOptions}
                style={{ height: '400px', width: '100%' }}
                theme="darkTheme"
              />
            )}
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ p: 2, backgroundColor: '#1d1d1d' }}>
            <Typography variant="h6">Region-wise Sales</Typography>
            {loading ? (
              <CircularProgress sx={{ color: '#90caf9' }} />
            ) : (
              <ReactECharts
                option={regionChartOptions}
                style={{ height: '400px', width: '100%' }}
                theme="darkTheme"
              />
            )}
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ p: 2, backgroundColor: '#1d1d1d' }}>
            <Typography variant="h6">Top Products</Typography>
            {loading ? (
              <CircularProgress sx={{ color: '#90caf9' }} />
            ) : (
              <ReactECharts
                option={topProductsChartOptions}
                style={{ height: '400px', width: '100%' }}
                theme="darkTheme"
              />
            )}
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ p: 2, backgroundColor: '#1d1d1d' }}>
            <Typography variant="h6">Top Customers</Typography>
            {loading ? (
              <CircularProgress sx={{ color: '#90caf9' }} />
            ) : (
              <ReactECharts
                option={topCustomersChartOptions}
                style={{ height: '400px', width: '100%' }}
                theme="darkTheme"
              />
            )}
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ p: 2, backgroundColor: '#1d1d1d' }}>
            <Typography variant="h6">Average Order Value</Typography>
            {loading ? (
              <CircularProgress sx={{ color: '#90caf9' }} />
            ) : (
              <Typography variant="h5" sx={{ color: '#90caf9' }}>
                ${avgOrderValue?.avgOrderValue?.toFixed(2) || 0}
              </Typography>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AnalyticsDashboard;