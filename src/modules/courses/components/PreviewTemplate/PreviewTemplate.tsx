import React from 'react';
import CourseContent from '@modules/courses/components/CourseContent/CourseContent';
import { useAppSelector } from '@shared/hooks/redux';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import styles from './PreviewTemplate.module.scss';

const PreviewTemplate: React.FC = () => {
  const courseData = useAppSelector((state) => state.courseBuilder);
  const { t } = useTranslation();
  
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };
  
  return (
    <div className={styles.CourseContent}>
      <div className={styles.Course}>
        <div className={styles.CourseHeader}>
          <h2 className={styles.Title}>{courseData.main.title}</h2>
          <p className={styles.Description}>
            {courseData.main.description}
          </p>
        </div>
        {Object.keys(courseData.blocks).map((key, index) => {
          return (
            <div className={styles.Block} key={key} id={key}>
              <h3
                className={styles.BlockTitle}
              >
                {courseData.blocksInfo?.[key]?.title.trim() || t('courses.blockN', { value: index + 1 })}
              </h3>
              <div className={styles.Divider}/>
              {courseData.blocks[key].map((subItem) => {
                return (
                  <div className={styles.Item} key={`${subItem}-blockId`}>
                    <CourseContent id={subItem}/>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
      
      <div className={styles.CourseNavigation}>
        {Object.keys(courseData.blocks).map((key, index) => {
          return (
            <p onClick={() => scrollToSection(key)} key={`${key}-nav`} className={cn(styles.NavigationItem)}>{courseData.blocksInfo?.[key]?.title.trim() || t('courses.blockN', { value: index + 1 })}</p>
          );
        })}
      </div>
    </div>
  );
};

export default PreviewTemplate;
