import React, { useContext } from 'react';
import Button from '@components/ui/Button/Button';
import { useTranslation } from 'react-i18next';
import { BuilderContext } from '@modules/courses/contexts/BuilderContext';
import { FileMagnifyingGlass, MagnifyingGlass } from '@phosphor-icons/react';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '@shared/constants/routes';
import styles from './CourseBuilderControls.module.scss';

const CourseBuilderControls: React.FC = () => {
  const { handleSubmit } = useContext(BuilderContext);
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  const handleNavigateToPreview = () => {
    navigate(AppRoutes.CoursePreview);
  };
  
  return (
    <div className={styles.Wrapper}>
      <div className={styles.ControlButton}>
        <Button
          icon={<MagnifyingGlass size={16} />}
          text={t('courses.preview')}
          onClick={handleNavigateToPreview}
          styleType='bordered'
        />
        <Button
          icon='icon-upload'
          text={t('core.publish')}
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
};

export default CourseBuilderControls;
