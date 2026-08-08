import React, { useState, useEffect } from 'react';
import { Accordion } from 'react-bootstrap';
import { queryLanguageElementTypes } from '../../../../DataProvider/Services/elementType.service';
import styles from './ElementTypeContainer.module.css';
import { ElementAccordionBody } from './ElementAccordionBody.edition';

interface ElementContainerProps {
    languageUuid: string
}

export function ElementEditionTypeContainer({ languageUuid }: ElementContainerProps) {
    const [elements, setElements] = useState<any[]>([]);

    useEffect(() => {
        queryLanguageElementTypes(languageUuid).then((response) => {
            setElements(response.data || []);
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
