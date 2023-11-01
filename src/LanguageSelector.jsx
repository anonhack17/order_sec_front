import React from 'react';
import { useTranslation } from 'react-i18next';

function LanguageSelector() {
    const { i18n } = useTranslation();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        window.location.reload();
    };

    return (
        <div style={{margin: "0 25px 0 0"}}>
            <button className="nav-link text-white" style={{border:"none", background:"none"}} onClick={() => changeLanguage('kz')}>KZ</button>
            <button className="nav-link text-white" style={{border:"none", background:"none"}} onClick={() => changeLanguage('ru')}>RU</button>
        </div>
    );
}

export default LanguageSelector;