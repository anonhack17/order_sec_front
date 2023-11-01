import React, {useEffect} from 'react';
import {observer} from "mobx-react-lite";
import {ErrorMessage, Field, Formik} from "formik"
import classes from '../auth.module.css'
import {useNavigate} from "react-router";
import {login} from "../../../store/action.creators/auth";
import {useDispatch, useSelector} from "react-redux";
import {Trans} from "react-i18next";

const LoginForm = () => {
    var user = useSelector(state => state.auth)
    let navigate = useNavigate();
    var dispatch = useDispatch()



    return (
        <div style={{marginTop: "50px"}}>
            <Formik initialValues={{username: '', password: ''}}
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
                        }

                        if (values.password.length < 8) {
                            errors.password = 'password less then 8 symbol';
                        }

                        return errors;
                    }}
                    onSubmit={(values, {setSubmitting}) => {
                        dispatch(login(values.username, values.password));

                        setSubmitting(false);
                    }}>
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
                        <label className={'login-lable'}>Email</label>
                        <Field className={classes.input} type="username" name="username"/>
                        <ErrorMessage name="username" component="div"/>
                        <label className={'login-lable'}><Trans i18nKey="login.password">
                            Пароль
                        </Trans></label>
                        <Field className={classes.input} type="password" name="password"/>
                        <ErrorMessage name="password" component="div"/>
                        <button className={classes.btn} type="Кіру" disabled={isSubmitting}>
                            <Trans i18nKey="login.in">
                                Вход
                            </Trans>
                        </button>
                    </form>
                )}
            </Formik>
        </div>
    );
};

export default observer(LoginForm);
