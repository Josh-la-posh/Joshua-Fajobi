import React, { PureComponent, Suspense } from "react";
import {BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Category from "./pages/Category";
import Cart from "./pages/Cart";
import PDP from "./pages/PDP";

class App extends PureComponent {

  render() {
    return (
      <BrowserRouter>
        <Suspense fallback={<Header />}>
          <Header />
          <Routes>
            <Route path="/Scandiweb/">
              <Route index element={<Category />} />
              <Route
                path="category/:category"
                element={<Category />}
              />
              <Route path="pdp/:id" element={<PDP />} />
              <Route path="cart" element={<Cart />} />
            </Route>
            <Route
              path="*"
              element={<Navigate to="/Scandiweb/" replace={true} />}
            />
          </Routes>
        </Suspense>
      </BrowserRouter>
    );
  }
}

export default App;