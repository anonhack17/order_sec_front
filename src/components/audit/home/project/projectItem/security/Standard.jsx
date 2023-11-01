import React from 'react';
import {useEffect, useState} from "react";
import instance from "../../../../../../store/api";
import {useParams} from "react-router-dom";

const Standard = (props) => {
    const [standard, setStandard] = useState([])
    let {id} = useParams()
    useEffect(function () {
        UrlHandlerStandard()

    }, [])

    function UrlHandlerStandard() {
        instance.get('api/security/standard/')
            .then(res => {
                setStandard(res.data.results);


            })

    }

    let standardMany = standard.filter((p) => p.project == id)

    return (
        <div>
            {
                standardMany.map((standardOne) => (
                    <div >
                        <div className="company-info company-sec">
                            <h2>{standardOne && standardOne.title}</h2>
                            <p>{standardOne && standardOne.description}</p>

                        </div>
                    </div>
                ))
            }
        </div>
    );
};

export default Standard;