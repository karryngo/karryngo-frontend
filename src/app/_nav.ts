import { Provider } from './shared/entity/provider';
import { INavData } from '@coreui/angular';
import { Privilege } from './shared/entity/privilege';

export class SideMenu {

    static getNavItems(lang_menus, user: any){

        let navItems: INavData[] = [
        {
            title: true,
            name: 'MyKarryngo',
        }, 
        {
            name: lang_menus.home,
            url: '/mykarryngo',
            icon: 'fa fa-home'
        },
        
        {
            name: lang_menus.requests,
            url: '/post-requests',
            icon: 'icon-cursor',
            children: [
            {
                name: lang_menus.add_shipment,
                url: '/post-requests/packages',
                icon: 'none',
            },
            {
                name: lang_menus.add_transport,
                url: '/post-requests/trips/add/person',
                icon: 'none'
            },
            {
                name: lang_menus.add_traveler,
                url: '/post-requests/travellers/add/colis',
                icon: 'none'
            },
            {
                name: lang_menus.vehicle_hire,
                url: '/post-requests/rents/add/cars',
                icon: 'none'
            }
            ]
        },
        {
            // name: lang_menus.chat_with,
            // url: '/chat',
            // icon: 'icon-speech'
        },
        {
            name: lang_menus.notif,
            url: '/notifications',
            icon: 'icon-bell'
        },
        // {
        //   name: lang_menus.tracking,
        //   url: '/map',
        //   icon: 'icon-map'
        // },
        {
            name: lang_menus.account,
            url: '/account',
            icon: 'fa fa-user',
            children:[
                {
                    name: lang_menus.my_requests,
                    url: '/my-services/historic-services',
                    icon: 'none'
                },
                {
                    name: lang_menus.profile,
                    url: '/profil',
                    icon: 'none'
                },
                {
                    name: lang_menus.delete_account,
                    url: '/profil/delete-account',
                    icon: 'none'
                },
            ]
        },
        {
            name: lang_menus.wallet,
            url: '/walet',
            icon: 'fa fa-wallet',
            children: [
            {
                name: lang_menus.history,
                url: '/wallet/history',
                icon: 'none'
            },
            // {
            //   name: lang_menus.deposit,
            //   url: '/wallet/deposit',
            //   icon: 'none'
            // },
            // {
            //   name: lang_menus.withdrawal,
            //   url: '/wallet/withdrawal',
            //   icon: 'none'
            // },
            ]
        },
        {
            title: true,
            name: lang_menus.workspace,
        },
        {
            name: lang_menus.pro,
            url: '/carrier',
            icon: 'fa fa-truck',
            children: [
            {
                name: lang_menus.become_pro,
                url: '/carrier/be-carrier', 
                icon: 'none'
            },
            {
                name: lang_menus.profile,
                url: '/carrier/business-profile',
                icon: 'none'
            }
            // {
            //   name: lang_menus.myservices,
            //   url: '/my-services',
            //   icon: 'none'
            // },
            // {
            //   name: lang_menus.profile,
            //   url: '/carrier/settings',
            //   icon: 'none'
            // },
            ]
        },
        // {
        //   name: 'Requests',
        //   url: '/trips',
        //   icon: 'fa fa-bus',
        //   children: [
        //     {
        //       name: 'Pending',
        //       url: '/trips/vehicles',
        //       icon: 'none'
        //     },
        //     {
        //       name: 'Done',
        //       url: '/trips/settings',
        //       icon: 'none'
        //     },
        //   ]
        // },
        // {
        //     title: true,
        //     name: lang_menus.admin
        // },
        // {
        //     name: lang_menus.management,
        //     url: '/management',
        //     icon: 'fa fa-user-cog',
        //     children: [
        //     {
        //         name: lang_menus.service,
        //         url: '/management/services',
        //         icon: 'none'
        //     },
        //     {
        //         name: lang_menus.customers,
        //         url: '/management/costomers',
        //         icon: 'none'
        //     },
        //     {
        //         name: lang_menus.providers,
        //         url: '/management/providers',
        //         icon: 'none'
        //     },
        //     // {
        //     //   name: lang_menus.finances,
        //     //   url: '/management/finances',
        //     //   icon: 'none'
        //     // },
        //     // {
        //     //   name: lang_menus.tva,
        //     //   url: '/management/tva',
        //     //   icon: 'none'
        //     // },
        //     {
        //         name: lang_menus.countries,
        //         url: '/management/countries',
        //         icon: 'none'
        //     },
        //     ]
        // },
        // {
        //   title: true,
        //   name: 'Dashboard',
        // },
        // {
        //   name: 'Owner Overview',
        //   url: '/dashboard',
        //   icon: 'fa fa-bar-chart'
        // },
        // {
        //   name: 'Countries overview',
        //   url: '/dashboard-country',
        //   icon: 'fa fa-globe'
        // },
        // {
        //     divider: true
        // },
        // {
        //     name: 'Karryngo Support',
        //     url: 'http://karryngo.com/support/',
        //     icon: 'fa fa-question-circle',
        //     class: 'mt-auto',
        //     variant: 'dark',
        //     attributes: { target: '_blank', rel: 'noopener' }
        // },
        ];

        if(user && (user.accountType=="super_admin" || user.privileges?.includes(Privilege.ACCEPT_PROVIDER))){
            navItems.push(
                {
                    title: true,
                    name: lang_menus.admin
                },
                {
                    name: lang_menus.management,
                    url: '/management',
                    icon: 'fa fa-user-cog',
                    children: [
                        {
                            name: lang_menus.providers,
                            url: '/management/providers',
                            icon: 'none'
                        },
                    // {
                    //   name: lang_menus.finances,
                    //   url: '/management/finances',
                    //   icon: 'none'
                    // },
                    // {
                    //   name: lang_menus.tva,
                    //   url: '/management/tva',
                    //   icon: 'none'
                    // },
                    ]
                }
            )
        }
        if(user && user.accountType=="super_admin" ){
            navItems[10].children.push(
                {
                    name: lang_menus.service,
                    url: '/management/services',
                    icon: 'none'
                },
            )
            navItems[10].children.push(
                {
                    name: lang_menus.customers,
                    url: '/management/costomers',
                    icon: 'none'
                },
            )
            navItems[10].children.push(
                {
                    name: lang_menus.countries,
                    url: '/management/countries',
                    icon: 'none'
                },
            )
            navItems[10].children.push(
                {
                    name: lang_menus.messages,
                    url: '/management/messages',
                    icon: 'none'
                },
            )
            navItems[10].children.push(
                {
                    name: lang_menus.payment_transaction,
                    url: '/management/payment-transactions',
                    icon: 'none'
                },
            )
            navItems[10].children.push(
                {
                    name: lang_menus.service_statistics,
                    url: '/management/service-statistics',
                    icon: 'none'
                },
            )
            // navItems[10].children.push(
            //     {
            //         name: lang_menus.financial_statistics,
            //         url: '/management/financial-statistics',
            //         icon: 'none'
            //     },
            // )
            navItems[10].children.push(
                {
                    name: lang_menus.provider_statistics,
                    url: '/management/provider-statistics',
                    icon: 'none'
                },
            )
        }
        
        if(user && user.accountType=="admin_manager" ){
            navItems.push(
                {
                    title: true,
                    name: lang_menus.admin
                },
                {
                    name: lang_menus.country_management,
                    url: '/management',
                    icon: 'fas fa-globe',
                    children: [
                        {
                            name: lang_menus.list_providers,
                            url: '/management/country-providers', 
                            icon: 'none'
                        },
                        {
                            name: lang_menus.list_services,
                            url: '/management/country-services',
                            icon: 'none'
                        },
                        {
                            name: lang_menus.country_stats,
                            url: '/management/country-statistics',
                            icon: 'none'
                        },
                        {
                            name: lang_menus.list_provider_stats,
                            url: '/management/country-provider-statistics',
                            icon: 'none'
                        },
                        {
                            name: lang_menus.payment_transaction,
                            url: '/management/c-payment-transactions',
                            icon: 'none'
                        },
                    // {
                    //   name: lang_menus.finances,
                    //   url: '/management/finances',
                    //   icon: 'none'
                    // },
                    // {
                    //   name: lang_menus.tva,
                    //   url: '/management/tva',
                    //   icon: 'none'
                    // },
                    ]
                }
            )
        }
        //For Provider
        if(user && user.isAcceptedProvider){
            // navItems[8].children.push({
            //     name: lang_menus.myservices,
            //     url: '/carrier/list-of-my-offers',
            //     icon: 'none'
            // });
            navItems[8].children.push({
                name: lang_menus.findservices,
                url: '/carrier/find-new-services',
                icon: 'none'
            });
            navItems[8].children.push({
                name: lang_menus.offeredservices,
                url: '/carrier/my-selected-services',
                icon: 'none'
            });
            // navItems[8].children.push({
            //     name: lang_menus.newservice,
            //     url: '/carrier/create-new-service',
            //     icon: 'none'
            // });
            // navItems[8].children.push({
            //     name: lang_menus.profile,
            //     url: '/carrier/business-profile',
            //     icon: 'none'
            // });
            navItems[8].children.push({
                name: lang_menus.settings,
                url: '/carrier/settings',
                icon: 'none'
            });
        }


        return navItems;
    }

}
