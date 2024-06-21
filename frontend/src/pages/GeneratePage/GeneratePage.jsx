import { useState } from "react";
import PersonaCardGrid from './PersonaCardGrid';
import PersonaContentModal from './PersonaContentModal';
import PostContentModal from './PostContentModal';
import ErrorModal from './ErrorModal';
import CircularIndeterminate from "./CircularIndeterminate";
import { useDispatch, useSelector } from 'react-redux';
import { addPost } from '../../redux/userSlice.js';
import PostService from "../../services/PostService";

export default function GeneratePage() {
    const dispatch = useDispatch();
    const personas = useSelector(s => s.user.user.personas);
    const postService = new PostService(useSelector(s => s.user.user.uid));
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
            const content = await postService.generateText(selectedPersona, form.context.value);
            setGeneratedContent(content);
            setShowGeneratedContentModal(true);
        }
        catch (ex) {
            setShowErrorModal(true);
        }
        finally {
            setShowLoading(false);
        }
    }

    function handleAcceptContentClick(e) {
        e.preventDefault();
        const form = e.target;
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }
        dispatch(addPost({personaId: selectedPersona.id, content: generatedContent, isRejected: false}));
        resetState();
    }

    function handleRejectContentClick() {
        dispatch(addPost({personaId: selectedPersona.id, content: generatedContent, isRejected: true}));
        resetState();
    }

    return (
        <div className="page-container">
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
                onProceed={handleAcceptContentClick}
                rejectBtnText={'Reject'}
                onReject={handleRejectContentClick}
                content={generatedContent}
                persona={selectedPersona}
            />
            <ErrorModal 
                open={showErrorModal}
                onClose={resetState}
            />
        </div>
    );
}
