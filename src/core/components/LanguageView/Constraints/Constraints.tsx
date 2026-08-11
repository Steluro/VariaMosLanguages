import React from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-lisp';

interface ConstraintsProps {
  code: string;
}

export function Constraints({ code }: ConstraintsProps) {
  return (
    <Editor
      value={code}
      onValueChange={() => {}}
      highlight={code => highlight(code, languages.lisp, 'lisp')}
      padding={10}
      readOnly={true}
      style={{
        fontFamily: '"Fira code", "Fira Mono", monospace',
        fontSize: 12,
        backgroundColor: 'white',
        borderRadius: '8px',
      }}
    />
  );
}
