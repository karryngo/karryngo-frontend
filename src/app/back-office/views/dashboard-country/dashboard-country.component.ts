import { Component, OnInit } from '@angular/core';
import { EchartOptions } from '../../variables/echarts';

@Component({
  selector: 'app-dashboard-country',
  templateUrl: './dashboard-country.component.html',
  styleUrls: ['./dashboard-country.component.scss']
})
export class DashboardCountryComponent implements OnInit {

  echartProduct= {};
  loading: boolean = true;
  current_date: Date;
  
  constructor() { }

  ngOnInit(): void {
    this.current_date =  new Date();
    this.reportWithCharts();
  }

  /**
   * This method is used to 
   * @param current_year number
   */
   reportWithCharts(current_year?: number){

    // this.progressRef.start();
    let responseData = EchartOptions.getDumpProduct();
    console.log(responseData);
    
    let dark_heading = "#c2c6dc";
        
    this.echartProduct = {
      legend: {
        borderRadius: 0,
        orient: "horizontal",
        x: "right",
        data: ["Manager", "Saler"]
      },
      grid: {
        left: "8px",
        right: "8px",
        bottom: "0",
        containLabel: true
      },
      tooltip: {
        show: true,

        backgroundColor: "rgba(0, 0, 0, .8)"
      },

      xAxis: [
        {
          type: "category",
          data: responseData.owner.original.days,
          axisTick: {
            alignWithLabel: true
          },
          splitLine: {
            show: false
          },
          axisLabel: {
            color: dark_heading,
            interval: 0,
            rotate: 30
          },
          axisLine: {
            show: true,
            color: dark_heading,

            lineStyle: {
              color: dark_heading
            }
          }
        }
      ],
      yAxis: [
        {
          type: "value",

          axisLabel: {
            color: dark_heading
            // formatter: "${value}"
          },
          axisLine: {
            show: false,
            color: dark_heading,

            lineStyle: {
              color: dark_heading
            }
          },
          min: 0,
          splitLine: {
            show: true,
            interval: "auto"
          }
        }
      ],

      series: [
        {
          name: "Manager",
          data: responseData.owner.original.data,
          label: { show: false, color: "#313030" },
          type: "bar",
          color: "#313030",
          smooth: true,
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowOffsetY: -2,
              shadowColor: "rgba(0, 0, 0, 0.3)"
            }
          }
        },
        {
          name: "Saler",
          data: responseData.saler.original.data,

          label: { show: false, color: "#d8ad1f" },
          type: "bar",
          barGap: 0,
          color: "#d8ad1f",
          smooth: true,
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowOffsetY: -2,
              shadowColor: "rgba(0, 0, 0, 0.3)"
            }
          }
        }
      ]
    };
    

    this.loading = false;
  }

}
