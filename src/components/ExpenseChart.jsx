import React from 'react';
import { useSelector } from 'react-redux';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

function ExpenseChart() {
  const expenses = useSelector(state => state.expenses.items);

  const categoryTotals = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {});

  
  const palette = [
    'rgba(99, 102, 241, 0.7)',
    'rgba(16, 185, 129, 0.7)',
    'rgba(234, 179, 8, 0.7)', 
    'rgba(239, 68, 68, 0.7)',    
      'rgba(20, 184, 166, 0.7)',   
    'rgba(168, 85, 247, 0.7)',   
    'rgba(59, 130, 246, 0.7)',   
  ];
  const paletteBorders = [
    'rgba(99, 102, 241, 1)',
    'rgba(16, 185, 129, 1)',
    'rgba(234, 179, 8, 1)',
    'rgba(239, 68, 68, 1)',
    'rgba(20, 184, 166, 1)',
    'rgba(168, 85, 247, 1)',
    'rgba(59, 130, 246, 1)',
  ];

  // Prepare data for chart
  const labels = Object.keys(categoryTotals);
  const values = Object.values(categoryTotals);
  const data = {
    labels,
    datasets: [
      {
        label: 'Amount (₹)',
        data: values,
        backgroundColor: values.map((_, i) => palette[i % palette.length]),
        borderColor: values.map((_, i) => paletteBorders[i % paletteBorders.length]),
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom', labels: { boxWidth: 14, boxHeight: 14 } },
      title: {
        display: true,
        text: 'Spending by Category',
        font: { size: 16 }
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || '';
            const value = Number(context.raw || 0);
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const pct = total ? ((value / total) * 100).toFixed(1) : '0.0';
            return `${label}: ₹${value.toFixed(2)} (${pct}%)`;
          }
        }
      }
    }
  };

  return (
    <div className="et-chart-wrap" style={{ width: '100%' }}>
      {labels.length === 0 ? (
        <p className="et-muted mb-0">No expenses to display in chart</p>
      ) : (
        <Pie data={data} options={options} />
      )}
    </div>
  );
}

export default ExpenseChart;