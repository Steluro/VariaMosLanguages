import React, { useState, useEffect } from 'react';
import { Accordion, Spinner, Button } from 'react-bootstrap';
import { createElementType, deleteElementType, queryLanguageElementTypes } from '../../../../DataProvider/Services/elementType.service';
import { PlusCircle, Trash } from 'react-bootstrap-icons';
import styles from './ElementTypeContainer.module.css';
import { ElementAccordionBody } from './ElementAccordionBody.edition';
import CreationModal from '../CreationModal'
import ConfirmationModal from '../../ConfirmationModal';
interface ElementContainerProps {
    languageUuid: string
}

export function ElementEditionTypeContainer({ languageUuid }: ElementContainerProps) {
    const [elements, setElements] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [creationModal, setCreationModal] = useState(false);
    const [deletionModal, setDeletionModal] = useState(false);
    const [toDeleteElementUuid, setToDeleteElementUuid] = useState<string>(null);

    useEffect(() => {
        setLoading(true);
        queryLanguageElementTypes(languageUuid).then((response) => {
            setElements(response.data || []);
            setLoading(false);
        });
    }, [languageUuid]);

    useEffect(() => {
        if(toDeleteElementUuid){
            setDeletionModal(true);
        }
    },[toDeleteElementUuid]);

    const handleAccordionEnter = () => {
        // Trigger Prism syntax highlighting when accordion opens
        if (typeof window !== 'undefined' && (window as any).Prism) {
            setTimeout(() => {
                (window as any).Prism.highlightAll();
            }, 100);
        }
    };

    const handleElementCreation = (name :string) => {
        setLoading(true);
        createElementType(languageUuid, {languageId: languageUuid, name: name}).then((response) => {
            queryLanguageElementTypes(languageUuid).then((response) => {
                setElements(response.data || []);
                setLoading(false);
            });
        })
    } 

    const handleConfirmDeletion = () => {
        setLoading(true);
        deleteElementType(languageUuid, toDeleteElementUuid).then((response) => {
            queryLanguageElementTypes(languageUuid).then((response) => {
                setElements(response.data || []);
                setLoading(false);
            });
        })
        setToDeleteElementUuid("");
        setDeletionModal(false);
    }

    return (<>
            <Button variant="primary" className={styles.accordionItemSpacing} onClick={() => setCreationModal(true)}>
                Add Element <PlusCircle className="ms-2" /> 
            </Button>
            {loading && <div className="w-100 text-center"><Spinner animation="border" role="status" variant="primary" /></div>}
            {!loading && elements.length === 0 && <div className="text-muted">No elements</div>}
            {!loading && elements.length > 0 && (<>
                { elements.map((element, index) => (
                    <Accordion onSelect={handleAccordionEnter} className={styles.accordionItemSpacing} key={index}>
                        <Accordion.Item eventKey={index.toString()}>
                            <Accordion.Header >
                                    <div>{element.name}
                                </div>
                            </Accordion.Header>
                            <Accordion.Body>
                                <ElementAccordionBody element={element} setToDeleteElementUuid={setToDeleteElementUuid}/>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>))
                }</>)
            }
            <CreationModal
                show={creationModal}
                objectName="Element"
                onHide={() => {setCreationModal(false)}}
                onCreate={handleElementCreation}
            />
            <ConfirmationModal
            show={deletionModal}
            onCancel={()=>setDeletionModal(false)}
            onConfirm={handleConfirmDeletion}
            message="Are your sure you want to delete this element?"
            confirmButtonVariant='danger'
            />
        </>
    );
}
