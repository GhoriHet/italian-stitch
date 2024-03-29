import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useState } from 'react';
import { useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import { useDispatch, useSelector } from 'react-redux';
import ClothCategoryForm from './ClothCategoryForm';
import { addClothCategory, deleteClothCategory, getClothCategory, updateClothCategory } from '../../../user/redux/slice/ClothCategorySlice';
import Loader from '../../../user/UI/loader/Loader';
import ErrorMsg from '../../../user/UI/errorMsg/ErrorMsg';
import { setAlert } from '../../../user/redux/slice/Alert.slice';

export default function ClothCategory(props) {
    const [mdata, setMdata] = useState([])
    const [update, setUpdate] = useState(false)

    const clothcategory = useSelector(state => state.clothcategory)
    const clothcat = useSelector((state) => state.clothcat)
    const clothsubcat = useSelector((state) => state.clothsubcat)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getClothCategory())
    }, [])

    const handleFormSubmit = (data) => {
        let localData = JSON.parse(localStorage.getItem("ClothCategory"));

        let id = Math.floor(Math.random() * 1000);

        if (localData) {
            if (update) {
                dispatch(updateClothCategory(data))
                dispatch(setAlert({ text: 'Product successfully updated', color: 'success' }))
            } else {
                dispatch(addClothCategory(data))
                dispatch(setAlert({ text: 'product successfully added', color: 'success' }))
            }

        } else {
            localStorage.setItem("ClothCategory", JSON.stringify([{ id, ...data }]))
            setMdata(localData)
        }
        setUpdate(false)
    }

    const handleDelete = (data) => {
        dispatch(deleteClothCategory(data))
        dispatch(setAlert({ text: 'Product successfully deleted', color: 'success' }))
    }

    const handleUpdate = (data) => {
        setUpdate(data)
    }

    const columns = [
        {
            field: 'category_id', headerName: 'Category Name', flex: 2,
            renderCell: (params) => {
                const fData = clothcat.clothcat.filter((v) => v.id === params.row.category_id)
                return fData.length > 0 ? fData[0].category_name : null
            }
        },
        {
            field: 'sub_id', headerName: 'Subcategory Name', flex: 2,
            renderCell: (params) => {
                const fData = clothsubcat.clothsubcat.filter((v) => v.id === params.row.sub_id)
                return fData.length > 0 ? fData[0].sub_name : null
            }
        },
        { field: 'name', headerName: 'Product Name', flex: 2 },
        { field: 'price', headerName: 'Price (₹)', flex: 1 },
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
            {clothcategory.loading ?
                <Loader style={{ height: 'calc(100vh - 64px' }} /> :
                clothcategory.error ?
                    <ErrorMsg style={{ height: "calc(100vh - 64px" }} text={clothcategory.error} /> :
                    <>
                        <ClothCategoryForm onHandleSubmit={handleFormSubmit} updateData={update} />
                        <DataGrid
                            columns={columns}
                            rows={clothcategory.clothcategory}
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
