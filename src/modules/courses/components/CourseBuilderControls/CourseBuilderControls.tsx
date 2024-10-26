import React, { useContext, useMemo, useState } from 'react';
import Button from '@components/ui/Button/Button';
import { useTranslation } from 'react-i18next';
import { BuilderContext } from '@modules/courses/contexts/BuilderContext';
import { ListMagnifyingGlass, MagnifyingGlass, Link } from '@phosphor-icons/react';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '@shared/constants/routes';
import { HashLink } from 'react-router-hash-link';
import styles from './CourseBuilderControls.module.scss';

const CourseBuilderControls: React.FC = () => {
  // const { handleSubmit, getCourseData } = useContext(BuilderContext);
  // const courseData = useMemo(() => getCourseData(), [getCourseData()]);
  const [isStructureOpen, setStructureOpen] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  const handleNavigateToPreview = () => {
    navigate(AppRoutes.CoursePreview);
  };
  
  const handleSubmit = () => {};
  const getCourseData = () => {};
  
  const toggleStructure = () => {
    setStructureOpen((prev) => !prev);
  };
  
  return (
    <div className={styles.Wrapper}>
      <div className={styles.ControlButton}>
        
        {/*<div className={styles.StructureWrapper}>*/}
        {/*  {isStructureOpen && (*/}
        {/*    <div className={styles.StructureContent}>*/}
        {/*      <div className={styles.Structure}>*/}
        {/*        <h3 className={styles.StructureMainTitle}>Структура курсу</h3>*/}
        {/*        <p className={styles.StructureDescription}>Це структура вашого курсу, ви можете клікнути по елементу,*/}
        {/*          щоб перейти до нього</p>*/}
        {/*        {courseData.blocks.map((item, index) => {*/}
        {/*          return (*/}
        {/*            <div className={styles.ItemsWrapper}>*/}
        {/*              <p className={styles.StructureTitle}>{t('courses.blockN', {value: index + 1})}</p>*/}
        {/*              {item.items.map((subItem) => {*/}
        {/*                return (*/}
        {/*                  <div className={styles.StructureItems}>*/}
        {/*                    */}
        {/*                    <HashLink*/}
        {/*                      to={`#${subItem.id}`}*/}
        {/*                      scroll={(el) => el.scrollIntoView({behavior: 'smooth', block: 'center'})}*/}
        {/*                    >*/}
        {/*                      <div className={styles.LinkWrapper}>*/}
        {/*                        <Link size={16}/>*/}
        {/*                        {t(`courses.${subItem.data.type}`)}*/}
        {/*                      </div>*/}
        {/*                    </HashLink>*/}
        {/*                  </div>*/}
        {/*                );*/}
        {/*              })}*/}
        {/*            </div>*/}
        {/*          );*/}
        {/*        })}*/}
        {/*      </div>*/}
        {/*    </div>*/}
        {/*  )}*/}
        {/*  */}
        {/*  <Button*/}
        {/*    icon={<ListMagnifyingGlass size={16}/>}*/}
        {/*    text={t('courses.structure')}*/}
        {/*    onClick={toggleStructure}*/}
        {/*    styleType="transparent"*/}
        {/*  />*/}
        {/*</div>*/}
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
