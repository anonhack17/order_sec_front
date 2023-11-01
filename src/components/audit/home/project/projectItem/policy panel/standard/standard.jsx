import React from 'react';
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import instance from "../../../../../../../store/api";
import StandardItem from "./standardItem";

const StandardPanel = () => {
    let {id} = useParams()

    const [project, setProject] = useState([])
    debugger
    useEffect(function () {
        UrlHandler()
    }, [])

    function UrlHandler() {
        if(id) {
            instance.get('api/project/project/' + id + "/")
                .then(res => {
                    debugger
                    setProject(res.data);
                })
        }
    }
    const [count, setCount] = useState(1);
    debugger
    const handleAdd = () => {
        setCount(count + 1);
    };
    return (
        <div>
            {
                project && project.standard && project.standard.map((item) => <StandardItem projectId={project.id} id={item}/>)
            }
            { Array.from({length: count}).map((_, index) => (
                <StandardItem projectId={project.id} key={index}/>
            ))}

            <button className={"btn_add--add"} onClick={handleAdd}>Добавить ресурс <i style={{color: "green"}}
                                                                                      className="fa fa-plus"
                                                                                      aria-hidden="true"></i>
            </button>
        </div>
    );
};

export default StandardPanel;