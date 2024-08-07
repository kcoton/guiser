import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PersonaCardCarousel from './PersonaCardCarousel';
import ErrorModal from './ErrorModal';
import LoadingOverlay from './LoadingOverlay';
import { createContent, generateText } from '../../services/ContentService';
import GenerateContentForm from './GenerateContentForm';
import ProcessContentForm from './ProcessContentForm';
import LengthNotice from './LengthNotice';
import { addContent } from '../../redux/userSlice';
import { getSocialApps } from '../../services/SocialAppService';

export default function GeneratePage() {
    const dispatch = useDispatch();
    const personas = useSelector((state) => state.user.db?.personas?.filter((p) => !p.deleted));
    const userId = useSelector((state) => state.user.db?._id);
    const [showLoadingOverlay, setShowLoadingOverlay] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [selectedPersona, setSelectedPersona] = useState(undefined);
    const [generatedContent, setGeneratedContent] = useState(undefined);
    const [contentLength, setContentLength] = useState(0);
    const [socialApps, setSocialApps] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const apps = await getSocialApps();
            setSocialApps(apps);
        }
        fetchData();
    }, []);

    function handleSelectPersonaClick(persona) {
        if (!generatedContent) {
            setSelectedPersona(persona);
        }
    }

    async function handleGenerateContentClick(e) {
        e.preventDefault();
        const form = e.target;
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        setShowLoadingOverlay(true);
        try {
            const content = await generateText(selectedPersona, form.context.value);
            setGeneratedContent(content);
            setContentLength(content.normalize('NFC').length);
        } catch (ex) {
            setShowErrorModal(true);
        } finally {
            setShowLoadingOverlay(false);
        }
    }

    function resetState() {
        setShowErrorModal(false);
        setSelectedPersona(undefined);
        setGeneratedContent(undefined);
        setContentLength(0);
    }

    async function handleProcessContentSubmit(e, form, isRejected) {
        e.preventDefault();
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }
        const newContentEntry = await createContent(userId, selectedPersona._id, form.content.value, isRejected);
        dispatch(addContent({ personaId: selectedPersona._id, newContentEntry }));
        resetState();
    }

    function handleAcceptContentClick(e) {
        e.preventDefault();
        const form = e.target.closest('form');
        handleProcessContentSubmit(e, form, false);
    }

    function handleRejectContentClick(e) {
        e.preventDefault();
        const form = e.target.closest('form');
        handleProcessContentSubmit(e, form, true);
    }

    function handleContentChange(e) {
        setContentLength(e.target.value.normalize('NFC').length);
    }

    return (
        <>
            <LoadingOverlay showLoadingOverlay={showLoadingOverlay} />
            <PersonaCardCarousel
                personas={personas}
                selectedPersona={selectedPersona}
                generatedContent={generatedContent}
                onSelectPersonaClick={handleSelectPersonaClick}
            />
            <GenerateContentForm
                onSubmit={handleGenerateContentClick}
                generatedContent={generatedContent}
                selectedPersona={selectedPersona}
            />
            <ProcessContentForm
                onSubmit={handleProcessContentSubmit}
                onAccept={handleAcceptContentClick}
                onReject={handleRejectContentClick}
                onContentChange={handleContentChange}
                generatedContent={generatedContent}
            />
            <LengthNotice socialApps={socialApps} contentLength={contentLength} />
            <ErrorModal open={showErrorModal} onClose={resetState} />
        </>
    );
}
