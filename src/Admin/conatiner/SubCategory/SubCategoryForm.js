import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import AddIcon from '@mui/icons-material/Add';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getClothCat } from '../../../user/redux/slice/clothcat.slice';

function SubCategoryForm({ onHandleSubmit, updateData }) {
    const [open, setOpen] = React.useState(false);

    const dispatch = useDispatch()

    const clothcat = useSelector(state => state.clothcat)

    useEffect(() => {
        if (updateData) {
            handleClickOpen()
            setValues(updateData)
        }
        dispatch(getClothCat())
    }, [updateData])    

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const SubCategorySchema = yup.object().shape({
        category_id: yup.string()
            .required("Please Select Any One Option"),
        sub_name: yup.string()
            .required()
            .matches(/^[a-zA-Z 1-9 &@ ]{2,30}$/, "Please Enter Valid Name"),
    });

    const { handleSubmit, handleBlur, handleChange, values, touched, errors, setValues } = useFormik({
        validationSchema: SubCategorySchema,
        initialValues: {
            sub_name: '',
            category_id: '',
        },
        onSubmit: (values, action) => {
            onHandleSubmit(values)

            action.resetForm()
            handleClose()
        },
    });

    return (
        <>
            <div className='d-flex align-items-center justify-content-between py-4'>
                <h3 className='mb-0' style={{ color: '#FF6337' }}>SubCategory</h3>
                <Button type="button" variant="contained" onClick={handleClickOpen}>SubCategory <AddIcon fontSize="small" /></Button>
            </div>
            <Dialog id='addModal' open={open}>
                <DialogTitle style={{ fontSize: '24px' }} className='px-5 pt-4 pb-0 text-center '>SubCategory</DialogTitle>
                <DialogContent className='px-5 pb-4'>
                    <form className='row' onSubmit={handleSubmit} style={{ width: "500px" }}>
                        <select
                            name="category_id"
                            id="category_id"
                            className="form-select"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.category_id}
                        >
                            <option value='0'>Select</option>
                            {
                                clothcat.clothcat.map((v) => {
                                    return (
                                        <option value={v.id}>{v.category_name}</option>
                                    )
                                })
                            }
                        </select>
                        {errors.category_id && touched.category_id ? (
                            <span className="form-error1">{errors.category_id}</span>
                        ) : null}
                        
                        <div className="col-12 mb-3 form_field position-relative">
                            <TextField className='m-0' margin="dense" id="mediName" label="Name" type="text" fullWidth name='sub_name' variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.sub_name}
                            />
                            {errors.sub_name && touched.sub_name ? (
                                <span className="d-block position-absolute form-error">{errors.sub_name}</span>
                            ) : null}
                        </div>
                        <div className='pt-3 col-12 text-center'>
                            <Button className='me-3' onClick={handleClose}>Cancel</Button>
                            <Button type="submit" variant="contained">Submit</Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}

export default SubCategoryForm;