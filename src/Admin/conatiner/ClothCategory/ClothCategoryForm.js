import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import AddIcon from '@mui/icons-material/Add';
import DialogTitle from '@mui/material/DialogTitle';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { getClothCat } from '../../../user/redux/slice/clothcat.slice';
import { getClothSubCat } from '../../../user/redux/slice/Clothsub.slice';

function ClothCategoryForm({ onHandleSubmit, updateData }) {
    const [open, setOpen] = React.useState(false);
    const [category, setCategory] = useState('')
    const [subcategory, setSubCategory] = useState([]);
    const [size, setSize] = useState('');

    const dispatch = useDispatch()

    const clothcat = useSelector(state => state.clothcat)

    const clothsubcat = useSelector(state => state.clothsubcat)

    useEffect(() => {
        if (updateData) {
            handleClickOpen()
            setValues(updateData)
        }
        dispatch(getClothCat())
        dispatch(getClothSubCat())
    }, [updateData])

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    let Clothschema = yup.object().shape({
        category_id: yup.string()
            .required(),
        sub_id: yup.string()
            .required(),
        name: yup.string()
            .required()
            .matches(/^[a-zA-Z ]{2,30}$/, "Please Enter Valid Name"),
        price: yup.string().required(),
        desc: yup.string().required(),
        prec: yup
            .mixed()
            .required('Prescription is required'),
        size: yup.string().required('Size is required'),
        mrp: yup.string().required(),
        stock: yup.string().required()
    })

    const { handleSubmit, handleChange, handleBlur, values, errors, touched, setValues, setFieldValue } = useFormik({
        validationSchema: Clothschema,
        initialValues: {
            category_id: '',
            sub_id: '',
            name: '',
            price: '',
            desc: '',
            prec: '',
            mrp: '',
        },
        onSubmit: (values, action) => {
            let obj = {
                ...values,
                size: values.size.split(',').map((v) => {
                    let sizeObj = {
                        size: v.trim(),
                        stock: values.stock,
                        status: true
                    };
                    return sizeObj;
                })
            }
            console.log(obj);
            const mergedData = { ...obj };

            onHandleSubmit(mergedData)
            handleClose();
            action.resetForm()
        },
    });

    const handleSub = (value) => {
        setCategory(value)

        const fData = clothsubcat.clothsubcat.filter((v) => v.category_id === value);

        setSubCategory(fData);
    }
    return (
        <>
            <div className='d-flex align-items-center justify-content-between py-5'>
                <h3 className='mb-0' style={{ color: '#FF6337' }}>Product</h3>
                <Button type="button" variant="contained" onClick={handleClickOpen}>Product <AddIcon fontSize="small" /></Button>
            </div>
            <Dialog id='addModal' open={open}>
                <DialogTitle style={{ fontSize: '24px' }} className='px-5 py-4 text-center '><b>Add Product</b></DialogTitle>
                <DialogContent className='px-5 pb-4'>
                    <form className='row' onSubmit={handleSubmit} style={{ width: "500px" }}>
                        <div className="col-12 mb-3 form_field position-relative">
                            <div className='category_name' style={{ display: 'flex' }}>
                                <label style={{ paddingTop: '7px', paddingRight: '37px' }}>CATEGORY NAME:</label>
                                <select
                                    name="category_id"
                                    id="category_id"
                                    className="form-select"
                                    onChange={(e) => { handleChange(e); handleSub(e.target.value) }}
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
                                {errors.category_id && touched.category_id ? <span className='form-error-addPro'>{errors.category_id}</span> : null}
                            </div>
                        </div>

                        <div className='subcategory_name' style={{ display: 'flex' }}>
                            <label style={{ paddingTop: '7px', paddingRight: '10px' }}>SUBCATEGORY NAME:</label>
                            <select
                                name="sub_id"
                                id="sub_id"
                                className="form-select"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.sub_name}
                            >

                                <option value='0'>Select</option>
                                {
                                    subcategory.map((v) => (
                                        <option key={v.id} value={v.id}>
                                            {v.sub_name}
                                        </option>
                                    ))
                                }
                            </select>
                            {errors.sub_name && touched.sub_name ? <span className='form-error-addPro'>{errors.sub_name}</span> : null}
                        </div>
                        <div className="col-12 mb-3 form_field position-relative">
                            <TextField className='m-0' margin="dense" id="name" label="Name" type="text" fullWidth name='name' variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.name}
                            />
                            {errors.name && touched.name ? (
                                <span className="d-block position-absolute form-error">{errors.name}</span>
                            ) : null}
                        </div>

                        <div className="col-6 mb-3 form_field position-relative">
                            <TextField className='m-0' margin="dense" id="price" label="Price" type="number" fullWidth name='price' variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.price}
                            />
                            {errors.price && touched.price ? (
                                <span className="d-block position-absolute form-error">{errors.price}</span>
                            ) : null}
                        </div>

                        <div className="col-6 mb-3 form_field position-relative">
                            <TextField className='m-0' margin="dense" id="mrp" label="MRP" type="number" fullWidth name='mrp' variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.mrp}
                            />
                            {errors.mrp && touched.mrp ? (
                                <span className="d-block position-absolute form-error">{errors.mrp}</span>
                            ) : null}
                        </div>

                        <div className='col-6 mb-3 form_field position-relative'>
                            <TextField className='m-0' margin="dense" id="size" label="Size" type="text" fullWidth name='size' variant="standard"
                                onChange={(e) => { handleChange(e); setSize(e.target.value); }}
                                onBlur={handleBlur}
                                value={size}
                            />
                            {errors.size && touched.size ? <span className="d-block position-absolute form-error">{errors.size}</span> : null}
                        </div>

                        <div className="col-6 mb-3 form_field position-relative">
                            <TextField className='m-0' margin="dense" id="stock" label="Stock" type="number" fullWidth name='stock' variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.stock && touched.stock ? (
                                <span className="d-block position-absolute form-error">{errors.stock}</span>
                            ) : null}
                        </div>

                        <div className="col-7 mb-3 form-group mt-3">
                            <input type="file" name="prec" className="form-control" id="prec"
                                onChange={(event) => setFieldValue("prec", event.target.files[0])} />
                            {errors.prec && touched.prec ? <span className='form-error'>{errors.prec}</span> : null}
                            {
                                values.prec ? <img style={{ width: '100px' }} src={typeof values.prec === 'string' ? values.prec : URL.createObjectURL(values.prec)} alt={values.prec} />
                                    : null}
                        </div>

                        <div className="col-12 mb-3 form_field position-relative">
                            <TextField className='m-0' margin="dense" id="desc" label="Description" type="text" fullWidth multiline rows={3} name='desc' variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.desc}
                            />
                            {errors.desc && touched.desc ? (
                                <span className="d-block position-absolute form-error">{errors.desc}</span>
                            ) : null}
                        </div>

                        <div className='pt-3 col-12 text-center'>
                            <Button className='me-3' onClick={handleClose}>Cancel</Button>
                            <Button type="submit" variant="contained">Add</Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog >
        </>
    );
}

export default ClothCategoryForm;