import React, { memo, useCallback, useRef, useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import ErrorMessage from '@components/ui/ErrorMessage/ErrorMessage';
import 'setimmediate';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './TextEditor.css';
import cn from 'classnames';
import styles from './TextEditor.module.scss';

type Props = {
  value: string | null,
  onChange: (editor: string) => void,
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
  
  const handleChange = useCallback((val: string) => {
    setTouched(true);
    onChange(val);
  }, []);
  
  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline'],
      ['strike'],
      ['link'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ script: 'sub' }, { script: 'super' }],
    
    ],
    clipboard: {
      matchVisual: false,
    },
  };
  
  return (
    <>
      {label && (
        <p onClick={handleFocus} className={styles.Label}>{label as string}</p>
      )}
      <ReactQuill
        theme="snow"
        modules={modules}
        value={value}
        onChange={handleChange}
        bounds="#quillContainer"
        className={cn(styles.Editor, isInvalid && styles.EditorInvalid)}
      />
      <div className={styles.ErrorMessageWrapper}>
        {showError && <ErrorMessage text={error}/>}
      </div>
    </>
  );
};

export default memo(TextEditor);
