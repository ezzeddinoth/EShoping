import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ProductsService from '../../Service/ProductsService';
import APICall from '../../Component/APICall/APICall';
import './Main.css';
import ProductDetails from '../Products/ProductDetails/ProductDetails';
import All from './All/All';

export default function Main(props) {

    const [selectedProduct, setSelectedProduct] = useState();

    useEffect(() => {
        const fetchOrders = async () => {
            setAPI({
                res: await ProductsService.getProducts(),
                onSucceed: (res) => {
                    setProducts(res.data)
                }
            });
        }
        fetchOrders();
    }, [props])

    const [API, setAPI] = useState();
    const [products, setProducts] = useState();



    return (
        <div>
            {API && <APICall API={API} secured={true} setAPI={setAPI}></APICall>}
            <BrowserRouter >
                <Switch>
                    <Route exact path="/">
                        <All products={products} setSelectedProduct={setSelectedProduct}></All>
                    </Route>
                    <Route exact path="/home">
                        <All products={products} setSelectedProduct={setSelectedProduct}></All>
                    </Route>
                    <Route exact path="/product/:id">
                        <ProductDetails product={selectedProduct}></ProductDetails>
                    </Route>
                </Switch>
            </BrowserRouter>
        </div>
    );
}
