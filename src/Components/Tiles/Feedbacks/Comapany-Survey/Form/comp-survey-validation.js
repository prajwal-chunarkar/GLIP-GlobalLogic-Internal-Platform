export default function ValidateEmpCompanyForm(compSurveyData) {
    const {
        empSatisfaction,
        trainingDev,
        empEngagement,
        empBenifits,
        empLeadership,
        empFuturePlanning,
        empWorkDiversity,
        empCommunication,
    } = compSurveyData;

    if (
        !empSatisfaction ||
        !trainingDev ||
        !empEngagement ||
        !empBenifits ||
        !empLeadership ||
        !empFuturePlanning ||
        !empWorkDiversity ||
        !empCommunication 
    ) {
        return "Please Fill All Mandatory Fields";
    }
    return null;
}
