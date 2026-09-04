import {useEffect, useState} from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-lisp';
import style from "./Constraints.module.css";
import { ResponseModel } from '@variamosple/variamos-components';

/**
 * Props for the ConstraintsEdition component
 * @interface ConstraintsEditionProps
 * @property {string} constraints - The current constraints string
 * @property {string} languageId - The ID of the language
 * @property {string} elementUuid - The UUID of the element
 * @property {(languageId: string, objectUuid: string, data: Partial<{ constraint: string }>) => Promise<ResponseModel<any>>} updateFunction - Function to update constraints
 */
interface ConstraintsEditionProps {
  constraints: string;
  languageId: string;
  elementUuid: string;
  updateFunction : (languageId: string, objectUuid: string, data: Partial<{ constraint: string }>) => Promise<ResponseModel<any>>
}

/**
 * Component for editing constraints using a code editor with Lisp syntax highlighting
 * @param {ConstraintsEditionProps} props - The component props
 * @returns {JSX.Element} The rendered constraints editor component
 */
export function ConstraintsEdition({ constraints, languageId, elementUuid, updateFunction }: ConstraintsEditionProps) {
  const [code, setCode] = useState<string>(constraints||"");

  /**
   * Handle editor blur event to save constraints
   */
  const handleEditorBlur = () => {
    if(!code.trim()){
        updateFunction(languageId, elementUuid, {constraint: ""});
    }
    else{
        setCode(code.trim());
        updateFunction(languageId, elementUuid, {constraint: code});
    }
  };
  
  return (
    <div className={style.editor}>
    <Editor
      value={code}
      onValueChange={code => setCode(code)}
      highlight={code => highlight(code, languages.lisp, 'lisp')}
      padding={10}
      placeholder='Place for constraints...'
      onBlur={handleEditorBlur}
      style={{
        fontFamily: '"Fira code", "Fira Mono", monospace',
        fontSize: 12,
      }}
    />
    </div>
  );
}