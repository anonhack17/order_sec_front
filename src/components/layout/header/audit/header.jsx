import React, {useRef} from 'react';
import classes from "./header.module.css";
import {NavLink} from "react-router-dom";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import instance from "../../../../store/api";


const HeaderAudit = () => {

    const [company, setCompany] = useState({})

    async function getCompanyInfo() {
        try {
            const response = await instance.get('api/company/company/');
            setCompany(response.data.results[0])
        } catch (e) {
        }
    }

    useEffect(() => {
        getCompanyInfo()
    }, [])
    var pentest = useRef()
    var OSINT = useRef()
    var home = useRef()
    var user = useSelector(state => state.auth.user)
    var headerElemProduct = "";
    var headerElemOrder = "";

    if (user?.role) {
        headerElemProduct = user.role == 'super_admin' || user.role == 'executor' || user.role == 'auditor';
        headerElemOrder = user.role == 'super_admin' || user.role == 'customer' || user.role == 'auditor';
    }


    return (
        <header className={classes.header}>
            <div    >
                <div className={classes.header__inner}>
                    <div>
                        <NavLink to={'/audit'} ref={home} className={classes.header__btn}><img className={'header_logo'} src={company.logo}/></NavLink>
                    </div>
                    <div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default HeaderAudit;