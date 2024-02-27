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
import { getCategory } from '../../../user/redux/slice/category.slice';

function SubCategoryForm({ onHandleSubmit, updateData }) {
    const [open, setOpen] = React.useState(false);

    const dispatch = useDispatch()

    const category = useSelector(state => state.category)

    useEffect(() => {
        if (updateData) {
            handleClickOpen()
            setValues(updateData)
        }
        dispatch(getCategory())
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
                <h3 className='mb-0' style={{ color: '#FF6337' }}>Subcategory</h3>
                <Button type="button" variant="contained" onClick={handleClickOpen}>Subcategory <AddIcon fontSize="small" /></Button>
            </div>
            <Dialog id='addModal' open={open}>
                <DialogTitle style={{ fontSize: '24px' }} className='px-5 pt-4 pb-0 text-center '><b>Subcategory</b></DialogTitle>
                <DialogContent className='px-5 pb-4'>
                    <form className='row' onSubmit={handleSubmit} style={{ width: "500px" }}>
                        <div className="col-12 mb-3 form_field position-relative">
                            <div className='category_name' style={{ display: 'flex' }}>
                                <label style={{ paddingTop: '7px', paddingRight: '20px' }}>Category Name: </label>
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
                                        category.category.map((v) => {
                                            return (
                                                <option key={v.id} value={v.id}>{v.category_name}</option>
                                            );
                                        })
                                    }
                                </select>
                                {errors.category_id && touched.category_id ? (
                                    <span className="form-error1">{errors.category_id}</span>
                                ) : null}
                            </div>

                        </div>

                        <div className="col-12 mb-3 form_field position-relative">
                            <label className="form-label" htmlFor="ecommerce-product-name">Subcategory Name</label>
                            <input type="text" className="form-control" id="ecommerce-product-name" placeholder="Subcategory Name" aria-label="Subcategory title" name="sub_name"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.sub_name}
                                required
                            />
                            {errors.sub_name && touched.sub_name ? (
                                <span className="d-block position-absolute form-error" style={{ color: 'red', fontSize: '14px', position: 'absolute' }}>{errors.sub_name}</span>
                            ) : null}
                        </div>
                        <div className='pt-3 col-12 text-center'>
                            <Button className='me-3' onClick={handleClose}>Cancel</Button>
                            <Button type="submit" variant="contained">{updateData ? 'Update' : 'Add'}</Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}

export default SubCategoryForm;