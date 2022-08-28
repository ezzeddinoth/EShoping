import React, { useEffect, useState } from 'react';
import APICall from '../../Component/APICall/APICall'
import Dialog from '../../Component/Dialog/Dialog'
import Table from '../../Component/Table/TableRoot/TableRoot'
import ProductsService from '../../Service/ProductsService';
import Header from '../Header/Header';
import './Products.css';

export default function Products(props) {

    useEffect(() => {
        const fetchProducts = async () => {
            setAPI({
                res: await ProductsService.getProducts(),
                onSucceed: (res) => {
                    setProducts(res.data)
                }
            });
        }
        fetchProducts();
    }, [])

    const serach = async () => {
        setAPI({
            res: await ProductsService.getProducts(),
            onSucceed: (res) => {
                setProducts(res.data)
            }
        });
    }

    const [API, setAPI] = useState();
    const [products, setProducts] = useState();
    const [tableState, setTableState] = useState();
    const [deleteId, setDeleteId] = useState();

    const columns = [
        {
            Header: "ProductId",
            Accessor: "productId",
            ColumnType: "TextField_Integer",
            Editable: false
        },
        {
            Header: "Name",
            Accessor: "name",
            Required: true,
        },
        {
            Header: "productType",
            Accessor: "productType"
        },
        {
            Header: "numberOfItems",
            Accessor: "numberOfItems",
            ColumnType: "TextField_Integer"
        },
        {
            Header: "describtion",
            Accessor: "describtion",
            ColumnType: "text"
        },
        {
            Header: "photo",
            Accessor: "photo",
            ColumnType: "photo"
        },
        {
            Header: "price",
            Accessor: "price",
            ColumnType: "TextField_Integer"
        }]

    const createProduct = async (product) => {
        setAPI({
            res: await ProductsService.saveProduct(product),
            onSucceed: (res) => {
                serach();
            }
        });
    }

    const updateProduct = async (product) => {
        setAPI({
            res: await ProductsService.updateProduct(product),
            onSucceed: (res) => {
                serach();
            }
        });
    }

    const toDeleteProduct = (product) => {
        setDeleteId(product.productId)
    }

    const deleteProduct = async () => {
        setAPI({
            res: await ProductsService.deleteProduct(deleteId),
            onSucceed: (res) => {  
                serach();
            }
        });
        closeDeleteDialog();
    }

    const closeDeleteDialog = () => {
        setDeleteId(null);
    }

    return (
        <div className='products'>
            <Header btn_back={true}></Header>
            {API && <APICall API={API} secured={true} setAPI={setAPI}></APICall>}
            {products && <div className='productTable'><Table tableState={tableState} setTableState={setTableState}
                editableRows={true} createRow={createProduct} updateRow={updateProduct} data={products} columns={columns}
                deleteRow={toDeleteProduct} ></Table></div>}
            {deleteId && <Dialog Message={"Do you want to delete this product permanently?"}
                showOk={true} buttonOK={deleteProduct} showCancel={true} buttonCancel={closeDeleteDialog}></Dialog>}
        </div>
    );
}
