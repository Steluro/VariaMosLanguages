import {useEffect, useState} from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-lisp';
import style from "./Constraints.module.css";
import { ResponseModel } from '@variamosple/variamos-components';

interface ConstraintsEditionProps {
  constraints: string;
  languageId: string;
  elementUuid: string;
  updateFunction : (languageId: string, objectUuid: string, data: Partial<{ constraint: string }>) => Promise<ResponseModel<any>>
}

export function ConstraintsEdition({ constraints, languageId, elementUuid, updateFunction }: ConstraintsEditionProps) {
  const [code, setCode] = useState<string>(constraints||"");
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