// ** Icon imports
import Login from 'mdi-material-ui/Login'
import HomeOutline from 'mdi-material-ui/HomeOutline'
import FormatLetterCase from 'mdi-material-ui/FormatLetterCase'
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'

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
      icon: Login,
      path: '/pages/login'
    },
    {
      title: 'Customers',
      icon: Login,
      path: '/customers'
    },
    {
      title: 'Inventory',
      icon: Login,
      path: '/inventory'
    },
    {
      title: 'Products',
      icon: Login,
      path: '/products'
    },
    {
      title: 'Suppliers',
      icon: Login,
      path: '/pages/login'
    },
    {
      title: 'Orders',
      icon: Login,
      path: '/pages/login'
    },
    {
      title: 'Invoices',
      icon: Login,
      path: '/pages/login'
    },
    {
      title: 'Sales',
      icon: Login,
      path: '/pages/login'
    },
    {
      sectionTitle: 'Accounting Cycle'
    },
    {
      title: 'Ledger Posting',
      icon: FormatLetterCase,
      path: '/typography'
    },
    {
      title: 'Financial Statements',
      icon: FormatLetterCase,
      path: '/typography'
    },
    {
      title: 'Financial Elements',
      icon: FormatLetterCase,
      path: '/typography'
    }
  ]
}

export default navigation
