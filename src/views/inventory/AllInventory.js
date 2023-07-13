// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'

import { getAllProductsInInventoryRequest } from '../../store/reducers/inventoryReducer'

import { useDispatch, useSelector } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'

import TableCustom from 'src/custom-components/TableCustom'
import { useRouter } from 'next/router'
import AppRoutes from '../../configs/appRoutes'

const TabAllInventory = () => {
  const router = useRouter()

  // ** State

  const { productsInInventory } = useSelector(state => state.inventory)

  const [productsInInventoryLocal, setProductsInInventoryLocal] = useState(null)

  const dispatch = useDispatch()

  const getAllProductsInInventory = () => {
    try {
      dispatch(getAllProductsInInventoryRequest())
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
    getAllProductsInInventory()
  }, [])

  useEffect(() => {
    if (productsInInventory) {
      setProductsInInventoryLocal(productsInInventory)
    }
  }, [productsInInventory])

  const returnRows = () => {
    return productsInInventoryLocal && productsInInventoryLocal.length > 0
      ? productsInInventoryLocal.map(val => ({
          productName: val?.Product?.product_name,
          unitCost: val?.Product?.unit_cost,
          unitPrice: val?.Product?.unit_price,
          quantityInStock: `${val?.quantity_in_stock}`,
          product_id: val?.Product?.id
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
                },
                {
                  id: 'quantityInStock',
                  label: 'Quantity In Stock'
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

export default TabAllInventory
