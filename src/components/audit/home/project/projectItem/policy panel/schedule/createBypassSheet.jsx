import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import instance from "../../../../../../../store/api";


const CreateBypassSheet = () => {
    var user = useSelector(state => state.auth.user)
    const dispatch = useDispatch();

    const [reason, setReason] = useState();
    const [status, setStatus] = useState('pending');
    const [student, setStudent] = useState(user.id)

    const handleSubmit = () => {
        const payload = {
            student,
            reason,
            status,
        }
        instance.post('/api/bypassSheet/bypassSheet/', payload)
            .then(response => {
                console.log(response.data);
                // здесь можно выполнить перенаправление на страницу заказа или другую страницу
            })
            .catch(error => {
                console.error(error);
            });
    };

    return (
        <div className="container mt-5">
            <h1>Алаушы тізімді сұрау</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="description" className={'lable'}>Себеп:</label>
                    <textarea id="description" name="description" className="form-control" onChange={(e) => setReason(e.target.value)}></textarea>
                </div>
                <button type="submit" className="btn mt-4 btn-primary" >Тапсырыс жасау</button>
            </form>
        </div>
    );
};

export default CreateBypassSheet;