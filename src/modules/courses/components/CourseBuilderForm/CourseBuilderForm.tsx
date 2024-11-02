import React, { useState } from 'react';
import TemplateList from '@modules/courses/components/TemplateList/TemplateList';
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  rectIntersection,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { BUILDER_TEMPLATE_IDS } from '@modules/courses/constants/builder';
import CourseBlockForm from '@modules/courses/components/CourseBlockForm/CourseBlockForm';
import AddBlockButton from '@modules/courses/components/AddBlockButton/AddBlockButton';
import { v4 } from 'uuid';
import { useAppDispatch } from '@shared/hooks/redux';
import { addCourseItem } from '@modules/courses/redux/slice';
import { BuilderBlockTypeEnum, HeadingCourseItem } from '@modules/courses/types/builder.types';

const CourseBuilderForm: React.FC = () => {
  const [isTemplateDragging, setIsTemplateDragging] = useState(false);
  const [blocks, setBlocks] = useState({});
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );
  const dispatch = useAppDispatch();
  
  const handleDragEnd = () => {
  
  };
  
  const handleDragStart = (event) => {
    const { active } = event;
    const { id } = active;
    
    if (BUILDER_TEMPLATE_IDS.includes(id)) {
      setIsTemplateDragging(true);
    } else {
      setIsTemplateDragging(false);
    }
  };
  
  const handleDragOver = () => {
  
  };
  
  const handleAddBlock = () => {
    const itemId = v4();
    const mockedItem: HeadingCourseItem = {
      id: itemId,
      data: {
        text: '',
        type: BuilderBlockTypeEnum.Heading,
      },
    };
    
    setBlocks((prev) => {
      return {
        ...prev,
        [v4()]: [itemId],
      };
    });
    
    dispatch(addCourseItem(mockedItem));
  };
  
  return (
    <div>
      <DndContext
        sensors={sensors}
        collisionDetection={rectIntersection}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <TemplateList/>
        
        <DragOverlay dropAnimation={isTemplateDragging ? null : undefined}>
          <p>123</p>
        </DragOverlay>
        
        {Object.keys(blocks).map((item) => {
          return (
            <CourseBlockForm key={item} items={blocks[item]}/>
          );
        })}
        
        <AddBlockButton addBlock={handleAddBlock}/>
      </DndContext>
    </div>
  );
};

export default CourseBuilderForm;
