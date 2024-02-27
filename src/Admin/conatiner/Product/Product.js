import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../../user/UI/loader/Loader';
import ErrorMsg from '../../../user/UI/errorMsg/ErrorMsg';
import { setAlert } from '../../../user/redux/slice/Alert.slice';
import ProductForm from './ProductForm';
import { addProduct, deleteProduct, getProduct, updateProduct } from '../../../user/redux/slice/Product.slice';

export default function Product(props) {
    const [update, setUpdate] = useState(false);
    const product = useSelector(state => state.product);
    const category = useSelector((state) => state.category);
    const subcategory = useSelector((state) => state.subcategory);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProduct());
    }, []);

    const handleFormSubmit = (data) => {
        let localData = JSON.parse(localStorage.getItem("product"));
        let id = Math.floor(Math.random() * 1000);

        if (localData) {
            if (update) {
                dispatch(updateProduct(data));
                dispatch(setAlert({ text: 'Product successfully updated', color: 'success' }));
            } else {
                dispatch(addProduct(data));
                dispatch(setAlert({ text: 'Product successfully added', color: 'success' }));
            }
        } else {
            localStorage.setItem("product", JSON.stringify([{ id, ...data }]));
        }
        setUpdate(false);
    };

    const handleDelete = (data) => {
        dispatch(deleteProduct(data));
        dispatch(setAlert({ text: 'Product successfully deleted', color: 'success' }));
    };

    const handleUpdate = (data) => {
        setUpdate(data);
    };

    const columns = [
        {
            field: 'category_id', headerName: 'Category Name', flex: 2,
            renderCell: (params) => {
                const fData = category.category.filter((v) => v.id === params.row.category_id);
                return fData.length > 0 ? fData[0].category_name : null;
            }
        },
        {
            field: 'sub_id', headerName: 'Subcategory Name', flex: 2,
            renderCell: (params) => {
                const fData = subcategory.subcategory.filter((v) => v.id === params.row.sub_id);
                return fData.length > 0 ? fData[0].sub_name : null;
            }
        },
        { field: 'name', headerName: 'Product Name', flex: 2 },
        { field: 'price', headerName: 'Price (₹)', flex: 1 },
        {
            field: 'sizesAndStocks',
            headerName: 'Stock',
            flex: 1,
            valueGetter: (params) => {
                // Access the stock value from the first element of sizesAndStocks array
                return params.row.sizesAndStocks[0]?.stock || 0;
            }
        },
        { field: 'desc', headerName: 'Description', flex: 2 },
        {
            field: 'action', headerName: 'Action', flex: 1, sortable: false, disableColumnMenu: true,
            renderCell: (params) => (
                <>
                    <IconButton aria-label="edit" type='button' size='small' onClick={() => handleUpdate(params.row)} >
                        <EditIcon sx={{ fontSize: '20px' }} />
                    </IconButton>
                    <IconButton aria-label="delete" type='button' size='small' onClick={() => handleDelete(params.row)} >
                        <DeleteIcon sx={{ fontSize: '20px' }} />
                    </IconButton>
                </>
            )
        }
    ];

    return (
        <div className='data_table' style={{ height: 400, width: '100%' }}>
            {product.loading ?
                <Loader style={{ height: 'calc(100vh - 64px' }} /> :
                product.error ?
                    <ErrorMsg style={{ height: "calc(100vh - 64px" }} text={product.error} /> :
                    <>
                        <ProductForm onHandleSubmit={handleFormSubmit} updateData={update} />
                        <DataGrid
                            columns={columns}
                            rows={product.product}
                            initialState={{
                                pagination: {
                                    paginationModel: { page: 0, pageSize: 10 },
                                },
                            }}
                            pageSizeOptions={[10, 20]}
                        />
                    </>
            }
        </div>
    );
}
