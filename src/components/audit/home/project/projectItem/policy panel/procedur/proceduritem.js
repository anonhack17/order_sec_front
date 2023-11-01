import React from 'react';
import {useParams} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import instance from "../../../../../../../store/api";
import ReactQuill from "react-quill";

const Proceduritem = (props) => {
    let id = props.id

    const [project, setProject] = useState([])
    const [procedure, setProcedure] = useState({
        title: '',
        description: '',
    });

    useEffect(function () {
        UrlHandler()
    }, [])

    const inputs = useRef(null);

    function UrlHandler() {
        if(id) {
            instance.get('api/project/project/' + props.projectId + "/")
                .then(res => {
                    setProject(res.data);
                    if(id){
                        UrlPrivacy(id)
                    }
                })
        }
    }



    function UrlPrivacy(id) {
        if(id){
            instance.get('api/security/procedure/' + id + "/")
                .then(res => {
                    setProcedure(res.data);
                })
        }
    }
    const procedureSubmit = async (e) => {
        e.preventDefault();
        debugger
        if(procedure.id){
            try {
                const response = await instance.put('api/security/procedure/' + procedure.id + '/', Object.assign({project: project.id}, procedure), {
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
                const response = await instance.post('api/security/procedure/', Object.assign({project: props.projectId}, procedure), {
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

    const procedureChange = (event) => {
            const {name, value} = event.target;
            setProcedure({
                ...procedure,
                [name]: value,
            });
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
                value={procedure.title}
                onChange={procedureChange}
                placeholder={"Спец название пентеста"}
            />

            <h3 className={"osint_subtitle"}>Контен:</h3>
            <textarea
                className={"Osint_textarea"}
                type={"search"}
                name="description"
                ref={inputs}
                style={{minHeight: '200px'}}
                value={procedure.description}
                onChange={procedureChange}
            />

            <button className={"btn_add--req"} onClick={procedureSubmit}>Сохранить</button>
        </div>
    );
};

export default Proceduritem;