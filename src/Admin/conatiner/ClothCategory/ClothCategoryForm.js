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
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

function ClothCategoryForm({ onHandleSubmit, updateData }) {
    const [open, setOpen] = React.useState(false);
    const [category, setCategory] = useState('');
    const [subcategory, setSubCategory] = useState([]);
    const [sizesAndStocks, setSizesAndStocks] = useState([]);

    const dispatch = useDispatch();
    const clothcat = useSelector(state => state.clothcat);
    const clothsubcat = useSelector(state => state.clothsubcat);

    useEffect(() => {
        if (updateData) {
            handleClickOpen();
            setValues(updateData);
            setSizesAndStocks(updateData.sizesAndStocks || []);
            setOpen(true);
        }
        dispatch(getClothCat());
        dispatch(getClothSubCat());
    }, [updateData]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAddSizeAndStock = () => {
        setSizesAndStocks(prevState => [
            ...prevState,
            { size: '', stock: '' }
        ]);
    };

    let Clothschema = yup.object().shape({
        category_id: yup.string().required(),
        sub_id: yup.string().required(),
        name: yup.string()
            .required()
            .matches(/^[a-zA-Z ]{2,30}$/, "Please Enter Valid Name"),
        price: yup.number().positive().required(),
        desc: yup.string().required(),
        prec: yup.mixed().required('Prescription is required'),
        mrp: yup.number().positive().required(),
    });

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
            sizesAndStocks: []
        },
        onSubmit: (values, { resetForm }) => {
            let obj = {
                ...values,
                sizesAndStocks: sizesAndStocks.map((value) => ({ ...value, stock: parseInt(value.stock) }))
            };
            console.log('Submitted values:', obj);
            const mergedData = { ...obj };

            onHandleSubmit(mergedData);
            handleClose();
            resetForm({ ...values }, setSizesAndStocks([])); // reset form after submission and remove all added fields in array
        },
    });

    const handleSub = (value) => {
        setCategory(value);

        const fData = clothsubcat.clothsubcat.filter((v) => v.category_id === value);

        setSubCategory(fData);
    };

    const handleSizeChange = (e, index) => {
        const updatedSizesAndStocks = [...sizesAndStocks];
        updatedSizesAndStocks[index] = {
            ...updatedSizesAndStocks[index],
            size: e.target.value
        };
        setSizesAndStocks(updatedSizesAndStocks);
    };

    const handleStockChange = (e, index) => {
        const stockValue = parseInt(e.target.value);
        if (!isNaN(stockValue) && stockValue >= 0) {
            const updatedSizesAndStocks = [...sizesAndStocks];
            updatedSizesAndStocks[index] = {
                ...updatedSizesAndStocks[index],
                stock: stockValue
            };
            setSizesAndStocks(updatedSizesAndStocks);
        }
    };

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

                        {sizesAndStocks.map((input, index) => (
                            <div style={{ display: 'flex', margin: '5px 0', height: '39px' }} key={index}>

                                {/* Sizes */}
                                <div style={{ margin: "0 5px", width: '140px' }}>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id={`ecommerce-product-size-${index}`}
                                        placeholder="size"
                                        name={`sizesAndStocks[${index}].size`}
                                        aria-label="Product size"
                                        value={input.size}
                                        onChange={e => handleSizeChange(e, index)}
                                        onBlur={handleBlur}
                                    />
                                    {errors.sizesAndStocks?.[index]?.size && <p>{errors.sizesAndStocks[index].size}</p>}
                                </div>
                                {/* Stock */}
                                <div style={{ margin: "0 5px", width: '100px' }}>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id={`ecommerce-product-stock-${index}`}
                                        placeholder="stock"
                                        name={`sizesAndStocks[${index}].stock`}
                                        aria-label="Product stock"
                                        value={input.stock}
                                        onChange={e => handleStockChange(e, index)}
                                        onBlur={handleBlur}
                                    />
                                    {errors.sizesAndStocks?.[index]?.stock && <p>{errors.sizesAndStocks[index].stock}</p>}
                                </div>

                            </div>
                        ))}

                        {/* Button to add size and stock dynamically */}
                        <div className="col-12 mb-3">
                            <Button variant="contained" onClick={handleAddSizeAndStock}><ArrowForwardIcon /></Button>
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
                            <Button type="submit" variant="contained">{updateData ? 'Update' : 'Add'}</Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog >
        </>
    );
}

export default ClothCategoryForm;
