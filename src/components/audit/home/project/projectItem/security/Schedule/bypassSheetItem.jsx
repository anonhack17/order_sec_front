import React, {useState} from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Trans } from 'react-i18next';


const BypassSheetItem = ({bypassSheet}) => {
    var createdAt = new Date(bypassSheet.created_at)
    var date = `${createdAt.getDate()}:${createdAt.getMonth()}:${createdAt.getFullYear()}`

    const [loader, setLoader] = useState(false);

    const downloadPDF = (id) => {
        const capture = document.querySelector(`#actual-receipt${bypassSheet.id}`);
        setLoader(true);
        html2canvas(capture).then((canvas) => {
            const imgData = canvas.toDataURL('img/png');
            const doc = new jsPDF('p', 'mm', 'a4');
            const componentWidth = doc.internal.pageSize.getWidth();
            const componentHeight = doc.internal.pageSize.getHeight();
            doc.addImage(imgData, 'PNG', 0, 10, componentWidth, componentHeight / 2);
            setLoader(false);
            doc.save('receipt.pdf');
        })
    }

    return (
        <div className={`reference-card container attendance-table mb-5 `}>
            <div id={`actual-receipt${bypassSheet.id}`} className={`p-3`}>
                <div className="reference-card__info">
                    <h3 className="reference-card__title mb-3">{bypassSheet.title}</h3>
                    <h4 className="reference-card__name text-lg-start p-2 m-2">{bypassSheet.text1}</h4>
                </div>
                <table>
                    <thead>
                    <tr>
                        <th><Trans i18nKey="bypassSheet.name">
                            Название
                        </Trans>:</th>
                        <th><Trans i18nKey="bypassSheet.pod">
                            Подпись
                        </Trans>:</th>
                    </tr>
                    </thead>
                    <tbody>
                    {bypassSheet.bypass_sheet_field.map((field) => (
                        <tr key={field}>
                            <td>{field}</td>
                            <td></td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <h4 className="reference-card__name text-lg-start p-2 m-2">{bypassSheet.text2}</h4>
                <div style={{
                    display: "flex",
                    justifyContent: "space-between", marginTop: "50px"
                }}>
                    <p className="reference-card__phone">{date}</p>
                </div>
            </div>
            <button style={{fontSize: "13px"}} className={'btn btn-primary'} onClick={downloadPDF}><Trans i18nKey="btns.PDF">
                Скачать PDF
            </Trans></button>
        </div>
    );
};

export default BypassSheetItem;