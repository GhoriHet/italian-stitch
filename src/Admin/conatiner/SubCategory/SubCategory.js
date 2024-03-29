import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import SubCategoryForm from './SubCategoryForm';
import { useDispatch, useSelector } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import { useState, useEffect } from 'react';
import { addClothSubCat, deleteClothSubCat, getClothSubCat, updateClothSubCat } from '../../../user/redux/slice/Clothsub.slice';
import { setAlert } from '../../../user/redux/slice/Alert.slice';

function SubCategory() {
    const [update, setUpdate] = useState(false)

    const dispatch = useDispatch();

    const clothsubcat = useSelector(state => state.clothsubcat);
    const clothcat = useSelector(state => state.clothcat);

    useEffect(() => {
        dispatch(getClothSubCat())
    }, [])

    const handleSubmitForm = (data) => {
        if (update) {
            dispatch(updateClothSubCat(data))
            dispatch(setAlert({ text: 'Cloth SubCategory successfully update', color: 'success' }))
        } else {
            dispatch(addClothSubCat(data))
            dispatch(setAlert({ text: 'Cloth SubCategory successfully added', color: 'success' }))
        }
        setUpdate(false)
    }

    const handleDelete = (id) => {
        dispatch(deleteClothSubCat(id))
        dispatch(setAlert({ text: 'Cloth SubCategory successfully deleted', color: 'success' }))
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
        { field: 'sub_name', headerName: 'Subcategory Name', flex: 3 },
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
            <h2>Sub Category</h2>
            <SubCategoryForm onHandleSubmit={handleSubmitForm} updateData={update} />
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={clothsubcat.clothsubcat}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                />
            </div>
        </div>
    );
}

export default SubCategory;