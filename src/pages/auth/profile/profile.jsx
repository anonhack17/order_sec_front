import React, {useState} from 'react';
import instance from "../../../store/api";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {fetchCustomer} from "../../../store/action.creators/customer";
import {fetchExecutors} from "../../../store/action.creators/executor";

const ProfileForm = () => {
    const dispatch = useDispatch();
    var user = useSelector(state => state.auth.user);
    var customers = useSelector(state => state.customers.items);
    var executors = useSelector(state => state.executors.items);
    debugger
    useEffect(() => {
        dispatch(fetchCustomer());
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchExecutors());
    }, [dispatch]);

    const [formData, setFormData] = useState({
        customer: user.id,
        first_name: '',
        last_name: '',
        position: '',
        phone_number: '',
        is_active: false
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        var url = ""

        if (user.role == 'customer') {
            url = "api/customer/customer/"
        }else if (user.role == 'executor'){
            url = "api/employee/employee/"
        }

        instance.post(url, formData)
            .then(response => {
                // Обработка ответа от сервера
                console.log(response.data);
            })
            .catch(error => {
                // Обработка ошибок
                console.error(error);
            });
    };

    const handleChange = (event) => {
        const {name, value, type, checked} = event.target;
        const newValue = type === 'checkbox' ? checked : value;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: newValue
        }));
    };

    if(user.role == 'customer' || user.role == 'executor'){
        if(customers.find(customer => customer.customer == user.id)){
            var customer = customers.find(customer => customer.customer == user.id);

            return (
                <div className="container">
                <h1>Клиент профилі</h1>
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">ID: {customer.id}</h5>
                        <p className="card-text">Аты: {customer.first_name} {customer.last_name}</p>
                        <p className="card-text">Қызмет атауы: {customer.position}</p>
                        <p className="card-text">Телефон нөмірі: {customer.phone_number}</p>
                    </div>
                </div>
            </div>)
        }else if(executors.find(executor => executor.executor == user.id)){
            var executor = executors.find(executor => executor.executor == user.id);

            return (
                <div className="container">
                <h1>Клиент профилі</h1>
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">ID: {executor.id}</h5>
                        <p className="card-text">Аты: {executor.first_name} {executor.last_name}</p>
                        <p className="card-text">Қызмет атауы: {executor.position}</p>
                        <p className="card-text">Телефон нөмірі: {executor.phone_number}</p>
                    </div>
                </div>
            </div>)

        }else{
            return (
                <form className="container" onSubmit={handleSubmit}>
                    {user.role == 'customer'? <h1>Тұтынушы</h1>: <h1>Орындаушы</h1>}
                    <div className="form-group">
                        <label>Аты:</label>
                        <input type="text" name="first_name" className="form-control" value={formData.first_name}
                               onChange={handleChange}/>
                    </div>
                    <div className="form-group">
                        <label>Тегі:</label>
                        <input type="text" name="last_name" className="form-control" value={formData.last_name}
                               onChange={handleChange}/>
                    </div>
                    <div className="form-group">
                        <label>Қызмет атауы:</label>
                        <input type="text" name="position" className="form-control" value={formData.position}
                               onChange={handleChange}/>
                    </div>
                    <div className="form-group">
                        <label>Телефон нөмірі:</label>
                        <input type="text" name="phone_number" className="form-control" value={formData.phone_number}
                               onChange={handleChange}/>
                    </div>
                    <div className="form-check">
                        <input type="checkbox" name="is_active" className="form-check-input" checked={formData.is_active}
                               onChange={handleChange}/>
                        <label className="form-check-label">Белсенді</label>
                    </div>
                    <button type="submit" className="btn btn-primary">Профиль жасау</button>
                </form>
            );
        }
    }else{
        return (
            <div className="container mt-5">
                <h1>Қош келдіңіз, тұтынушы/мердігер!</h1>
                <p>Мына беттің мазмұны тек тұтынушылар мен орындаушыларға қолжетімді.</p>
            </div>
        )
    }
};

export default ProfileForm;