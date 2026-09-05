import React from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-lisp';

/**
 * Props for the Constraints component
 * @interface ConstraintsProps
 * @property {string} code - The constraint code to display
 */
interface ConstraintsProps {
  code: string;
}

/**
 * Read-only code editor component for displaying constraint code
 * Uses Prism.js for syntax highlighting of Lisp code
 * @param {ConstraintsProps} props - The component props
 * @returns {JSX.Element} The rendered constraints editor
 */
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
