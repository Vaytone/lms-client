import React from 'react';
import DOMPurify from 'dompurify';
import styles from './SanitizeHTML.module.scss';

type Props = {
  html: string,
}

const SanitizeHTML: React.FC<Props> = ({ html }) => {
  const clean = DOMPurify.sanitize(html, { ADD_TAGS: ['a'], ADD_ATTR: ['href', 'target'] });
  
  return (
    <div
      className={styles.Text}
      /* eslint-disable-next-line react/no-danger */
      dangerouslySetInnerHTML={{ __html: clean }}
    />
  );
};

export default SanitizeHTML;
