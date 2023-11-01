import React, {useEffect, useState} from 'react';
import instance from "../../../../../../store/api";
import {useParams} from "react-router-dom";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Policy = () => {
    const [policy, setPolicy] = useState([])
    let {id} = useParams()

    useEffect(function () {
        UrlHandlerPolicy()

    }, [])

    function UrlHandlerPolicy() {
        instance.get('api/security/policy/')
            .then(res => {
                setPolicy(res.data.results);


            })

    }

    let policyOne = policy.find((p) => p.project == id)
    return (
        <div>

            <div className="company-info">
                <h2>{policyOne && policyOne.title}</h2>
                <div dangerouslySetInnerHTML={{ __html: policyOne && policyOne.content}} />
            </div>

        </div>
    );
};

export default Policy;