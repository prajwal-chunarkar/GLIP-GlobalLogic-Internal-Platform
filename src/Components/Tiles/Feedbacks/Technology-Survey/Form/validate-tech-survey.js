export default function ValidateTechSurvey(techSurveyData) {
    const {intech,cyber,cbs,comm } = techSurveyData;

    if(!intech && !cyber && !cbs && !comm) {
        return 'Please Select All Mandatory Fields'
    }

    if(!intech){
        return 'Please Select the option'
    }

    if(!cyber){
        return 'Please Select the option'
    }
    if(!cbs){
        return 'Please Select the option'
    }
    if(!comm){
        return 'Please Select the option'
    }
   

    return null;
} 