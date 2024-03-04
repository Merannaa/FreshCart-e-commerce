import logo from './logo.svg';
import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout/Layout'
import Home from './components/Home/Home'
import Products from './components/Products/Products'
import Category from './components/Category/Category'
import Signin from './components/Signin/Signin'
import Signup from './components/Signup/Signup'
import NotFound from './components/NotFound/NotFound';
import Cart from './components/Cart/Cart';
import Brands from './components/Brands/Brands'
import Checkout from './components/Checkout/Checkout';
import CounterContextProvider from './context/counterContext';
import UserContextProvider from './context/TokenContext';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Details from './components/Details/Details';
import CartContextProvider from './context/cartContext';
import Allorders from './components/allorders/allorders';
import Wishlist from './components/Wishlist/Wishlist';
import WishlistContextProvider from './context/wishlistContext';
import ForgetPassword from './components/ForgetPassword/ForgetPassword'
import VerifyPassword from './components/VerifyPassword/VerifyPassword'
import NewPassword  from './components/NewPassword/NewPassword'
import Profile from './components/Profile/Profile'
import { Toaster } from 'react-hot-toast';
import CategoryDetails from './components/CategoryDetails/CategoryDetails';

const router =createBrowserRouter([
  {path:'',element:<Layout/>,children:[
    {path:'',element:<Home/>},
    {path:'home',element:<ProtectedRoute><Home/></ProtectedRoute>},
    {path:'product',element:<ProtectedRoute><Products/></ProtectedRoute>},
    {path:'category',element:<ProtectedRoute><Category/></ProtectedRoute>},
    {path:'categorydetails/:id',element:<ProtectedRoute><CategoryDetails/></ProtectedRoute>},
    {path:'brands',element:<ProtectedRoute><Brands/></ProtectedRoute>},
    {path:'cart',element:<ProtectedRoute><Cart/></ProtectedRoute>},
    {path:'details/:id',element:<ProtectedRoute><Details/></ProtectedRoute>},
    {path:'checkout',element:<ProtectedRoute><Checkout/></ProtectedRoute>},
    {path:'allorders',element:<ProtectedRoute><Allorders/></ProtectedRoute>},
    {path:'wishlist',element:<ProtectedRoute><Wishlist/></ProtectedRoute>},
    {path:'profile',element:<ProtectedRoute><Profile/></ProtectedRoute>},
    {path:'forgetpassword',element:<ForgetPassword/>},
    {path:'verifypassword',element:<VerifyPassword/>},
    {path:'resetnewpassword',element:<NewPassword/>},
    {path:'signin',element:<Signin/>},
    {path:'signup',element:<Signup/>},
    {path:'*',element:<NotFound/>},
  ]}
])
function App() {

  return (
    <WishlistContextProvider>
<CartContextProvider>
    <UserContextProvider>
    <CounterContextProvider>
    <RouterProvider router={router}></RouterProvider>
    </CounterContextProvider>
    <Toaster position='top-right'/>
    </UserContextProvider>
    </CartContextProvider>
    </WishlistContextProvider>
    
  );
}

export default App;
