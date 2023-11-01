import React from 'react';
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import instance from "../../../../../../../store/api";
import {useRef} from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const PrivacyPanel = () => {
    let {id} = useParams()

    const [project, setProject] = useState([])
    const [policy, setPolicy] = useState({
        id: '',
        title: '',
        content: '',
    });

    useEffect(function () {
        UrlHandler()
    }, [])

    const inputs = useRef(null);

    function UrlHandler() {
        if(id) {
            instance.get('api/project/project/' + id + "/")
                .then(res => {
                    setProject(res.data);
                    if(res.data && res.data.policy){
                        UrlPrivacy(res.data.policy)
                    }
                })
        }
    }



    function UrlPrivacy(id) {
        if(id){
            instance.get('api/security/policy/' + id + "/")
                .then(res => {
                    setPolicy(res.data);
                })
        }
    }
    const PrivacySubmit = async (e) => {
        e.preventDefault();
        if(policy.id){
            try {
                const response = await instance.put('api/security/policy/' + policy.id + '/', Object.assign({project: project.id}, policy), {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                });

                // Обработка успешного ответа от сервера
            } catch (error) {
                // Обработка ошибок при отправке запроса
                alert(error + 'Вы уже сохранили');
            }
        }else{
            try {
                const response = await instance.post('api/security/policy/', Object.assign({project: project.id}, policy), {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                });
                // Обработка успешного ответа от сервера
            } catch (error) {
                // Обработка ошибок при отправке запроса
                alert(error + 'Вы уже сохранили');
            }
        }
    };

    const policyChange = (event) => {
        try {
            const {name, value} = event.target;
            setPolicy({
                ...policy,
                [name]: value,
            });
        }catch (e){
            const value = event;
            setPolicy({
                ...policy,
                ['content']: value,
            });
        }
    };

    return (
        <div className={'newStyle_container'}>
            <h2 className={"title-h1"}>Политика безопасности.</h2>
            <h3 className={"osint_subtitle"}>Заголовок:</h3>
            <input
                className={"Osint_input"}
                type={"search"}
                name="title"
                ref={inputs}
                value={policy.title}
                onChange={policyChange}
                placeholder={"Спец название пентеста"}
            />

            <h3 className={"osint_subtitle"}>Контен:</h3>
            {/*<textarea*/}
            {/*    className={"Osint_textarea"}*/}
            {/*    type={"search"}*/}
            {/*    name="content"*/}
            {/*    ref={inputs}*/}
            {/*    style={{minHeight: '700px'}}*/}
            {/*    value={policy.content}*/}
            {/*    onChange={policyChange}*/}
            {/*/>*/}
                <ReactQuill value={policy.content} name="content" onChange={policyChange} />

            <button className={"btn_add--req"} onClick={PrivacySubmit}>Сохранить</button>
        </div>
    );
};

export default PrivacyPanel;