import React, { useState } from 'react';
import CategoryForm from './CategoryForm';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import { setAlert } from '../../../user/redux/slice/Alert.slice';
import { addCategory, deleteCategory, getCategory, updateCategory } from '../../../user/redux/slice/category.slice';

function Category(props) {
    const [update, setUpdate] = useState(false)

    const dispatch = useDispatch()

    const category = useSelector(state => state.category);

    useEffect(() => {
        dispatch(getCategory())
    }, [])

    const handleSubmitForm = (data) => {
        if (update) {
            dispatch(updateCategory(data))
            dispatch(setAlert({ text: 'Category successfully update', color: 'success' }))
        } else {
            dispatch(addCategory(data))
            dispatch(setAlert({ text: 'Category successfully added', color: 'success' }))
        }
        setUpdate(false)
    }

    const handleDelete = (id) => {
        dispatch(setAlert({ text: 'Category successfully deleted', color: 'success' }))
        dispatch(deleteCategory(id))
    }

    const handleUpdate = (data) => {
        setUpdate(data)
    }

    const columns = [
        { field: 'category_name', headerName: 'Category Name', flex: 5 },
        {
            field: "action", headerName: "Action", flex: 1, sortable: false, disableColumnMenu: true,
            renderCell: (params) => {
                return (
                    <>
                        <IconButton aria-label="edit" type='button' onClick={() => handleUpdate(params.row)} >
                            <EditIcon sx={{ fontSize: '20px' }} />
                        </IconButton>
                        <IconButton aria-label="delete" type='button' onClick={() => handleDelete(params.row.id)} >
                            <DeleteIcon sx={{ fontSize: '20px' }} />
                        </IconButton>
                    </>
                )
            }
        }
    ];

    return (
        <div>
            <h2>Watch Category</h2>
            <CategoryForm onHandleSubmit={handleSubmitForm} updateData={update} />
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={category.category}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    pageSizeOptions={[5, 10]}
                />
            </div>
        </div>
    );
}

export default Category;