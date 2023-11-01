import React from 'react';
import {Trans} from "react-i18next";
import BypassSheetItem from "./bypassSheetItem";
import {useEffect, useState} from "react";
import instance from "../../../../../../../store/api";
import {useParams} from "react-router-dom";

const Schedule = () => {
    const [bypassSheets, setBypassSheet] = useState([])

    useEffect(function () {
        UrlHandlerBypassSheet()

    }, [])

    function UrlHandlerBypassSheet() {
        instance.get('api/security/schedule/')
            .then(res => {
                setBypassSheet(res.data.results);


            })

    }

    return (
        <div className={'container'}>
            <div className={'reference-div'}>
                <h2 className={'reference-title'}>
                    <Trans i18nKey="bypassSheet.pageTitle">
                        Расписание аудита
                    </Trans>
                </h2>

            </div>
            <div className={'m-3 p-1'}>
                {bypassSheets && bypassSheets.map(bypassSheet => (
                    <BypassSheetItem key={bypassSheet.id} bypassSheet={bypassSheet}/>
                ))}
            </div>
        </div>
    );
};

export default Schedule;