import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import PersonaCardCarousel from './PersonaCardCarousel';
import ErrorModal from './ErrorModal';
import LoadingOverlay from "./LoadingOverlay";
import { addPost } from '../../redux/userSlice.js';
import PostService from "../../services/PostService";
import GenerateContentForm from './GenerateContentForm';
import ProcessContentForm from './ProcessContentForm';

export default function GeneratePage() {
    const dispatch = useDispatch();
    const personas = useSelector(s => s.user.user.personas);
    const postService = new PostService(useSelector(s => s.user.user.uid));
    const [showLoadingOverlay, setShowLoadingOverlay] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [selectedPersona, setSelectedPersona] = useState(undefined);
    const [generatedContent, setGeneratedContent] = useState(undefined);

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
            const content = await postService.generateText(selectedPersona, form.context.value);
            setGeneratedContent(content);
        }
        catch (ex) {
            setShowErrorModal(true);
        }
        finally {
            setShowLoadingOverlay(false);
        }
    }

    function resetState() {
        setShowErrorModal(false);
        setSelectedPersona(undefined);
        setGeneratedContent(undefined);
    }

    function handleProcessContentSubmit(e, form, isRejected) {
        e.preventDefault();
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }
        dispatch(addPost({ personaId: selectedPersona.id, content: form.post.value, isRejected }));
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

    return (
        <div className="page-container">
            <LoadingOverlay showLoadingOverlay={showLoadingOverlay} />
            <PersonaCardCarousel
                personas={personas}
                selectedPersona={selectedPersona}
                generatedContent={generatedContent}
                onSelectPersonaClick={handleSelectPersonaClick}
            /> 
            <div className='generate-page-pane-separator'></div>
            <GenerateContentForm
                onSubmit={handleGenerateContentClick}
                generatedContent={generatedContent}
                selectedPersona={selectedPersona}
            />
            <div className='generate-page-pane-separator'></div>
            <ProcessContentForm
                onSubmit={handleProcessContentSubmit}
                onAccept={handleAcceptContentClick}
                onReject={handleRejectContentClick}
                generatedContent={generatedContent}
            />
            <ErrorModal open={showErrorModal} onClose={resetState} />
        </div>
    );
}
