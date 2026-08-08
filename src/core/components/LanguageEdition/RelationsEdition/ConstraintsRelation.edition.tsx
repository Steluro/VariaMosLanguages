import {useEffect, useState} from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-lisp';
import { updateRelation } from '../../../../DataProvider/Services/relationType.service';
import style from "./ConstraintsRelation.module.css";

interface ConstraintsEditionProps {
  constraints: string;
  languageId: string;
  elementUuid: string;
}

export function ConstraintsRelation({ constraints, languageId, elementUuid }: ConstraintsEditionProps) {
  const [code, setCode] = useState<string>(constraints||`"""Please Edit Constraints"""`);
  const handleEditorBlur = () => {
    if(!code.trim()){
      setCode(`"""Please Edit Constraints"""`);
    }
    else{
        setCode(code.trim());
        if(code === `"""Please Edit Constraints"""`) return;
        updateRelation(languageId, elementUuid, {constraint: code});
    }
  };
  
  return (
    <div className={style.editor}>
    <Editor
      value={code}
      onValueChange={code => setCode(code)}
      highlight={code => highlight(code, languages.lisp, 'lisp')}
      padding={10}
      onBlur={handleEditorBlur}
      style={{
        fontFamily: '"Fira code", "Fira Mono", monospace',
        fontSize: 12,
      }}
    />
    </div>
  );
}