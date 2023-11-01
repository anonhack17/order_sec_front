import React, {useEffect, useState} from 'react';
import instance from "../../../../store/api";
import {Link} from "react-router-dom";

const Project = () => {
    const [project, setProject] = useState([])

    async function getCompanyInfo() {
        try{
            const response = await instance.get('api/project/project/');
            setProject(response.data.results)
            debugger
        }catch (e) {
        }
    }



    useEffect(() => {
        getCompanyInfo()
    }, [])

    return (
        <div>

            <div className={"project_card"}>
                <h1 className={"project_title"}>Проекты компании:</h1>
                {
                    project.map((proj) => (
                        <div className={'project_item'}>
                            <Link style={{display: 'flex'}} className={'title-h2'} to={'project/'+ proj.id}>
                                <div>
                                    <h4>Название проета копании: "<cite>{proj.name}</cite>"</h4>
                                    <p><cite>Ведет проект: {proj.leader}</cite></p>
                                </div>
                            </Link>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default Project;