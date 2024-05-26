import { getDocument } from "pdfjs-dist/build/pdf.mjs";
import { months } from "./months.js";

const getPDFText = async (source, password) => {
    const pdf = await getDocument({ data: source }).promise
    const page = await pdf.getPage(1);
    const textContent = await page.getTextContent();
    const strings = textContent.items.map(function (item) {
        return item.str;
    });
    const text = strings.join(" ")
    
    const clientNumber = text.match(/\s7[0-9]{9}\s/g)
    const installationNumber = text.match(/\s3[0-9]{9}\s/g)
    const referenceDate = text.match(/[A-Z]{3}\/[0-9]{4}/g)
    const eletricalPowerSentence = text.match(/Energia Elétrica\s{1,}kWh\s{1,}[0-9]{1,}(.|)[0-9]{1,}\s{1,}[0-9],[0-9]{1,}\s{1,}[0-9]{1,},[0-9]{1,}/g)
    const SCEEPowerSentence = text.match(/Energia SCEE s\/ ICMS\s{1,}kWh\s{1,}[0-9]{1,}(.|)[0-9]{1,}\s{1,}[0-9],[0-9]{1,}\s{1,}[0-9]{1,},[0-9]{1,}/g)
    const compensedPowerSentence = text.match(/Energia compensada GD I\s{1,}kWh\s{1,}[0-9]{1,}(.|)[0-9]{1,}\s{1,}[0-9],[0-9]{1,}\s{1,}(-|)[0-9]{1,},[0-9]{1,}/g)
    const publicContributionSentence = text.match(/Contrib Ilum Publica Municipal\s{1,}[0-9]{1,},[0-9]{1,}/g)
    
    const eletricalPowerValues = eletricalPowerSentence[0].replace(/\s{1,}/g, ' ').split('kWh')[1].trim().split(' ')
    const SCEEPowerValues = SCEEPowerSentence[0].replace(/\s{1,}/g, ' ').split('kWh')[1].trim().split(' ')
    const compensedPowerValues = compensedPowerSentence[0].replace(/\s{1,}/g, ' ').split('kWh')[1].trim().split(' ')
    
    const contribPublicaValues = publicContributionSentence[0].replace(/[a-zA-z]{1,}/g, '').replace(/\s{1,}/, '')
    
    const monthYear = referenceDate[0].split('/')
    
    return {
        clientNumber: clientNumber[0].trim(),
        installationNumber: installationNumber[0].trim(),
        referenceMonth: months[monthYear[0].toLowerCase()],
        referenceYear: parseInt(monthYear[1]),
        powerQuantity: parseFloat(eletricalPowerValues[0].replaceAll('.', '').replace(',', '.')),
        powerValue: parseFloat(eletricalPowerValues[2].replaceAll('.', '').replace(',', '.')),
        sceeePowerQuantity: parseFloat(SCEEPowerValues[0].replaceAll('.', '').replace(',', '.')),
        sceeePowerValue: parseFloat(SCEEPowerValues[2].replaceAll('.', '').replace(',', '.')),
        compensatedPowerQuantity: parseFloat(compensedPowerValues[0].replaceAll('.', '').replace(',', '.')),
        compensatedPowerValue: parseFloat(compensedPowerValues[2].replaceAll('.', '').replace(',', '.')),
        publicContribution: parseFloat(contribPublicaValues.replaceAll('.', '').replace(',', '.')),
    }
}


export default getPDFText