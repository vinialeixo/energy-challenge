import { useEffect, useState } from "react";

import { 
    getClientNumbers, 
    getByClientNumber, 
    getDocument, 
    invoiceImport 
} from "../api/services/Invoice";
import { months } from "../utils/months";
import { Title, Select } from "../components";
import { Template } from "../templates";

import styles from '../styles/invoices.module.scss'

export default function Invoices() {
    const [clientNumbers, setClientNumbers] = useState()
    const [clientNumberSelected, setClientNumberSelected] = useState()
    const [invoices, setInvoices] = useState()
    const [loader, setLoader] = useState()

    useEffect(() => {
        setLoader(true)
        getClientNumbers().then((response) => {
            setClientNumbers(response.data.data)
            setClientNumberSelected(response.data.data[0]?.clientNumber)
        })
    }, [])
    
    useEffect(() => {
        getByClientNumber({clientNumber: clientNumberSelected})
            .then((response) => {
                setInvoices(response.data.data)
                setLoader(false)
            })
    }, [clientNumberSelected])
    
    const handleClick = (invoice) => {
        const referenceMonthStr = invoice.referenceMonth.toString()
        const referenceMonth = referenceMonthStr.length === 1 ?
            `0${referenceMonthStr}` : invoice.referenceMonth

        const documentName = `${invoice.installationNumber}-${referenceMonth}-${invoice.referenceYear}`

        getDocument({documentName}).then((response) => {
            //Create a Blob from the PDF Stream
            const file = new Blob([response.data], { type: "application/pdf" })

            //Build a URL from the file
            const fileURL = URL.createObjectURL(file);
            let alink = document.createElement("a");
            alink.href = fileURL;
            alink.download = documentName;
            alink.click();
        })
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        setLoader(true)

        invoiceImport(new FormData(e.target)).then((response) => {
            setClientNumbers(undefined)
            setClientNumberSelected(undefined)

            if (response.data.status === "ok") {
                getClientNumbers().then((response) => {
                    setClientNumbers(response.data.data)
                    setClientNumberSelected(response.data.data[0]?.clientNumber)
                })
            }
        })
    }

    const getMonth = (monthNumber) => {
        return months[monthNumber].toUpperCase()
    }

    return (
        <Template >
            {clientNumbers && 
                <div className={styles.container}>
                    <Title>Faturas</Title>

                    <div className={styles.pageActions}>
                        <form onSubmit={onSubmit}> 
                            <input type="file" name="files" multiple/>
                            <input type="submit" value={'Processar'}/>
                        </form>
                        <div className={styles.select}>
                            <Select 
                                onChange={setClientNumberSelected} 
                                label="N° Cliente" 
                                items={clientNumbers}
                                itemValueProperty="clientNumber"
                                itemLabelProperty="clientNumber"
                            />
                        </div>
                    </div>

                    {loader ? <>Processando...</> : (

                        (invoices && invoices.length) > 0 ? (
                            <div className={styles.invoicesListSection}>
                                <div>Disponíveis</div>
                                <div className={styles.invoicesListContainer}>
                                    {invoices.map((invoice, idx) => (
                                        <div key={idx} 
                                            onClick={() => handleClick(invoice)}
                                        >
                                            {invoice.clientNumber} - 
                                            Fatura - 
                                            {getMonth(invoice.referenceMonth)} / 
                                            {invoice.referenceYear}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <>Nenhuma fatura disponível ainda...</>
                        )
                    )}
                </div>
            }
        </Template>
    )
}