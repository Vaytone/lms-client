import React, { memo, useCallback, useId, useRef, useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState } from 'draft-js';
import ErrorMessage from '@components/ui/ErrorMessage/ErrorMessage';
import cn from 'classnames';
import styles from './TextEditor.module.scss';
import { htmlToText } from 'html-to-text';

type Props = {
  value: EditorState | null,
  onChange: (editor: EditorState) => void,
  label?: string,
  error?: string,
  isInvalid?: boolean,
}

const TextEditor: React.FC<Props> = ({ value, label, onChange, isInvalid, error }) => {
  const [touched, setTouched] = useState(true);
  const showError = error && touched;
  const ref = useRef<Editor>(null);
  
  const handleFocus = () => {
    if (ref.current) {
      ref.current.focusEditor();
    }
  };
  
  const handleChange = useCallback((val: EditorState) => {
    setTouched(true);
    onChange(val);
  }, []);
  
  return (
    <>
      {label && (
        <p onClick={handleFocus} className={styles.Label}>{label as string}</p>
      )}
      <Editor
        ref={ref}
        editorState={value}
        editorClassName={
          cn(
            styles.Editor,
            isInvalid && touched ? styles.EditorInvalid : '',
          )
        }
        toolbar={{
          options: ['inline', 'blockType'],
          blockType: {
            inDropdown: false,
            options: [],
          },
        }}
        onEditorStateChange={handleChange}
      />
      <div className={styles.ErrorMessageWrapper}>
        {showError && <ErrorMessage text={error}/>}
      </div>
    </>
  );
};

export default memo(TextEditor);
