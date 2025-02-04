import React, { useContext, useState } from 'react';
import Button from '@components/ui/Button/Button';
import { useTranslation } from 'react-i18next';
import { MagnifyingGlass } from '@phosphor-icons/react';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '@shared/constants/routes';
import { useAppDispatch, useAppSelector } from '@shared/hooks/redux';
import { triggerCourseValidation } from '@modules/courses/redux/slice';
import { validateCourseForm } from '@modules/courses/helper/builder.helper';
import { BuilderContext } from '@modules/courses/context/BuilderContext';
import { createCourse } from '@modules/courses/redux/thunks';
import { BuilderBlockTypeEnum } from '@modules/courses/types/builder.types';
import styles from './CourseBuilderControls.module.scss';

const CourseBuilderControls: React.FC = () => {
  const { files } = useContext(BuilderContext);
  const courseData = useAppSelector((state) => state.courseBuilder);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  
  const handleNavigateToPreview = () => {
    navigate(AppRoutes.CoursePreview);
  };
  
  const handleSubmit = async () => {
    const validationResult = await validateCourseForm(courseData);
    
    console.log(courseData);
    
    dispatch(triggerCourseValidation());
    
    const formData = new FormData();
    
    const fileMap = new Map(files.map((file) => [file.id, file.file]));

    const updatedItems = Object.values(courseData.items).map((item) => {
      if (item.data.type === BuilderBlockTypeEnum.Image || item.data.type === BuilderBlockTypeEnum.File && fileMap.has(item.data.fileId)) {
        const file = fileMap.get(item.data.fileId);
        
        const fileKey = `${item.data.fileId}`;
        formData.append(fileKey, file as File);
      }
      return item;
    });
    
    formData.append('items', JSON.stringify(updatedItems));
    formData.append('blocks', JSON.stringify(courseData.blocks));
    formData.append('blocksInfo', JSON.stringify(courseData.blocksInfo));
    formData.append('main', JSON.stringify(courseData.main));
    
    dispatch(createCourse(formData));
  };
  
  return (
    <div className={styles.Wrapper}>
      <div className={styles.ControlButton}>
        <Button
          icon={<MagnifyingGlass size={16}/>}
          text={t('courses.preview')}
          onClick={handleNavigateToPreview}
          styleType="bordered"
        />
        <Button
          icon="icon-upload"
          text={t('core.publish')}
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
};

export default CourseBuilderControls;
