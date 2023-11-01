import React, {useContext} from 'react';
import {ErrorMessage, Field, Formik} from "formik";
import classes from '../auth.module.css'
import {register} from "../../../store/action.creators/auth";
import {useDispatch} from "react-redux";

const SingInForm = () => {
    var dispatch = useDispatch();

    function singinHandler(email, password){
        dispatch(register(email, password));
    }

    return (
        <div>
            <h1 className={classes.title}>Тіркеу</h1>
            <Formik initialValues={{username: '', password: '', password_repeat: ''}}
                    validate={(values) => {
                        const errors = {};
                        // if (!values.username) {
                        //   errors.username = 'Required';
                        // } else if (
                        //   !/^[^._ ](?:[\w-]|\.[\w-])+[^._ ]$/i.test(values.username)
                        // ) {
                        //   errors.username = 'Invalid username';
                        // }

                        if (!values.password) {
                            errors.password = 'Required';
                        } else if (values.password !== values.password_repeat) {
                            errors.password = 'passwords not the same'
                        }

                        if (values.password.length < 8) {
                            errors.password = 'password less then 8 symbol';
                        }

                        if (!values.password_repeat) {
                            errors.password_repeat = 'Required';
                        } else if (values.password !== values.password_repeat) {
                            errors.password_repeat = 'passwords not the same'
                        }

                        return errors;
                    }}
                    onSubmit={(values, {setSubmitting}) => {
                        singinHandler(values.username, values.password)
                        setSubmitting(false);
                    }}
            >
                {({
                      values,
                      errors,
                      touched,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      isSubmitting,
                      /* and other goodies */
                  }) => (
                    <form className={classes.form} onSubmit={handleSubmit}>
                        <Field className={classes.input} placeholder={'username'} type="email" name="username"/>
                        <ErrorMessage name="username" component="div"/>
                        <Field className={classes.input} placeholder={'password'} type="password" name="password"/>
                        <ErrorMessage name="password" component="div"/>
                        <Field className={classes.input} placeholder={'password repeat'} type="password"
                               name="password_repeat"/>
                        <ErrorMessage name="password_repeat" component="div"/>
                        <button className={classes.btn} type="Тіркелу" disabled={isSubmitting}>
                            Тіркелу
                        </button>
                    </form>
                )}
            </Formik>
        </div>
    );
};

export default SingInForm;
