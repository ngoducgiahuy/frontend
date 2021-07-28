import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';

import Header from './components/homepage/header/Header';
import AllProduct from './components/homepage/content/allproduct/AllProduct';
import ProductDetail from './components/homepage/content/productdetail/ProductDetail';
import Homepage from './components/homepage/homepage/Homepage';
import ProductByCate from './components/homepage/content/productbycate/ProductByCate';
import LoginPage from './components/admin/login//Login';
import AdminIndex from './components/admin';
import CategoryDashboard from './components/admin/category/CategoryDashboard';
import ProductDashboard from './components/admin/product/ProductDashboard';
import UserDashboard from './components/admin/user/UserDashboard';
import CartIndex from './components/homepage/cart/CartIndex';
import CheckOutIndex from './components/homepage/content/checkout/CheckOutIndex';
import OrderDashboard from './components/admin/order/OrderDashboard';

function App() {
  return (
    <BrowserRouter>
      <Route exact path="/products">
        <Header />
        <AllProduct />
      </Route>
      <Route exact path="/cate/:cateId">
        <Header />
        <ProductByCate />
      </Route>
      <Route exact path="/product/:productId">
        <Header />
        <ProductDetail />
      </Route>
      <Route exact path="/">
        <Header />
        <Homepage uriCall="/products" listTitle="Products" />
      </Route>
      <Route exact path="/cart">
        <Header />
        <CartIndex />
      </Route>
      <Route exact path="/checkout">
        <Header />
        <CheckOutIndex />
      </Route>

      <div className="app-admin">
        <Route path="/admin">
          <AdminIndex />
        </Route>
        <Route exact path="/admin/cate">
          <CategoryDashboard />
        </Route>
        <Route exact path="/admin/product">
          <ProductDashboard />
        </Route>
        <Route exact path="/admin/user">
          <UserDashboard />
        </Route>
        <Route exact path="/admin/order">
          <OrderDashboard />
        </Route>
        <Route exact path="/login">
          <LoginPage />
        </Route>
      </div>
    </BrowserRouter>

  );
}

export default App;
