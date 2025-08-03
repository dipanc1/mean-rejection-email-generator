import { useState } from "react";
import RejectionForm from "./RejectionForm";
import { searchCompanies } from "../../api";

const RejectionFormContainer = () => {
    const [candidateName, setCandidateName] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [rejection, setRejection] = useState('');
    const [tone, setTone] = useState(5);

    const [companies, setCompanies] = useState([]);

    const meanTemplates = [
        "Dear CANDIDATE_NAME,\n\nWe got your application for COMPANY_NAME. It wasn’t good enough, so we’re picking other candidates.\n\nRegards,\nCOMPANY_NAME",
        "Hello CANDIDATE_NAME,\n\nYou tried applying to COMPANY_NAME. We’re not interested, so your application’s out.\n\nSincerely,\nCOMPANY_NAME",
        "Hi CANDIDATE_NAME,\n\nYour application to COMPANY_NAME didn’t cut it. We’re going with other candidates.\n\nGood luck elsewhere,\nCOMPANY_NAME"
    ];

    const meanerTemplates = [
        "Dear CANDIDATE_NAME,\n\nWe looked at your application for COMPANY_NAME and decided it’s not worth our time. You’re not moving forward. Good luck finding someone desperate enough to hire you.\n\nRegards,\nCOMPANY_NAME",
        "Hello CANDIDATE_NAME,\n\nYour application to COMPANY_NAME was reviewed, and it’s obvious you’re not up to par. We’re picking candidates who actually qualify. Try harder next time.\n\nRegards,\nCOMPANY_NAME",
        "Hi CANDIDATE_NAME,\n\nWe saw your application to COMPANY_NAME. It was a waste of effort—ours and yours. We’re not interested, so don’t bother us again.\n\nSincerely,\nCOMPANY_NAME"
    ];

    const meanestTemplates = [
        "Dear CANDIDATE_NAME,\n\nYour application to COMPANY_NAME was a joke. Your qualifications are pathetic, and we’re going with people who aren’t total failures. Don’t bother us again.\n\nSincerely,\nCOMPANY_NAME",
        "Hello CANDIDATE_NAME,\n\nWe checked your application for COMPANY_NAME, and it’s clear you’re clueless. Your skills are useless, and we’re not desperate enough to consider you. Good luck conning someone else into hiring you.\n\nRegards,\nCOMPANY_NAME",
        "Hi CANDIDATE_NAME,\n\nYour shot at COMPANY_NAME was laughable. We’re picking candidates who aren’t a complete waste of space. Maybe rethink your life choices.\n\nRegards,\nCOMPANY_NAME"
    ];

    const generateRejection = () => {
        if (!candidateName || !companyName) {
            setRejection('Please fill in both fields.');
            return;
        }

        let templates;
        if (tone <= 3) {
            templates = meanTemplates;
        } else if (tone <= 7) {
            templates = meanerTemplates;
        } else {
            templates = meanestTemplates;
        }

        const randomTemplate = templates[Math.floor(Math.random() * templates.length)]
            .replace(/CANDIDATE_NAME/g, candidateName)
            .replace(/COMPANY_NAME/g, companyName);

        setCandidateName('');
        setCompanyName('');
        setRejection(randomTemplate);
    };

    const searchCompaniesApi = async (query) => {
        if (!query) {
            setCompanies([]);
            setCompanyName('');
            return;
        }
        try {
            setCompanyName(query);
            await searchCompanies(query)
                .then(data => {
                    setCompanies(data);
                })

        } catch (error) {
            console.error('Error fetching companies:', error);
        }
    }


    return (
        <RejectionForm
            candidateName={candidateName}
            setCandidateName={setCandidateName}
            companyName={companyName}
            setCompanyName={setCompanyName}
            generateRejection={generateRejection}
            rejection={rejection}
            tone={tone}
            setTone={setTone}
            searchCompaniesApi={searchCompaniesApi}
            companies={companies}
            setCompanies={setCompanies}
        />

    );
};

export default RejectionFormContainer;