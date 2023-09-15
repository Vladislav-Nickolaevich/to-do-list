import React from 'react'
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useFormik} from "formik";

type ValidateType = {
    email?: string
    password?: string
}
const validate = (value: any) => {
    const errors:ValidateType = {};
    if (!value.email) {
        errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value.email)) {
        errors.email = 'Invalid email address';
    }
    if (!value.password) {
        errors.password = 'Required';
    } else if (value.password.length < 5) {
        errors.password = 'Should be more then four symbol';
    }
    return errors;
}

export const Login = () => {
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validate,
        onSubmit: values => {
            alert(JSON.stringify(values));
        },
    });
    return <Grid container justifyContent={'center'}>
        <Grid item justifyContent={'center'}>
            <FormControl>
                <form onSubmit={formik.handleSubmit}>
                    <FormGroup>
                        <TextField label="Email"
                                   margin="normal"
                                   name="email"
                                   onChange={formik.handleChange}
                                   value={formik.values.email}
                                   onBlur={formik.handleBlur}
                        />
                        {formik.touched.email && formik.errors.email && <span style={{color: 'red'}}>{formik.errors.email}</span>}
                        <TextField type="password"
                                   label="Password"
                                   margin="normal"
                                   name="password"
                                   onChange={formik.handleChange}
                                   value={formik.values.password}
                                   onBlur={formik.handleBlur}
                        />
                        {formik.touched.password && formik.errors.password && <span style={{color: 'red'}}>{formik.errors.password}</span>}
                        <FormControlLabel
                            label={'Remember me'}
                            control={<Checkbox
                                name="rememberMe"
                                onChange={formik.handleChange}
                                value={formik.values.rememberMe}
                            />}
                        />
                        <Button type={'submit'} variant={'contained'} color={'primary'}>
                            Login
                        </Button>
                    </FormGroup>
                </form>
            </FormControl>
        </Grid>
    </Grid>
}