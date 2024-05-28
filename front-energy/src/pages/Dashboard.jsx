import { useEffect, useState } from "react";
import { 
    LineChart, 
    Line, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    Legend
} from 'recharts';

import { getClientNumbers, getByClientNumber } from "../api/services/Invoice";
import { months } from "../utils/months";
import { Template } from "../templates";
import { Title, Select } from "../components";

import styles from '../styles/dashboard.module.scss'

export default function Dashboard() {
    const [clientNumbers, setClientNumbers] = useState()
    const [clientNumberSelected, setClientNumberSelected] = useState()
    const [invoices, setInvoices] = useState()

    useEffect(() => {
        getClientNumbers().then((response) => {
            setClientNumbers(response.data.data)
            console.log(response.data)
            setClientNumberSelected(response.data.data[0]?.clientNumber)
        })
    }, [])
    
    useEffect(() => {
        getByClientNumber({clientNumber: clientNumberSelected})
            .then((response) => setInvoices(response.data.data))
    }, [clientNumberSelected])
    
    const getMonths = (data) => {
        return months[data.referenceMonth]
    }

    return (
        <Template>
            <div className={styles.container}>
                <Title>Dashboard</Title>

                {(clientNumbers && clientNumbers.length > 0) &&
                    <div className={styles.pageActions}>
                        <div className={styles.select}>
                            <Select 
                                items={clientNumbers} 
                                label={'N° Cliente'} 
                                onChange={setClientNumberSelected}
                                itemLabelProperty={'clientNumber'}
                                itemValueProperty={'clientNumber'}
                            />
                        </div>
                    </div>
                }

                {(invoices && invoices.length > 0) ? 
                    <div className={styles.graphContent}>
                        <LineChart
                            width={700}
                            height={500}
                            data={invoices}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                            >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey={getMonths} 
                                label={{ 
                                    value: 'Tempo (meses)', 
                                    position: 'insideBottomRight', 
                                    offset: 0
                                }}
                            />
                            <YAxis domain={['dataMin - 100', 'auto']} 
                                label={{ 
                                    value: 'Consumo (kWh)', 
                                    angle: -90, 
                                    position: 'insideLeft' 
                                }}
                            />
                            <Tooltip />
                            <Legend verticalAlign="top" height={36}/>
                            <Line 
                                type="monotone" 
                                dataKey={(data)=> {
                                    return (data.powerQuantity + 
                                        data.sceeePowerQuantity).toFixed(2)
                                }} 
                                name="Consumo de Energia Elétrica"
                                stroke="#8884d8" 
                                activeDot={{ r: 8 }} 
                            />
                            <Line 
                                name="Energia Compensada"
                                type="monotone" 
                                dataKey="compensatedPowerQuantity" 
                                stroke="#82ca9d" 
                                activeDot={{ r: 8 }} 
                            />
                        </LineChart>
                    
                        <LineChart
                            width={700}
                            height={500}
                            data={invoices}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                            
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey={getMonths} 
                                label={{ 
                                    value: 'Tempo (meses)', 
                                    position: 'insideBottomRight', 
                                    offset: 0
                                }}
                            />
                            <YAxis domain={['dataMin - 100', 'auto']} 
                                label={{ value: 'Custo (R$)', angle: -90, position: 'insideLeft' }}
                            />
                            <Tooltip />
                            <Legend verticalAlign="top" height={36}/>
                            <Line 
                                type="monotone" 
                                dataKey={(data)=> {
                                    return (data.powerValue + 
                                        data.sceeePowerValue + 
                                        data.publicContribution).toFixed(2)
                                }} 
                                name="Valor Total sem GD"
                                stroke="#8884d8" 
                                activeDot={{ r: 8 }} 
                            />
                            <Line 
                                name="Economia GD"
                                type="monotone"
                                dataKey={(data) => {
                                    return (data.compensatedPowerValue * -1).toFixed(2)
                                }} 
                                stroke="#82ca9d" 
                                activeDot={{ r: 8 }} 
                            />
                            <Line 
                                name="Valor pago"
                                type="monotone"
                                dataKey={(data) => {
                                    return ((data.powerValue + 
                                        data.sceeePowerValue + 
                                        data.publicContribution) + data.compensatedPowerValue).toFixed(2)
                                }} 
                                stroke="#FF0000" 
                                activeDot={{ r: 8 }} 
                            />
                        </LineChart>
                    </div> : 
                    (<>Nenhum dado disponível ainda...</>)
                }
            </div>
        </Template>
    );
  }