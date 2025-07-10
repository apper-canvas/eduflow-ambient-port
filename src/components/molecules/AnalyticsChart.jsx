import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { cn } from '@/utils/cn';

const AnalyticsChart = ({ 
  type = 'bar', 
  data = [], 
  categories = [], 
  title = '',
  height = 300,
  className = '',
  color = '#4f46e5',
  colors = [],
  formatter = null,
  showLegend = true,
  showDataLabels = false,
  showGrid = true,
  ...props 
}) => {
  const getChartOptions = () => {
    const baseOptions = {
      chart: {
        type: type,
        fontFamily: 'Inter, sans-serif',
        toolbar: {
          show: false
        },
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 800
        }
      },
      colors: colors.length > 0 ? colors : [color],
      dataLabels: {
        enabled: showDataLabels,
        style: {
          fontSize: '12px',
          fontFamily: 'Inter, sans-serif',
          fontWeight: 500
        }
      },
      legend: {
        show: showLegend,
        position: 'bottom',
        fontSize: '12px',
        fontFamily: 'Inter, sans-serif',
        markers: {
          width: 8,
          height: 8,
          radius: 4
        }
      },
      title: {
        text: title,
        align: 'left',
        style: {
          fontSize: '16px',
          fontFamily: 'Plus Jakarta Sans, sans-serif',
          fontWeight: 600,
          color: '#1f2937'
        }
      },
      tooltip: {
        shared: true,
        intersect: false,
        style: {
          fontSize: '12px',
          fontFamily: 'Inter, sans-serif'
        },
        ...(formatter && {
          y: {
            formatter: formatter
          }
        })
      },
      responsive: [{
        breakpoint: 768,
        options: {
          chart: {
            height: height * 0.8
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
    };

    // Type-specific options
    switch (type) {
      case 'bar':
        return {
          ...baseOptions,
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: '60%',
              borderRadius: 4,
              borderRadiusApplication: 'end'
            }
          },
          xaxis: {
            categories: categories,
            labels: {
              style: {
                fontSize: '12px',
                fontFamily: 'Inter, sans-serif',
                colors: '#6b7280'
              }
            }
          },
          yaxis: {
            labels: {
              style: {
                fontSize: '12px',
                fontFamily: 'Inter, sans-serif',
                colors: '#6b7280'
              }
            }
          },
          grid: {
            show: showGrid,
            borderColor: '#f3f4f6',
            strokeDashArray: 0,
            xaxis: {
              lines: {
                show: false
              }
            }
          }
        };

      case 'line':
        return {
          ...baseOptions,
          stroke: {
            width: 3,
            curve: 'smooth'
          },
          markers: {
            size: 4,
            hover: {
              size: 6
            }
          },
          xaxis: {
            categories: categories,
            labels: {
              style: {
                fontSize: '12px',
                fontFamily: 'Inter, sans-serif',
                colors: '#6b7280'
              }
            }
          },
          yaxis: {
            labels: {
              style: {
                fontSize: '12px',
                fontFamily: 'Inter, sans-serif',
                colors: '#6b7280'
              }
            }
          },
          grid: {
            show: showGrid,
            borderColor: '#f3f4f6',
            strokeDashArray: 3
          }
        };

      case 'pie':
        return {
          ...baseOptions,
          labels: categories,
          plotOptions: {
            pie: {
              donut: {
                size: '60%'
              }
            }
          }
        };

      case 'area':
        return {
          ...baseOptions,
          stroke: {
            width: 2,
            curve: 'smooth'
          },
          fill: {
            type: 'gradient',
            gradient: {
              shadeIntensity: 1,
              opacityFrom: 0.3,
              opacityTo: 0.1,
              stops: [0, 90, 100]
            }
          },
          xaxis: {
            categories: categories,
            labels: {
              style: {
                fontSize: '12px',
                fontFamily: 'Inter, sans-serif',
                colors: '#6b7280'
              }
            }
          },
          yaxis: {
            labels: {
              style: {
                fontSize: '12px',
                fontFamily: 'Inter, sans-serif',
                colors: '#6b7280'
              }
            }
          },
          grid: {
            show: showGrid,
            borderColor: '#f3f4f6',
            strokeDashArray: 3
          }
        };

      default:
        return baseOptions;
    }
  };

  const getSeries = () => {
    if (type === 'pie') {
      return data;
    }
    
    if (Array.isArray(data) && data.length > 0 && typeof data[0] === 'object') {
      return data;
    }
    
    return [{
      name: title || 'Data',
      data: data
    }];
  };

  return (
    <div className={cn('w-full', className)} {...props}>
      <ReactApexChart
        options={getChartOptions()}
        series={getSeries()}
        type={type}
        height={height}
      />
    </div>
  );
};

export default AnalyticsChart;