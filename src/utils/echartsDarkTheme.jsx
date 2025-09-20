// src/utils/echartsDarkTheme.js
const darkTheme = {
  backgroundColor: '#1d1d1d', // Matches MUI paper background
  textStyle: {
    color: '#ffffff', // White text for labels
  },
  xAxis: {
    axisLine: { lineStyle: { color: '#b0bec5' } }, // Light gray axis
    axisLabel: { color: '#b0bec5' },
  },
  yAxis: {
    axisLine: { lineStyle: { color: '#b0bec5' } },
    axisLabel: { color: '#b0bec5' },
    splitLine: { lineStyle: { color: '#333' } }, // Subtle grid lines
  },
  series: [
    {
      itemStyle: {
        color: '#90caf9', // Matches MUI primary color
      },
    },
  ],
};

export default darkTheme;