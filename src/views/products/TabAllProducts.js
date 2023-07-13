// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import CardContent from '@mui/material/CardContent'

import { getMarketplaceProductsRequest } from '../../store/reducers/marketplaceReducer'

import { useDispatch, useSelector } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'

import TableCustom from 'src/custom-components/TableCustom'

const TabAllMarketplaceProducts = () => {
  // ** State

  const { marketplaceProducts } = useSelector(state => state.marketplace)

  const [marketplaceProductsLocal, setMarketplaceProductsLocal] = useState(null)

  const dispatch = useDispatch()

  const getAllMarketplaceProducts = () => {
    try {
      dispatch(getMarketplaceProductsRequest())
        .then(unwrapResult)
        .then(res => {
          console.log('Response at getOrdersByCategoryIdRequest', res)
        })
        .catch(err => {
          console.log('Error at getOrdersByCategoryIdRequest', err)
        })
    } catch (err) {
      console.log('Error at getData', err)
    }
  }

  useEffect(() => {
    getAllMarketplaceProducts()
  }, [])

  useEffect(() => {
    if (marketplaceProducts) {
      setMarketplaceProductsLocal(marketplaceProducts)
    }
  }, [marketplaceProducts])

  const returnRows = () => {
    return marketplaceProductsLocal && marketplaceProductsLocal.length > 0
      ? marketplaceProductsLocal.map(val => ({
          product_id: val?.id,
          supplier_id: val?.supplier_id,
          productName: val?.product_name,
          unitCost: val?.unit_cost,
          unitPrice: val?.unit_price
        }))
      : []
  }

  return (
    <CardContent>
      <form>
        <Grid container spacing={7}>
          <Grid item md={12} xs={12} sx={{ marginTop: 4.8, marginBottom: 3 }}>
            <TableCustom
              columns={[
                {
                  id: 'product_id',
                  label: 'Product ID'
                },
                {
                  id: 'supplier_id',
                  label: 'Supplier ID'
                },
                {
                  id: 'productName',
                  label: 'Product Name'
                },
                {
                  id: 'unitCost',
                  label: 'Unit Cost ($)'
                },
                {
                  id: 'unitPrice',
                  label: 'Unit Price ($)'
                }
              ]}
              rows={returnRows() && returnRows().length > 0 ? returnRows() : []}
            />
          </Grid>
        </Grid>
      </form>
    </CardContent>
  )
}

export default TabAllMarketplaceProducts
