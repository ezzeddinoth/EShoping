import React from 'react';
import { useHistory } from "react-router";
import Header from '../Header/Header';
import './Main.css';

export default function Main(props) {
    const history = useHistory();

    const onClickOrder = (e) => {
        history.push(e.target.value);
    }

    return (
        <div>
            <Header></Header>
            <div className="main">
                <div className="categs">
                <button className="categ"  value="orders" onClick={onClickOrder}>
                        Orders
                    </button>

                    <button className="categ" value="products"onClick={onClickOrder}>
                        Products
                    </button>

                    <button className="categ" value="person"onClick={onClickOrder}>
                        People
                    </button>
                </div>
            </div>
        </div>
    );
}
