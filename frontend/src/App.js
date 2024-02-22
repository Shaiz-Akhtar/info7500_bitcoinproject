import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar, Line, Pie } from 'react-chartjs-2';

const MyChart = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [transactionData, setTransactionData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/');
        setTransactionData(response.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  // Extracting relevant data//
  const transactionIds = transactionData.map(transaction => transaction.txId);
  const fees = transactionData.map(transaction => transaction.fee);
  const amounts = transactionData.map(transaction => transaction.amount);
  const sizes = transactionData.map(transaction => transaction.size);
  const vSizes = transactionData.map(transaction => transaction.vSize);
  const blockHeights = transactionData.map(transaction => transaction.blockHeight);
  const confirmations = transactionData.map(transaction => transaction.confirmations);

  // Data for pie chart
  const pieChartData = {
    labels: ['Fee', 'Amount', 'Size', 'VSize', 'Block Height', 'Confirmations'],
    datasets: [
      {
        label: 'Transaction Components',
        backgroundColor: [
          'rgba(255, 99, 132, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          'rgba(75, 192, 192, 0.7)',
          'rgba(153, 102, 255, 0.7)',
          'rgba(255, 159, 64, 0.7)'
        ],  
        borderWidth: 1,
        data: [fees.reduce((a, b) => a + b, 0),
               amounts.reduce((a, b) => a + b, 0),
               sizes.reduce((a, b) => a + b, 0),
               vSizes.reduce((a, b) => a + b, 0),
               blockHeights.reduce((a, b) => a + b, 0),
               confirmations.reduce((a, b) => a + b, 0)],
      },
    ],
  };

  // Data for other charts
  const feeChartData = {
    labels: transactionIds,
    datasets: [
      {
        label: 'Fee',
        backgroundColor: 'rgba(255, 99, 132, 0.7)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
        data: fees,
      },
    ],
  };

  const amountChartData = {
    labels: transactionIds,
    datasets: [
      {
        label: 'Amount',
        backgroundColor: 'rgba(54, 162, 235, 0.7)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
        data: amounts,
      },
    ],
  };

  const sizeChartData = {
    labels: transactionIds,
    datasets: [
      {
        label: 'Size',
        backgroundColor: 'rgba(255, 206, 86, 0.7)',
        borderColor: 'rgba(255, 206, 86, 1)',
        borderWidth: 1,
        data: sizes,
      },
    ],
  };

  const vSizeChartData = {
    labels: transactionIds,
    datasets: [
      {
        label: 'VSize',
        backgroundColor: 'rgba(75, 192, 192, 0.7)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        data: vSizes,
      },
    ],
  };

  const blockHeightChartData = {
    labels: transactionIds,
    datasets: [
      {
        label: 'Block Height',
        backgroundColor: 'rgba(153, 102, 255, 0.7)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
        data: blockHeights,
      },
    ],
  };

  const confirmationsChartData = {
    labels: transactionIds,
    datasets: [
      {
        label: 'Confirmations',
        backgroundColor: 'rgba(255, 159, 64, 0.7)',
        borderColor: 'rgba(255, 159, 64, 1)',
        borderWidth: 1,
        data: confirmations,
      },
    ],
  };
  const groupedBarChartData = {
    labels: transactionIds,
    datasets: [
      {
        label: 'Fee (BTC)',
        backgroundColor: 'rgba(255, 99, 132, 0.7)',
        borderColor: 'rgba(255, 99, 132, 1)', // Border color
        borderWidth: 2, // Increase thickness
        data: fees,
      },
      {
        label: 'Amount (BTC)',
        backgroundColor: 'rgba(54, 162, 235, 0.7)',
        borderColor: 'rgba(54, 162, 235, 1)', // Border color
        borderWidth: 2, // Increase thickness
        data: amounts,
      },
      {
        label: 'Size (Bytes)',
        backgroundColor: 'rgba(255, 206, 86, 0.7)',
        borderColor: 'rgba(255, 206, 86, 1)', // Border color
        borderWidth: 2, // Increase thickness
        data: sizes,
      },
      {
        label: 'VSize (Bytes)',
        backgroundColor: 'rgba(75, 192, 192, 0.7)',
        borderColor: 'rgba(75, 192, 192, 1)', // Border color
        borderWidth: 2, // Increase thickness
        data: vSizes,
      },
      {
        label: 'Block Height',
        backgroundColor: 'rgba(153, 102, 255, 0.7)',
        borderColor: 'rgba(153, 102, 255, 1)', // Border color
        borderWidth: 2, // Increase thickness
        data: blockHeights,
      },
      {
        label: 'Confirmations',
        backgroundColor: 'rgba(255, 159, 64, 0.7)',
        borderColor: 'rgba(255, 159, 64, 1)', // Border color
        borderWidth: 2, // Increase thickness
        data: confirmations,
      },
    ],
  };
  
  

  return (
    <div style={{ backgroundColor: 'white', padding: '20px' }}>
      <h2 style={{ color: 'black' }}>UTXO Transaction Data Visualization</h2>
      <p style={{ color: 'black' }}>The following charts represent various aspects of Unspent Transaction Output (UTXO) data.</p>
      <div>
        <h3 style={{ color: 'black' }}>Pie Chart</h3>
        <Pie
          data={pieChartData}
          options={{
            legend: {
              labels: {
                fontColor: 'black',
              }
            }
          }}
        />
        <p style={{ color: 'black' }}>This chart represents the total of all transaction components.</p>
      </div>
      <div>
        <h3 style={{ color: 'black' }}>Fee (BTC)</h3>
        <Bar
          data={feeChartData}
          options={{
            scales: {
              yAxes: [{
                scaleLabel: {
                  display: true,
                  labelString: 'Fee (BTC)',
                  fontColor: 'black',
                },
                ticks: {
                  fontColor: 'black',
                }
              }],
              xAxes: [{
                ticks: {
                  fontColor: 'black',
                }
              }]
            }
          }}
        />
        <p style={{ color: 'black' }}>This chart represents the fee (in BTC) for each transaction.</p>
      </div>
      <div>
        <h3 style={{ color: 'black' }}>Amount (BTC)</h3>
        <Line
          data={amountChartData}
          options={{
            scales: {
              yAxes: [{
                scaleLabel: {
                  display: true,
                  labelString: 'Amount (BTC)',
                  fontColor: 'black',
                },
                ticks: {
                  fontColor: 'black',
                }
              }],
              xAxes: [{
                ticks: {
                  fontColor: 'black',
                }
              }]
            }
          }}
        />
        <p style={{ color: 'black' }}>This chart represents the amount (in BTC) for each transaction.</p>
      </div>
      <div>
        <h3 style={{ color: 'black' }}>Size (Bytes)</h3>
        <Bar
          data={sizeChartData}
          options={{
            scales: {
              yAxes: [{
                scaleLabel: {
                  display: true,
                  labelString: 'Size (Bytes)',
                  fontColor: 'black',
                },
                ticks: {
                  fontColor: 'black',
                }
              }],
              xAxes: [{
                ticks: {
                  fontColor: 'black',
                }
              }]
            }
          }}
        />
        <p style={{ color: 'black' }}>This chart represents the size (in bytes) for each transaction.</p>
      </div>
      <div>
        <h3 style={{ color: 'black' }}>VSize (Bytes)</h3>
        <Line
          data={vSizeChartData}
          options={{
            scales: {
              yAxes: [{
                scaleLabel: {
                  display: true,
                  labelString: 'VSize (Bytes)',
                  fontColor: 'black',
                },
                ticks: {
                  fontColor: 'black',
                }
              }],
              xAxes: [{
                ticks: {
                  fontColor: 'black',
                }
              }]
            }
          }}
        />
        <p style={{ color: 'black' }}>This chart represents the virtual size (in bytes) for each transaction.</p>
      </div>
      <div>
        <h3 style={{ color: 'black' }}>Block Height</h3>
        <Bar
          data={blockHeightChartData}
          options={{
            scales: {
              yAxes: [{
                scaleLabel: {
                  display: true,
                  labelString: 'Block Height',
                  fontColor: 'black',
                },
                ticks: {
                  fontColor: 'black',
                }
              }],
              xAxes: [{
                ticks: {
                  fontColor: 'black',
                }
              }]
            }
          }}
        />
        <p style={{ color: 'black' }}>This chart represents the block height for each transaction.</p>
      </div>
      <div>
        <h3 style={{ color: 'black' }}>Confirmations</h3>
        <Bar
          data={confirmationsChartData}
          options={{
            scales: {
              yAxes: [{
                scaleLabel: {
                  display: true,
                  labelString: 'Confirmations',
                  fontColor: 'black',
                },
                ticks: {
                  fontColor: 'black',
                }
              }],
              xAxes: [{
                ticks: {
                  fontColor: 'black',
                }
              }]
            }
          }}
        />
        <p style={{ color: 'black' }}>This chart represents the number of confirmations for each transaction.</p>
      </div>
      <div>
        <h3 style={{ color: 'black' }}>Grouped Bar Chart</h3>
        <Bar
          data={groupedBarChartData}
          options={{
            scales: {
              xAxes: [{
                stacked: true,
                ticks: {
                  fontColor: 'black',
                }
              }],
              yAxes: [{
                stacked: true,
                scaleLabel: {
                  display: true,
                  labelString: 'Value',
                  fontColor: 'black',
                },
                ticks: {
                  beginAtZero: true,
                  fontColor: 'black',
                }
              }]
            },
            legend: {
              labels: {
                fontColor: 'black',
              }
            }
          }}
        />
        <p style={{ color: 'black' }}>This chart represents various transaction components.</p>
      </div>
    </div>
  );
};

export default MyChart;
