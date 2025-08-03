import { useState, useEffect } from "react";
import RejectionForm from "./RejectionForm";
import { searchCompanies } from "../../api";
import ErrorPopup from "../ErrorPopup";
import { useAuth } from '../../context/AuthContext';

const RejectionFormContainer = () => {
    const [candidateName, setCandidateName] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [rejection, setRejection] = useState('');
    const [tone, setTone] = useState(5);

    const [companies, setCompanies] = useState([]);
    const [error, setError] = useState('');
    const [demoCount, setDemoCount] = useState(() => {
        const count = localStorage.getItem('demoCount');
        return count ? parseInt(count) : 0;
    });
    const [hasShownLoginPrompt, setHasShownLoginPrompt] = useState(false);

    const { isLoggedIn } = useAuth();

    const DEMO_LIMIT = 3;

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
            setError('Please fill in both fields.');
            return;
        }

        const token = localStorage.getItem('token');
        if (!token) {
            const currentCount = parseInt(localStorage.getItem('demoCount') || '0');
            if (currentCount >= DEMO_LIMIT) {
                setError(`You've used all ${DEMO_LIMIT} demo attempts. Please login to continue generating rejection emails.`);
                return;
            }
            const newCount = currentCount + 1;
            localStorage.setItem('demoCount', newCount.toString());
            setDemoCount(newCount);
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
        setHasShownLoginPrompt(false);
        setError('');
    };

    const searchCompaniesApi = async (query) => {
        if (!query) {
            setCompanies([]);
            setCompanyName('');
            return;
        }
        try {
            setCompanyName(query);
            const token = localStorage.getItem('token');
            if (!token && !hasShownLoginPrompt) {
                setHasShownLoginPrompt(true);
                setCompanies([]); // Clear dropdown before showing error
                setError('Please login to search companies');
                return;
            }
            if (!token) {
                setCompanies([]);
                return;
            }
            const data = await searchCompanies(query, token);
            if (data.error === 'Unauthorized') {
                setCompanies([]); // Clear dropdown before showing error
                setError('Your session has expired. Please login again.');
                return;
            }
            setCompanies(data);
        } catch (error) {
            setCompanies([]); // Clear dropdown before showing error
            setError('An error occurred while fetching companies');
        }
    }

    useEffect(() => {
        if (isLoggedIn) {
            setDemoCount(0);
            localStorage.setItem('demoCount', '0');
            setCompanies([]);
            setRejection('');
        }
    }, [isLoggedIn]);

    return (
        <>
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
                demoCount={demoCount}
                demoLimit={DEMO_LIMIT}
            />
            <ErrorPopup
                message={error}
                onClose={() => setError('')}
            />
        </>
    );
};

export default RejectionFormContainer;