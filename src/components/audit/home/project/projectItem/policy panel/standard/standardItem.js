import React from 'react';
import {useEffect, useRef, useState} from "react";
import instance from "../../../../../../../store/api";

const StandardItem = (props) => {
    let id = props.id

    const [project, setProject] = useState([])
    const [standard, setStandard] = useState({
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
                        UrlStandard(id)
                    }
                })
        }
    }



    function UrlStandard(id) {
        if(id){
            instance.get('api/security/standard/' + id + "/")
                .then(res => {
                    setStandard(res.data);
                })
        }
    }
    const standardSubmit = async (e) => {
        e.preventDefault();
        debugger
        if(standard.id){
            try {
                const response = await instance.put('api/security/standard/' + standard.id + '/', Object.assign({project: project.id}, standard), {
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
                const response = await instance.post('api/security/standard/', Object.assign({project: props.projectId}, standard), {
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

    const standardChange = (event) => {
        const {name, value} = event.target;
        setStandard({
            ...standard,
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
                value={standard.title}
                onChange={standardChange}
                placeholder={"Спец название пентеста"}
            />

            <h3 className={"osint_subtitle"}>Контен:</h3>
            <textarea
                className={"Osint_textarea"}
                type={"search"}
                name="description"
                ref={inputs}
                style={{minHeight: '200px'}}
                value={standard.description}
                onChange={standardChange}
            />

            <button className={"btn_add--req"} onClick={standardSubmit}>Сохранить</button>
        </div>
    );
};

export default StandardItem;