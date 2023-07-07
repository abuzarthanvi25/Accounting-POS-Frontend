// ** Icon imports
import Login from 'mdi-material-ui/Login'
import HomeOutline from 'mdi-material-ui/HomeOutline'
import FormatLetterCase from 'mdi-material-ui/FormatLetterCase'
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'
import CashRegiser from 'mdi-material-ui/CashRegister'
import AccountGroup from 'mdi-material-ui/AccountGroup'
import Warehouse from 'mdi-material-ui/Warehouse'
import AppsBox from 'mdi-material-ui/AppsBox'
import TruckDelivery from 'mdi-material-ui/TruckDelivery'
import Cart from 'mdi-material-ui/Cart'
import Sales from 'mdi-material-ui/TagMultiple'
import Book from 'mdi-material-ui/Book'
import FileChart from 'mdi-material-ui/FileChart'
import Finance from 'mdi-material-ui/Finance'

const navigation = () => {
  return [
    {
      title: 'Dashboard',
      icon: HomeOutline,
      path: '/'
    },
    {
      title: 'Account Settings',
      icon: AccountCogOutline,
      path: '/account-settings'
    },
    {
      sectionTitle: 'Point Of Sale System'
    },
    {
      title: 'Point Of Sale',
      icon: CashRegiser,
      path: '/point-of-sales'
    },
    {
      title: 'Customers',
      icon: AccountGroup,
      path: '/customers'
    },
    {
      title: 'Inventory',
      icon: Warehouse,
      path: '/inventory'
    },
    {
      title: 'Products',
      icon: AppsBox,
      path: '/products'
    },
    {
      title: 'Suppliers',
      icon: TruckDelivery,
      path: '/suppliers'
    },
    {
      title: 'Orders',
      icon: Cart,
      path: '/orders'
    },
    {
      title: 'Sales and Invoices',
      icon: Sales,
      path: '/sales-and-invoices'
    },
    {
      sectionTitle: 'Accounting Cycle'
    },
    {
      title: 'Ledger Accounts',
      icon: Book,
      path: '/ledger-accounts'
    },
    {
      title: 'Financial Statements',
      icon: FileChart,
      path: '/financial-statements'
    },
    {
      title: 'Financial Elements',
      icon: Finance,
      path: '/financial-elements'
    }
  ]
}

export default navigation
