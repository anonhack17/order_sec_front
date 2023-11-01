import React, {useEffect} from 'react';
import {Route, Routes, useNavigate} from "react-router";
import HomeComponent from "../pages/home/homeComponent";
import LoginForm from "../pages/auth/login/LoginForm";
import SingInForm from "../pages/auth/singIn/SingInForm";
import {useDispatch, useSelector} from "react-redux";
import Profile from "../pages/auth/profile/profile";
import Audit from "../pages/audit/audit";
import AuditHome from "../pages/audit/home/home";
import ProjectItem from "./audit/home/project/projectItem/projectItem";
import Policy from "./audit/home/project/projectItem/security/Policy";
import Procedures from "./audit/home/project/projectItem/security/Procedures";
import Schedule from "./audit/home/project/projectItem/security/Schedule/Schedule";
import Standard from "./audit/home/project/projectItem/security/Standard";
import StandardPanel from "./audit/home/project/projectItem/policy panel/standard/standard";
import ProcedurPanel from "./audit/home/project/projectItem/policy panel/procedur/procedur";
import NetCardPanel from "./audit/home/project/projectItem/policy panel/net card/netCard";
import PrivacyPanel from "./audit/home/project/projectItem/policy panel/policy privacy/privacy";
import PolicyPanel from "./audit/home/project/projectItem/policy panel/policy";
import {fetchOsint} from "../store/action.creators/osint";


const Router = () => {
    var user = useSelector(state => state.auth)
    let navigate = useNavigate();
    let dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchOsint());
    }, []);


    useEffect(() => {
        if (window.count == 1) {
            navigate("/login")
        }
    }, [navigate]);


    return (<div>

        <Routes>

            <Route path={'/'} element={<HomeComponent/>}></Route>
            <Route path={'/login'} element={<LoginForm/>}></Route>
            <Route path={'/singin'} element={<SingInForm/>}></Route>
        </Routes>
        {user.isLoggedIn ? <Routes>
            {/*<Route path={'/'} element={<HomePage/>}></Route>*/}
            <Route path={'/audit'} element={<Audit/>}>
                <Route path={''} element={<AuditHome/>}></Route>
                <Route path={'project'}>
                    <Route path={':id'} element={<ProjectItem></ProjectItem>}>

                        <Route path={''} element={<Policy/>}></Route>
                        <Route path={'policy'} element={<Policy/>}></Route>
                        <Route path={'procedur'} element={<Procedures/>}></Route>
                        <Route path={'schedule'} element={<Schedule/>}></Route>
                        <Route path={'standard'} element={<Standard/>}></Route>
                    </Route>
                </Route>
                <Route path={'policy_panel'}>
                    <Route path={':id'} element={<PolicyPanel/>}>
                        <Route path={''} element={<PrivacyPanel/>}></Route>
                        <Route path={'policy'} element={<PrivacyPanel/>}></Route>
                        <Route path={'procedur'} element={<ProcedurPanel/>}></Route>
                        {/*<Route path={'schedule'} element={<SchedulePanel/>}></Route>*/}
                        <Route path={'standard'} element={<StandardPanel/>}></Route>
                        <Route path={'newCart'} element={<NetCardPanel/>}></Route>
                    </Route>

                </Route>
            </Route>

            <Route path={'/profile'} element={<Profile/>}></Route>
        </Routes> : null}

    </div>);
};

export default Router;
