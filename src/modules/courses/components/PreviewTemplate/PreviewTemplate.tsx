import React, { useContext, useMemo } from 'react';
import { BuilderContext } from '@modules/courses/contexts/BuilderContext';
import {
  BuilderBlockType,
  BuilderItem,
  CommentBlock, ImageBlock,
  TitleBlock,
} from '@modules/courses/types/builder.types';
import CourseHeading from '@modules/courses/components/CouserContent/CourseHeading/CourseHeading';
import CourseComment from '@modules/courses/components/CouserContent/CourseComment/CourseComment';
import CourseDivider from '@modules/courses/components/CouserContent/CourseDivider/CourseDivider';
import SanitizeHTML from '@components/SanitizeHTML/SanitizeHTML';
import CourseImage from '@modules/courses/components/CouserContent/CourseImage/CourseImage';
import styles from './PreviewTemplate.module.scss';

const PreviewTemplate: React.FC = () => {
  const { getCourseData } = useContext(BuilderContext);
  const data = useMemo(() => getCourseData(), [getCourseData]);
  
  const generateBlock = (item: BuilderItem) => {
    switch (item.data.type) {
    case BuilderBlockType.Heading:
      return <CourseHeading item={item as TitleBlock}/>;
    case BuilderBlockType.Text:
      return <SanitizeHTML html={item.data.text}/>;
    case BuilderBlockType.Comment:
      return <CourseComment item={item as CommentBlock}/>;
    case BuilderBlockType.Divider:
      return <CourseDivider/>;
    case BuilderBlockType.Image:
      return <CourseImage item={item as ImageBlock}/>;
    default:
      return null;
    }
  };
  
  return (
    <div>
      <div className={styles.Content}>
        <h2 className={styles.Title}>{data.form.title}</h2>
        <p className={styles.Description}>
          {data.form.description}
        </p>
      </div>
      
      {data.blocks.map((item) => {
        return (
          <div className={styles.Block}>
            <h3>
              {item.title}
            </h3>
            <div className={styles.Divider}/>
            {item.items.map((subItem) => {
              return (
                <div className={styles.Item}>
                  {generateBlock(subItem)}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default PreviewTemplate;
