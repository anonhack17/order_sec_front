import React from 'react';
import Footer from "../../components/layout/footer/footer";
import {Link} from "react-router-dom";
import { useNavigate} from "react-router";
import {useEffect} from "react";
import {useSelector} from "react-redux";

const HomeComponent = () => {
    let navigate = useNavigate();
    var user = useSelector(state => state.auth)
    useEffect(() => {
        if(user? !user.isLoggedIn: null){
            navigate("/login")
        }
    }, [user]);

    return (
        <div>
            <div className={"continer"}>
                <div className={"main_btn"}>
                    <Link className={"start_btn"} to={"audit"}>
                        <div>Системы защиты информации в электронной торговле</div>
                        <div className="fa fa-play" aria-hidden="true"></div>
                    </Link>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default HomeComponent;
