import { useState } from "react";
import PersonaService from "../../services/PersonaService";
import ContentGenerationService from "../../services/ContentGenerationService";
import PersonaCardGrid from './PersonaCardGrid';
import PersonaContentModal from './PersonaContentModal';
import PostContentModal from './PostContentModal';
import ErrorModal from './ErrorModal';
import CircularIndeterminate from "./CircularIndeterminate";

export default function GeneratePage() {
    const personas = new PersonaService(1).get(); // TODO: change constructor call once auth figured out
    const contentGenerationService = new ContentGenerationService(1); // TODO: change constructor call once auth figured out
    const [showLoading, setShowLoading] = useState(false);
    const [showPersonaContentModal, setShowPersonaContentModal] = useState(false);
    const [showGenerateContentModal, setShowGenerateContentModal] = useState(false);
    const [showGeneratedContentModal, setShowGeneratedContentModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [selectedPersona, setSelectedPersona] = useState(undefined);
    const [generatedContent, setGeneratedContent] = useState(undefined);

    function handleShowPersonaContentClick(persona) {
        setSelectedPersona(persona);
        setShowPersonaContentModal(true);
    }

    function handleClosePersonaContentClick() {
        setShowPersonaContentModal(false);
        setSelectedPersona(undefined);
    }

    function handleSelectPersonaClick(persona) {
        setSelectedPersona(persona);
        setShowGenerateContentModal(true);
    }

    function handleCancelGenerateContentClick() {
        setShowGenerateContentModal(false);
        setSelectedPersona(undefined);
    }

    function resetState() {
        setShowErrorModal(false);
        setShowGeneratedContentModal(false);
        setSelectedPersona(undefined);
        setGeneratedContent(undefined);
    }

    async function handleGenerateContentClick(e) {
        e.preventDefault();
        const form = e.target;
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        setShowGenerateContentModal(false);
        setShowLoading(true);
        try {
            setGeneratedContent(await contentGenerationService.getContent(selectedPersona, form.context.value));
            setShowGeneratedContentModal(true);
        }
        catch (ex) {
            setShowErrorModal(true);
        }
        finally {
            setShowLoading(false);
        }
    }

    function handleApproveContentClick(e) {
        e.preventDefault();
        const form = e.target;
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        console.log('approved');
        resetState();
    }

    function handleRejectContentClick() {
        console.log('rejected');
        resetState();
    }

    return (
        <>
            {showLoading && <CircularIndeterminate />}
            <PersonaCardGrid
                personas={personas}
                onShowPersonaContentClick={handleShowPersonaContentClick}
                onSelectPersonaClick={handleSelectPersonaClick}
            />
            <PersonaContentModal
                open={showPersonaContentModal}
                onClose={handleClosePersonaContentClick}
                persona={selectedPersona}
            />
            <PostContentModal
                open={showGenerateContentModal}
                proceedBtnText={'Generate'}
                onProceed={handleGenerateContentClick}
                rejectBtnText={'Cancel'}
                onReject={handleCancelGenerateContentClick}
                content={null}
                persona={selectedPersona}
            />
            <PostContentModal
                open={showGeneratedContentModal}
                proceedBtnText={'Accept'}
                onProceed={handleApproveContentClick}
                rejectBtnText={'Reject'}
                onReject={handleRejectContentClick}
                content={generatedContent}
                persona={selectedPersona}
            />
            <ErrorModal 
                open={showErrorModal}
                onClose={resetState}
            />
        </>
    );
}
