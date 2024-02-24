import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import AddIcon from '@mui/icons-material/Add';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useEffect } from 'react';

function ClothCatForm({ onHandleSubmit, updateData }) {
    const [open, setOpen] = React.useState(false);

    useEffect(() => {
        if (updateData) {
            handleClickOpen()
            setValues(updateData)
        }

    }, [updateData])

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const WatchcatSchema = yup.object().shape({
        category_name: yup.string()
            .required()
            .matches(/^[a-zA-Z' ]{2,30}$/, "*Please Enter Valid Category Name"),
    });

    const { handleSubmit, handleBlur, handleChange, values, touched, errors, setValues } = useFormik({
        validationSchema: WatchcatSchema,
        initialValues: {
            category_name: '',
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
                <h3 className='mb-0' style={{ color: '#FF6337' }}>Cloth Category</h3>
                <Button type="button" variant="contained" onClick={handleClickOpen}>Cloth Category<AddIcon fontSize="small" /></Button>
            </div>
            <Dialog id='addModal' open={open}>
                <DialogTitle style={{ fontSize: '24px' }} className='px-5 pt-4 pb-0 text-center '>Cloth Category</DialogTitle>
                <DialogContent className='px-5 pb-4'>
                    <form className='row' onSubmit={handleSubmit} style={{ width: "500px" }}>
                        <div className="col-12 mb-3 form_field position-relative">
                            <TextField className='m-0' margin="dense" id="mediName" label="Name" type="text" fullWidth name='category_name' variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.category_name}
                            />
                            {errors.category_name && touched.category_name ? (
                                <span className="d-block position-absolute form-error">{errors.category_name}</span>
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

export default ClothCatForm;