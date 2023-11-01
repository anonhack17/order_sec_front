import React, {useEffect, useState} from 'react';
import instance from "../../../store/api";
import Project from "../../../components/audit/home/project/project";

const AuditHome = () => {
    const [company, setCompany] = useState({})

    async function getCompanyInfo() {
        try {
            const response = await instance.get('api/company/company/');
            setCompany(response.data.results[0])
        } catch (e) {
        }
    }

    useEffect(() => {
        getCompanyInfo()
    }, [])

    return (
        <div className={'newStyle_container'}>
            <div className={'home_audit'}>
                <h1 className={'company_name'}>Название компании для аудита: "<cite>{company.name}</cite>"</h1>
                <cite className={'title-h2_r'}><p>Ведет тех поддержку: "<cite>{company.leader}</cite>"</p></cite>
            </div>

            <Project/>
        </div>
    );
};

export default AuditHome;
