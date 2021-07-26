import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Header from './components/homepage/header/Header';
import Footer from './components/homepage/footer/Footer';
import AllProduct from './components/homepage/content/allproduct/AllProduct';
import ProductDetail from './components/homepage/content/productdetail/ProductDetail';
import Homepage from './components/homepage/homepage/Homepage';
import Carousel from './components/homepage/homepage/carousel';
import ProductByCate from './components/homepage/content/productbycate/ProductByCate';
import LoginPage from './components/admin/login//Login';
import AdminSidebar from './components/admin/sidebar/Sidebar';
import AdminIndex from './components/admin';
import CategoryDashboard from './components/admin/category/CategoryDashboard';

function App() {
  return (
    <BrowserRouter>
      <Route exact path="/products">
        <Header />
        <AllProduct />
        <Footer />
      </Route>
      <Route exact path="/cate/:cateId">
        <Header />
        <ProductByCate />
        <Footer />
      </Route>
      <Route exact path="/product/:productId">
        <Header />
        <ProductDetail />
        <Footer />
      </Route>
      <Route exact path="/">
        <Header />
        <Homepage uriCall="/products" listTitle="Products" />
        <Footer />
      </Route>

      <div className="app-admin">
        <Route path="/admin">
          <AdminIndex />
        </Route>
        <Route exact path="/admin/cate">
          <CategoryDashboard />
        </Route>
        <Route exact path="/login">
          <LoginPage />
        </Route>
      </div>
    </BrowserRouter>

  );
}

export default App;
