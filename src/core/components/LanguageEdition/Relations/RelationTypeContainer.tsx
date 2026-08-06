import React, { useState, useEffect } from 'react';
import { Accordion } from 'react-bootstrap';
import { queryLanguageRelationTypes } from '../../../../DataProvider/Services/relationTypeService';
import styles from './RelationTypeContainer.module.css';
import { RelationAccordionBody } from './RelationAccordionBody';

interface RelationContainerProps {
    languageUuid: string
}

export function RelationTypeContainer({ languageUuid }: RelationContainerProps) {
    const [relations, setRelations] = useState<any[]>([]);

    useEffect(() => {
        queryLanguageRelationTypes(languageUuid).then((response) => {
            setRelations(response.data || []);
            console.log(response.data);
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
            { relations.map((relation, index) => (
                <Accordion onSelect={handleAccordionEnter} className={styles.accordionItemSpacing} key={index}>
                    <Accordion.Item eventKey={index.toString()}>
                        <Accordion.Header>
                            {relation.name}
                        </Accordion.Header>
                        <Accordion.Body>
                            <RelationAccordionBody relation={relation} />
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            ))
        }</>
    );
}
