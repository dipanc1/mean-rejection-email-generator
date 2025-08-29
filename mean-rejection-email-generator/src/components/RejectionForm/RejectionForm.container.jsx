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
    const [copied, setCopied] = useState(false);

    const [companies, setCompanies] = useState([]);
    const [error, setError] = useState('');
    const [demoCount, setDemoCount] = useState(() => {
        const count = localStorage.getItem('demoCount');
        return count ? parseInt(count) : 0;
    });
    const [hasShownLoginPrompt, setHasShownLoginPrompt] = useState(false);

    const { isLoggedIn, setIsLoggedIn, setUser } = useAuth();

    const DEMO_LIMIT = 3;

    const meanTemplates = ["Dear CANDIDATE_NAME, \n\nYour application to COMPANY_NAME was a no - go.We’re moving on with better candidates.\n\nRegards, \nCOMPANY_NAME", "Hello CANDIDATE_NAME, \n\nWe got your application for COMPANY_NAME.It’s not what we’re looking for, so you’re out.\n\nSincerely, \nCOMPANY_NAME", "Hi CANDIDATE_NAME, \n\nThanks for trying with COMPANY_NAME, but your skills don’t cut it.We’re picking others.\n\nBest, \nCOMPANY_NAME", "Dear CANDIDATE_NAME, \n\nYour attempt to join COMPANY_NAME didn’t work out.We’ve got stronger options.\n\nRegards, \nCOMPANY_NAME", "Hello CANDIDATE_NAME, \n\nWe reviewed your application to COMPANY_NAME.It’s not good enough, so we’re passing.\n\nSincerely, \nCOMPANY_NAME", "Hi CANDIDATE_NAME, \n\nYour application to COMPANY_NAME was rejected.We’re going with people who fit better.\n\nCheers, \nCOMPANY_NAME", "Dear CANDIDATE_NAME, \n\nWe saw your application for COMPANY_NAME.It’s a hard no.Others are moving forward.\n\nRegards, \nCOMPANY_NAME", "Hello CANDIDATE_NAME, \n\nYour COMPANY_NAME application didn’t impress.We’re not interested.\n\nSincerely, \nCOMPANY_NAME", "Hi CANDIDATE_NAME, \n\nYou applied to COMPANY_NAME.It wasn’t worth our time.Try elsewhere.\n\nBest, \nCOMPANY_NAME", "Dear CANDIDATE_NAME, \n\nYour application to COMPANY_NAME is a pass.We’ve got better candidates lined up.\n\nRegards, \nCOMPANY_NAME", "Hello CANDIDATE_NAME, \n\nWe looked at your COMPANY_NAME application.It’s not up to par, so you’re out.\n\nSincerely, \nCOMPANY_NAME", "Hi CANDIDATE_NAME, \n\nYour shot at COMPANY_NAME missed the mark.We’re moving on without you.\n\nCheers, \nCOMPANY_NAME", "Dear CANDIDATE_NAME, \n\nYour COMPANY_NAME application was a letdown.We’re choosing others.\n\nRegards, \nCOMPANY_NAME", "Hello CANDIDATE_NAME, \n\nWe got your application for COMPANY_NAME.It’s not happening.Better luck elsewhere.\n\nSincerely, \nCOMPANY_NAME", "Hi CANDIDATE_NAME, \n\nYour application to COMPANY_NAME didn’t make the cut.We’re done here.\n\nBest, \nCOMPANY_NAME"];

    const meanerTemplates = ["Dear CANDIDATE_NAME, \n\nYour application to COMPANY_NAME was honestly a waste of our time.We’re moving on with candidates who actually have a clue.\n\nGood luck, you’ll need it, \nCOMPANY_NAME", "Hello CANDIDATE_NAME, \n\nWe reviewed your COMPANY_NAME application, and it’s clear you’re not even close to what we need.Try not to embarrass yourself next time.\n\nRegards, \nCOMPANY_NAME", "Hi CANDIDATE_NAME, \n\nYour attempt to join COMPANY_NAME was bold but pointless.We’re picking people who aren’t a total mismatch.\n\nBetter luck elsewhere, \nCOMPANY_NAME", "Dear CANDIDATE_NAME, \n\nYour COMPANY_NAME application was a swing and a miss.We’re not desperate enough to consider you.\n\nSincerely, \nCOMPANY_NAME", "Hello CANDIDATE_NAME, \n\nWe saw your application for COMPANY_NAME.It’s like you didn’t even try.We’re moving on with real talent.\n\nCheers, \nCOMPANY_NAME", "Hi CANDIDATE_NAME, \n\nYour COMPANY_NAME application was a joke, and not the funny kind.We’re going with candidates who know what they’re doing.\n\nGood luck, \nCOMPANY_NAME", "Dear CANDIDATE_NAME, \n\nYour application to COMPANY_NAME made us question your judgment.We’re passing—hard.\n\nRegards, \nCOMPANY_NAME", "Hello CANDIDATE_NAME, \n\nWe looked at your COMPANY_NAME application.It’s not even worth discussing.We’re choosing people who fit.\n\nSincerely, \nCOMPANY_NAME", "Hi CANDIDATE_NAME, \n\nYour attempt to join COMPANY_NAME was optimistic but delusional.We’re moving on with better options.\n\nBest, \nCOMPANY_NAME", "Dear CANDIDATE_NAME, \n\nYour COMPANY_NAME application was a letdown.We’re not here to hold your hand—try somewhere less picky.\n\nRegards, \nCOMPANY_NAME", "Hello CANDIDATE_NAME, \n\nWe got your application for COMPANY_NAME.It’s clear you’re out of your depth.We’re picking actual talent.\n\nSincerely, \nCOMPANY_NAME", "Hi CANDIDATE_NAME, \n\nYour COMPANY_NAME application was a waste of space.We’re not interested in mediocre.\n\nCheers, \nCOMPANY_NAME", "Dear CANDIDATE_NAME, \n\nYour attempt at COMPANY_NAME was laughable.We’re going with candidates who aren’t a liability.\n\nRegards, \nCOMPANY_NAME", "Hello CANDIDATE_NAME, \n\nYour COMPANY_NAME application didn’t even make us blink.We’re choosing people who belong here.\n\nSincerely, \nCOMPANY_NAME", "Hi CANDIDATE_NAME, \n\nWe saw your application to COMPANY_NAME.It’s a no—don’t make us say it twice.\n\nBest, \nCOMPANY_NAME"];

    const meanestTemplates = ["Dear CANDIDATE_NAME, \n\nYour application to COMPANY_NAME was an absolute disaster.Your skills are a joke, and we’re picking candidates who aren’t complete failures.\n\nDon’t come back, \nCOMPANY_NAME", "Hello CANDIDATE_NAME, \n\nWe suffered through your COMPANY_NAME application.It’s clear you’re utterly clueless.We’re not hiring charity cases.\n\nGood riddance, \nCOMPANY_NAME", "Hi CANDIDATE_NAME, \n\nYour attempt to join COMPANY_NAME was pathetic.You’re so far out of your league, it’s almost sad.Almost.\n\nGet lost, \nCOMPANY_NAME", "Dear CANDIDATE_NAME, \n\nYour COMPANY_NAME application was a trainwreck.We’re not desperate enough to scrape the bottom of the barrel like this.\n\nNever again, \nCOMPANY_NAME", "Hello CANDIDATE_NAME, \n\nWe saw your application for COMPANY_NAME and laughed out loud.You’re not even close to employable.Try a different planet.\n\nRegards, \nCOMPANY_NAME", "Hi CANDIDATE_NAME, \n\nYour COMPANY_NAME application was an insult to our intelligence.We’re picking candidates who aren’t a complete waste of oxygen.\n\nGoodbye, \nCOMPANY_NAME", "Dear CANDIDATE_NAME, \n\nYour attempt to join COMPANY_NAME was a bold move for someone so unqualified.We’re not running a circus, so you’re out.\n\nDon’t bother, \nCOMPANY_NAME", "Hello CANDIDATE_NAME, \n\nYour COMPANY_NAME application was so bad, we’re questioning how you function.We’re moving on with people who have actual skills.\n\nSee ya, \nCOMPANY_NAME", "Hi CANDIDATE_NAME, \n\nYour application to COMPANY_NAME was a masterclass in failure.We’re not here to fix your life choices.\n\nGood luck elsewhere, \nCOMPANY_NAME", "Dear CANDIDATE_NAME, \n\nYour COMPANY_NAME application was a disaster we can’t unsee.We’re choosing candidates who don’t make us cringe.\n\nStay away, \nCOMPANY_NAME", "Hello CANDIDATE_NAME, \n\nWe reviewed your COMPANY_NAME application and immediately regretted it.You’re not even close to our standards.\n\nDon’t try again, \nCOMPANY_NAME", "Hi CANDIDATE_NAME, \n\nYour shot at COMPANY_NAME was a colossal waste of everyone’s time.We’re picking people who aren’t a walking embarrassment.\n\nBye, \nCOMPANY_NAME", "Dear CANDIDATE_NAME, \n\nYour application to COMPANY_NAME was so awful, we’re still recovering.We’re not hiring liabilities like you.\n\nNever again, \nCOMPANY_NAME", "Hello CANDIDATE_NAME, \n\nYour COMPANY_NAME application was a grim reminder of why we have standards.You didn’t meet them.Not even close.\n\nRegards, \nCOMPANY_NAME", "Hi CANDIDATE_NAME, \n\nYour attempt to join COMPANY_NAME was so bad, we’re wondering how you thought this would work.We’re done here.\n\nGood luck fooling someone else, \nCOMPANY_NAME"];

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
        setCopied(false); // Reset copy status when generating new email
    };

    const copyToClipboard = async () => {
        try {
            const emailContent = `Subject: Application Status Update - ${companyName}\n\n${rejection}`;
            await navigator.clipboard.writeText(emailContent);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy: ', err);
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = `Subject: Application Status Update - ${companyName}\n\n${rejection}`;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
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
                setCompanies([]);
                setError('Please login to search companies');
                return;
            }
            if (!token) {
                setCompanies([]);
                return;
            }
            const data = await searchCompanies(query, token);
            if (data.error === 'Unauthorized') {
                setCompanies([]);
                setError('Your session has expired. Please login again.');
                return;
            }
            setCompanies(data);
        } catch (error) {
            setCompanies([]);
            setError('An error occurred while fetching companies');
        }
    }

    const handleErrorClose = () => {
        if (error === 'Your session has expired. Please login again.') {
            setIsLoggedIn(false);
            setUser(null);
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            localStorage.setItem('demoCount', '0');
        }
        setError('');
    };

    useEffect(() => {
        if (isLoggedIn) {
            setDemoCount(0);
            localStorage.setItem('demoCount', '0');
            setCompanies([]);
            setRejection('');
            setCopied(false);
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
                copied={copied}
                copyToClipboard={copyToClipboard}
            />
            <ErrorPopup
                message={error}
                onClose={handleErrorClose}
            />
        </>
    );
};

export default RejectionFormContainer;