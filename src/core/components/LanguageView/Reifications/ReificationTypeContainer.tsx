import { useState, useEffect } from 'react';
import { Accordion, Spinner } from 'react-bootstrap';
import { queryLanguageReificationTypes } from '../../../../DataProvider/Services/reificationTypeService';
import styles from './ReificationTypeContainer.module.css';
import { ReificationAccordionBody } from './ReificationAccordionBody';

interface ReificationContainerProps {
    languageUuid: string
}

export function ReificationTypeContainer({ languageUuid }: ReificationContainerProps) {
    const [reifications, setReifications] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        queryLanguageReificationTypes(languageUuid).then((response) => {
            setReifications(response.data || []);
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

    if (!reifications || reifications.length === 0) {
        return <div className="text-muted">No reifications</div>;
    }

    return (<>
            { reifications.map((reification, index) => (
                <Accordion onSelect={handleAccordionEnter} className={styles.accordionItemSpacing} key={index}>
                    <Accordion.Item eventKey={index.toString()}>
                        <Accordion.Header>
                            {reification.name}
                        </Accordion.Header>
                        <Accordion.Body>
                            <ReificationAccordionBody reification={reification} />
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            ))
        }</>
    );
}
