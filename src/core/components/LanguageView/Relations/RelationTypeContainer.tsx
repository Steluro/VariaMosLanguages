import React, { useState, useEffect } from 'react';
import { Accordion, Spinner } from 'react-bootstrap';
import { queryLanguageRelationTypes } from '../../../../DataProvider/Services/relationType.service';
import styles from './RelationTypeContainer.module.css';
import { RelationAccordionBody } from './RelationAccordionBody';
import { RelationType } from '../../../../Domain/ProductLineEngineering/Entities/RelationType';

/**
 * Props for the RelationTypeContainer component
 * @interface RelationContainerProps
 * @property {string} languageUuid - The UUID of the language
 */
interface RelationContainerProps {
    languageUuid: string
}

/**
 * Container component for displaying relation types in an accordion
 * Fetches and displays all relation types for a given language
 * @param {RelationContainerProps} props - The component props
 * @returns {JSX.Element} The rendered relation type container
 */
export function RelationTypeContainer({ languageUuid }: RelationContainerProps) {
    const [relations, setRelations] = useState<RelationType[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        queryLanguageRelationTypes(languageUuid).then((response) => {
            setRelations(response.data || []);
            console.log(response.data);
        }).finally(() => {
            setLoading(false);
        });
    }, [languageUuid]);

    /**
     * Trigger Prism syntax highlighting when accordion opens
     */
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

    if (!relations || relations.length === 0) {
        return <div className="text-muted">No relations</div>;
    }

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
