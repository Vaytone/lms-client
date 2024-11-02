import React, { memo } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { selectCourseItemById } from '@modules/courses/redux/selectors';
import { useAppSelector } from '@shared/hooks/redux';
import HeadingBuilderTemplate
  from '@modules/courses/components/CourseBuilderItemTemplates/HeadingBuilderTemplate/HeadingBuilderTemplate';

type Props = {
  id: string,
}

const CourseBuilderItem: React.FC<Props> = ({ id }) => {
  const content = useAppSelector((state) => selectCourseItemById(id)(state));
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  
  return (
    // <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
    <div>
      <HeadingBuilderTemplate id={id}/>
    </div>
  );
};

export default memo(CourseBuilderItem);
