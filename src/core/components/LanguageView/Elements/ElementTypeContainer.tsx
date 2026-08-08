import React, { useState, useEffect } from 'react';
import { Accordion, Spinner } from 'react-bootstrap';
import { queryLanguageElementTypes } from '../../../../DataProvider/Services/elementType.service';
import styles from './ElementTypeContainer.module.css';
import { ElementAccordionBody } from './ElementAccordionBody';

interface ElementContainerProps {
    languageUuid: string
}

export function ElementTypeContainer({ languageUuid }: ElementContainerProps) {
    const [elements, setElements] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        queryLanguageElementTypes(languageUuid).then((response) => {
            setElements(response.data || []);
        }).finally(() => {
            setLoading(false);
        });
    }, [languageUuid]);

    const handleAccordionEnter = () => {
        // Trigger Prism syntax highlighting when accordion opens
        if (typeof window !== 'undefined' && (window as any).Prism) {
            setTimeout(() => {
                (window as any).Prism.highlightAll();
            }, 100);
        }
    };

    if (loading) {
        return (
            <div className="w-100 text-center" style={{ marginTop: "2rem" }}>
                <Spinner animation="border" role="status" variant="primary">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
        );
    }

    if (!elements || elements.length === 0) {
        return <div className="text-muted">No elements</div>;
    }

    return (<>
            { elements.map((element, index) => (
                <Accordion onSelect={handleAccordionEnter} className={styles.accordionItemSpacing} key={index}>
                    <Accordion.Item eventKey={index.toString()}>
                        <Accordion.Header>
                            {element.name}
                        </Accordion.Header>
                        <Accordion.Body>
                            <ElementAccordionBody element={element} />
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            ))
        }</>
    );
}
