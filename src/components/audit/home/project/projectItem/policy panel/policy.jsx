import React from 'react';
import {NavLink, useParams} from "react-router-dom";
import {Outlet} from "react-router";
import {useEffect, useState} from "react";
import instance from "../../../../../../store/api";

const PolicyPanel = () => {
    let {id} = useParams()
    const [project, setProject] = useState([])

    useEffect(function () {
        UrlHandler()
    }, [])

    function UrlHandler() {
        instance.get('api/project/project/' + id + "/")
            .then(res => {
                debugger
                setProject(res.data);
            })
    }

    return (
        <div>
            <header className="header d-flex justify-content-between border">
                <div className="navbar navbar-expand-lg navbar-light bg-white">
                    <div className="navbar-collapse">
                        <NavLink to={'/audit/project/' + id} style={{padding: '0 20px'}} className="nav-link project_outlet_btn text-black"><i
                            className="fa fa-folder-open" aria-hidden="true"></i>  Проект</NavLink>
                    </div>
                </div>
                <div  className="navbar navbar-expand-lg navbar-light bg-dark">
                    <div  className="navbar-collapse">
                        <div className="navbar-nav w-100 ml-auto d-flex justify-content-around">
                           <NavLink to={'policy'} style={{padding: '0 20px'}} className="nav-link project_outlet_btn text-white">Политика безопасности</NavLink>
                            <NavLink to={'standard'} style={{padding: '0 20px'}} className="nav-link project_outlet_btn text-white">Стандарты</NavLink>
                            <NavLink to={'procedur'} style={{padding: '0 20px'}} className="nav-link project_outlet_btn text-white">Процедуры</NavLink>
                            {/*<NavLink to={'schedule'} className="nav-link project_outlet_btn text-white">Расписание аудитов</NavLink>*/}
                            {/*<NavLink to={'/audit/policy_panel/' + id} className="nav-link project_outlet_btn text-white">Понель политики</NavLink>*/}
                        </div>
                    </div>
                </div>
            </header>
            <Outlet/>
        </div>
    );
};

export default PolicyPanel;