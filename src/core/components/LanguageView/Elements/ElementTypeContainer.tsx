import React, { useState, useEffect } from 'react';
import { Accordion } from 'react-bootstrap';
import { queryLanguageElementTypes } from '../../../../DataProvider/Services/elementTypeService';

interface ElementContainerProps {
    languageUuid : string
}

export function ElementTypeContainer({ languageUuid }: ElementContainerProps) {
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
    
    return (
    <Accordion defaultActiveKey="0" onSelect={handleAccordionEnter}>
    {elements.map((element, index) => (
    <Accordion.Item eventKey={index.toString()} key={index}>
        <Accordion.Header>
            {element.name}
        </Accordion.Header>
        <Accordion.Body>
            <span>{element.description}</span>
            <pre><code className="language-javascript">
{JSON.stringify(element.style, null, 2)}
</code></pre>
        </Accordion.Body>
    </Accordion.Item>
    ))}
</Accordion>   
  );
}
