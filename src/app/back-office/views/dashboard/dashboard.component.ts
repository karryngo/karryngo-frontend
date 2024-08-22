import { Component, OnInit } from '@angular/core';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { Discussion, Message } from '../../../shared/entity/chat';
import { Package, PackageState } from '../../../shared/entity/package';
import { ChatService } from '../../../shared/service/back-office/chat.service';
import { PackageService } from '../../../shared/service/back-office/package.service';
import { ProviderService } from '../../../shared/service/back-office/provider.service';
import { UserService } from '../../../shared/service/user/user.service';
import { Provider } from '../../../shared/entity/provider';
import { Transaction, TransactionState } from '../../../shared/entity/transaction';
import { TransactionService } from '../../../shared/service/back-office/transaction.service';
import { getUiIconFromStatusPackage } from '../../../shared/utils/ui.utils';
import { EchartOptions } from '../../variables/echarts';

@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  unreadProjetList:{pkg:Package,transaction:Transaction,provider:Provider}[] =[];
  loading: boolean = true;
  echartSales = {};
  echartProduct= {};

  constructor(
    private packageService: PackageService,
    private transactionService:TransactionService,
    private userService:UserService,
    private chatRealTimeService:ChatService,
  ){}


  ngOnInit(): void {
  
    this.chatRealTimeService.getUnReadDiscussion()
    .subscribe((disc:Discussion)=>{
      let pack:Package;
      let transaction:Transaction;
      let provider:Provider;
      this.packageService.findPackageById(disc.idProject.toString())
      .then((value:Package)=>{
        pack=value;
        if(value.state==PackageState.SERVICE_IN_TRANSACTION_STATE)
          return this.userService.getUserById(value.idSelectedProvider)
        else return Promise.resolve(new Provider());
      })
      .then((value:Provider)=>{
        provider=value;
        return this.transactionService.getTransactionById(disc.idTransaction)           
      })
      .then((value:Transaction)=>{
        transaction=value;
        this.unreadProjetList.push({
          pkg:pack,
          transaction,
          provider
        })
      });      
    });

    //Call report
    this.reportWithCharts();
  }

  getPackageIcon(infos:{pkg:Package,transaction:Transaction,provider:Provider})
  {
    return getUiIconFromStatusPackage(infos.pkg,infos.transaction)
  }

  /**
   * This method is used to 
   * @param current_year number
   */
   reportWithCharts(current_year?: number){

    // this.progressRef.start();
    let responseData = EchartOptions.getDumpData();
    console.log(responseData);
    
    let dark_heading = "#c2c6dc";
    this.echartSales = {
      legend: {
        borderRadius: 0,
        orient: "horizontal",
        x: "right",
        data: ["Withdrawal", "Deposit"]
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
          data: responseData.sales.original.days,
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
          name: "Withdrawal",
          data: responseData.sales.original.data,
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
          name: "Deposit",
          data: responseData.purchases.original.data,

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

    
    this.echartProduct = {
      color: ["#6D28D9", "#8B5CF6", "#A78BFA", "#C4B5FD", "#7C3AED"],
      tooltip: {
        show: true,
        backgroundColor: "rgba(0, 0, 0, .8)"
      },
      formatter: function(params) {
        return `${params.name}: (${params.percent}%)`;
      },
      series: [
        {
          name: "Top Selling Products",
          type: "pie",
          radius: "50%",
          center: "50%",

          data: responseData.product_report.original,
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)"
            }
          }
        }
      ]
    };
    

    this.loading = false;
  }


}
