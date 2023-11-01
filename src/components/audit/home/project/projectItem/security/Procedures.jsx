import React from 'react';
import {useEffect, useState} from "react";
import instance from "../../../../../../store/api";
import {useParams} from "react-router-dom";

const Procedures = (props) => {
    const [procedures, setProcedures] = useState([])
    let {id} = useParams()
    useEffect(function () {
        UrlHandlerProcedures()

    }, [])

    function UrlHandlerProcedures() {
        instance.get('api/security/procedure/')
            .then(res => {
                setProcedures(res.data.results);


            })

    }

    let proceduresMany = procedures.filter((p) => p.project == id)

    return (
        <div>
            {
                proceduresMany && proceduresMany.map((proceduresOne) => (
                   <div>
                       <div className="company-info company-sec">
                           <h2>{proceduresOne && proceduresOne.title}</h2>
                           <p>{proceduresOne && proceduresOne.description}</p>

                       </div>
                   </div>
                ))
            }
        </div>
    );
};

export default Procedures;