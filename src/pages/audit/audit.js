import React from 'react';
import HeaderAudit from "../../components/layout/header/audit/header";
import {BrowserRouter} from "react-router-dom";
import {Outlet} from "react-router";

const Audit = () => {

    return (
        <div>
            <HeaderAudit></HeaderAudit>
            <div >
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Audit;
