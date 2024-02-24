import React, { useState } from 'react';
import WatchCatForm from './ClothCatForm';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import { addClothCat, deleteClothCat, getClothCat, updateClothCat } from '../../../user/redux/slice/clothcat.slice';
import { setAlert } from '../../../user/redux/slice/Alert.slice';

function ClothCat(props) {
    const [update, setUpdate] = useState(false)

    const dispatch = useDispatch()

    const clothcat = useSelector(state => state.clothcat);

    useEffect(() => {
        dispatch(getClothCat())
    }, [])

    const handleSubmitForm = (data) => {
        if (update) {
            dispatch(updateClothCat(data))
            dispatch(setAlert({ text: 'Cloth Category successfully update', color: 'success' }))
        } else {
            dispatch(addClothCat(data))
            dispatch(setAlert({ text: 'Cloth Category successfully added', color: 'success' }))
        }
        setUpdate(false)
    }

    const handleDelete = (id) => {
        dispatch(setAlert({ text: 'Cloth Category successfully deleted', color: 'success' }))
        dispatch(deleteClothCat(id))
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
            <WatchCatForm onHandleSubmit={handleSubmitForm} updateData={update} />

            <div sx={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={clothcat.clothcat}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                page: 0, pageSize: 5,
                            },
                        },
                    }}

                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                />
            </div>
        </div>
    );
}

export default ClothCat;