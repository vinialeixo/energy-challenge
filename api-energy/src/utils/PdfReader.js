import { getDocument } from "pdfjs-dist/build/pdf.mjs";
import { months } from "./months.js";

const getPDFText = async (source, password) => {
    try {
        const pdf = await getDocument({ data: source }).promise;
        const page = await pdf.getPage(1);
        const textContent = await page.getTextContent();
        const strings = textContent.items.map(item => item.str);
        const text = strings.join(" ");
        
        const clientNumberMatch = text.match(/\s7[0-9]{9}\s/g);
        const installationNumberMatch = text.match(/\s3[0-9]{9}\s/g);
        const referenceDateMatch = text.match(/[A-Z]{3}\/[0-9]{4}/g);
        const eletricalPowerSentenceMatch = text.match(/Energia Elétrica\s{1,}kWh\s{1,}[0-9]{1,}(.|)[0-9]{1,}\s{1,}[0-9],[0-9]{1,}\s{1,}[0-9]{1,},[0-9]{1,}/g);
        const SCEEPowerSentenceMatch = text.match(/Energia SCEE s\/ ICMS\s{1,}kWh\s{1,}[0-9]{1,}(.|)[0-9]{1,}\s{1,}[0-9],[0-9]{1,}\s{1,}[0-9]{1,},[0-9]{1,}/g);
        const compensedPowerSentenceMatch = text.match(/Energia compensada GD I\s{1,}kWh\s{1,}[0-9]{1,}(.|)[0-9]{1,}\s{1,}[0-9],[0-9]{1,}\s{1,}(-|)[0-9]{1,},[0-9]{1,}/g);
        const publicContributionSentenceMatch = text.match(/Contrib Ilum Publica Municipal\s{1,}[0-9]{1,},[0-9]{1,}/g);
        
        if (!clientNumberMatch || !installationNumberMatch || !referenceDateMatch || 
            !eletricalPowerSentenceMatch || !SCEEPowerSentenceMatch || 
            !compensedPowerSentenceMatch || !publicContributionSentenceMatch) {
            throw new Error("Valores necessários não encontrados no PDF.");
        }

        const clientNumber = clientNumberMatch[0].trim();
        const installationNumber = installationNumberMatch[0].trim();
        const referenceDate = referenceDateMatch[0];
        const eletricalPowerSentence = eletricalPowerSentenceMatch[0];
        const SCEEPowerSentence = SCEEPowerSentenceMatch[0];
        const compensedPowerSentence = compensedPowerSentenceMatch[0];
        const publicContributionSentence = publicContributionSentenceMatch[0];
        
        const eletricalPowerValues = eletricalPowerSentence.replace(/\s{1,}/g, ' ').split('kWh')[1].trim().split(' ');
        const SCEEPowerValues = SCEEPowerSentence.replace(/\s{1,}/g, ' ').split('kWh')[1].trim().split(' ');
        const compensedPowerValues = compensedPowerSentence.replace(/\s{1,}/g, ' ').split('kWh')[1].trim().split(' ');
        
        const contribPublicaValues = publicContributionSentence.replace(/[a-zA-z]{1,}/g, '').replace(/\s{1,}/, '');
        
        const monthYear = referenceDate.split('/');
        
        return {
            clientNumber: clientNumber,
            installationNumber: installationNumber,
            referenceMonth: months[monthYear[0].toLowerCase()],
            referenceYear: parseInt(monthYear[1]),
            powerQuantity: parseFloat(eletricalPowerValues[0].replaceAll('.', '').replace(',', '.')),
            powerValue: parseFloat(eletricalPowerValues[2].replaceAll('.', '').replace(',', '.')),
            sceeePowerQuantity: parseFloat(SCEEPowerValues[0].replaceAll('.', '').replace(',', '.')),
            sceeePowerValue: parseFloat(SCEEPowerValues[2].replaceAll('.', '').replace(',', '.')),
            compensatedPowerQuantity: parseFloat(compensedPowerValues[0].replaceAll('.', '').replace(',', '.')),
            compensatedPowerValue: parseFloat(compensedPowerValues[2].replaceAll('.', '').replace(',', '.')),
            publicContribution: parseFloat(contribPublicaValues.replaceAll('.', '').replace(',', '.')),
        };
    } catch (error) {
        throw new Error("Erro ao processar o PDF: " + error.message);
    }
};

export default getPDFText;
