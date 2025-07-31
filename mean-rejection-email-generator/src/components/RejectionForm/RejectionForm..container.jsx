import { useState } from "react";

const RejectionForm = () => {
    const [candidateName, setCandidateName] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [rejection, setRejection] = useState('');

    const templates = [
        `Dear ${candidateName}, No, don’t even think about applying again for the next 6 months—you’ll just be rejected. Regards, ${companyName}`,
        `Dear ${candidateName}, Please stop. What were you thinking before applying? Sincerely, ${companyName}`
    ];

    const generateRejection = () => {
        const randomTemplate = templates[Math.floor(Math.random() * templates.length)];
        setRejection(randomTemplate);
    };

    return (
        <RejectionForm
            candidateName={candidateName}
            setCandidateName={setCandidateName}
            companyName={companyName}
            setCompanyName={setCompanyName}
            generateRejection={generateRejection}
            rejection={rejection}
        />

    );
};