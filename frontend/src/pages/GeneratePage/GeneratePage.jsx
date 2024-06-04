import { useState } from "react";
import PersonaService from "../../services/PersonaService";
import ContentGenerationService from "../../services/ContentGenerationService";
import PersonaCardGrid from './PersonaCardGrid';
import PersonaContentModal from './PersonaContentModal';
import PostContentModal from './PostContentModal';

export default function GeneratePage() {
    const personas = new PersonaService(1).get(); // TODO: change constructor call once auth figured out
    const contentGenerationService = new ContentGenerationService(1); // TODO: change constructor call once auth figured out
    const [showPersonaContentModal, setShowPersonaContentModal] = useState(false);
    const [showGenerateContentModal, setShowGenerateContentModal] = useState(false);
    const [showGeneratedContentModal, setShowGeneratedContentModal] = useState(false);
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

        try {
            setGeneratedContent(await contentGenerationService.getContent(selectedPersona, form.context.value));
        }
        catch (ex) {
            setGeneratedContent("We're sorry, content generation is currently unavailable. Please try again later.")
        }
        finally {
            setShowGenerateContentModal(false);
            setShowGeneratedContentModal(true);
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
                isAfter={false}
                proceedBtnText={'Generate'}
                onProceed={handleGenerateContentClick}
                rejectBtnText={'Cancel'}
                onReject={handleCancelGenerateContentClick}
                content={null}
                persona={selectedPersona}
            />
            <PostContentModal
                open={showGeneratedContentModal}
                isAfter={true}
                proceedBtnText={'Accept'}
                onProceed={handleApproveContentClick}
                rejectBtnText={'Reject'}
                onReject={handleRejectContentClick}
                content={generatedContent}
                persona={selectedPersona}
            />
        </>
    );
}