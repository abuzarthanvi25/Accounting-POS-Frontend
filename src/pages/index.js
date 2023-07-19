// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Icons Imports
import Poll from 'mdi-material-ui/Poll'
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
import BriefcaseVariantOutline from 'mdi-material-ui/BriefcaseVariantOutline'
import Warehouse from 'mdi-material-ui/Warehouse'
import AccountGroup from 'mdi-material-ui/AccountGroup'
import AppsBox from 'mdi-material-ui/AppsBox'
import TruckDelivery from 'mdi-material-ui/TruckDelivery'
import TruckDeliveryCash from 'mdi-material-ui/CashPlus'

// ** Custom Components Imports
import CardStatisticsVerticalComponent from 'src/@core/components/card-statistics/card-stats-vertical'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** Demo Components Imports
import StatisticsCard from 'src/views/dashboard/StatisticsCard'
import { useEffect, useState } from 'react'

import { getDashboardDataRequest } from '../store/reducers/dashboardReducer'

import { useDispatch, useSelector } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'

const Dashboard = () => {
  // ** Redux States
  const { dashboardData } = useSelector(state => state.dashboard)

  const [dashboardDataLocal, setDashboardDataLocal] = useState({})

  // ** State
  const dispatch = useDispatch()

  const getDashboardData = () => {
    try {
      dispatch(getDashboardDataRequest())
        .then(unwrapResult)
        .then(res => {
          console.log('Response at getDashboardData', res)
        })
        .catch(err => {
          console.log('Error at getDashboardData', err)
        })
    } catch (err) {
      console.log('Error at getDashboardData', err)
    }
  }

  useEffect(() => {
    getDashboardData()
  }, [])

  useEffect(() => {
    if (dashboardData) {
      setDashboardDataLocal(dashboardData)
    }
  }, [dashboardData])

  const data =
    dashboardDataLocal && Object.keys(dashboardDataLocal).length > 0
      ? [
          {
            stats: dashboardDataLocal?.number_of_customers,
            title: 'Customers',
            color: 'success',
            icon: <AccountGroup sx={{ fontSize: '1.75rem' }} />
          },
          {
            stats: dashboardDataLocal?.number_of_suppliers,
            title: 'Suppliers',
            color: 'primary',
            icon: <TruckDelivery sx={{ fontSize: '1.75rem' }} />
          },
          {
            stats: dashboardDataLocal?.products_in_inventory,
            color: 'warning',
            title: 'Inventory',
            icon: <Warehouse sx={{ fontSize: '1.75rem' }} />
          },
          {
            stats: dashboardDataLocal?.number_of_marketplace_products,
            color: 'info',
            title: 'Marketplace Products',
            icon: <AppsBox sx={{ fontSize: '1.75rem' }} />
          }
        ]
      : []

  return (
    <ApexChartWrapper>
      {dashboardDataLocal && Object.keys(dashboardDataLocal).length > 0 ? (
        <Grid container spacing={6}>
          <Grid item xs={12} md={12}>
            <StatisticsCard data={data} />
          </Grid>
          <Grid item xs={4}>
            <CardStatisticsVerticalComponent
              stats={`$${dashboardDataLocal?.total_capital + dashboardDataLocal?.net_income?.netIncome}`}
              title='Total Capital'
              color='success'
              subtitle='Including Net Income'
              icon={<CurrencyUsd />}
            />
          </Grid>
          <Grid item xs={4}>
            <CardStatisticsVerticalComponent
              stats={`$${dashboardDataLocal?.net_income?.netIncome}`}
              icon={<Poll />}
              color='success'
              title={`Total ${dashboardDataLocal?.net_income?.incomeStatus}`}
              subtitle='Overall'
            />
          </Grid>
          <Grid item xs={4}>
            <CardStatisticsVerticalComponent
              stats={`$${dashboardDataLocal?.total_inventory_worth}`}
              title='Total Inventory Worth'
              subtitle='Purchased Inventory worth'
              icon={<TruckDeliveryCash />}
            />
          </Grid>
          <Grid item xs={4}>
            <CardStatisticsVerticalComponent
              stats={`$${dashboardDataLocal?.total_revenue}`}
              color='warning'
              subtitle='Total Revenue (Overall)'
              title='Total Revenue'
              icon={<CurrencyUsd />}
            />
          </Grid>
          <Grid item xs={4}>
            <CardStatisticsVerticalComponent
              stats={dashboardDataLocal?.number_of_products_sold}
              title='Products Sold'
              subtitle='Number Of Products Sold (Overall)'
              icon={<TruckDeliveryCash />}
            />
          </Grid>
          <Grid item xs={4}>
            <CardStatisticsVerticalComponent
              stats={dashboardDataLocal?.number_of_orders}
              title='Orders'
              subtitle='Number Of Orders'
              icon={<BriefcaseVariantOutline />}
            />
          </Grid>
        </Grid>
      ) : null}
    </ApexChartWrapper>
  )
}

export default Dashboard
