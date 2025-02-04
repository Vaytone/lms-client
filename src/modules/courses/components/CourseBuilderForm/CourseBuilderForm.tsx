import React, { useState } from 'react';
import TemplateList from '@modules/courses/components/TemplateList/TemplateList';
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor, pointerWithin,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { BUILDER_TEMPLATE_IDS, BUILDER_TEMPLATES_DATA_TO_ADD } from '@modules/courses/constants/builder';
import CourseBlockForm from '@modules/courses/components/CourseBlockForm/CourseBlockForm';
import AddBlockButton from '@modules/courses/components/AddBlockButton/AddBlockButton';
import { v4 } from 'uuid';
import { useAppDispatch, useAppSelector } from '@shared/hooks/redux';
import { addBlock, addCourseItem, addItemToBlock, setBlocks } from '@modules/courses/redux/slice';
import CourseActiveTemplateItem from '@modules/courses/components/CourseActiveTemplateItem/CourseActiveTemplateItem';
import TemplateActiveItem from '@modules/courses/components/TemplateActiveItem/TemplateActiveItem';

const CourseBuilderForm: React.FC = () => {
  const [isTemplateDragging, setIsTemplateDragging] = useState(false);
  const [activeId, setActiveId] = useState(null);
  const [overId, setOverId] = useState(null);
  const blocks = useAppSelector((state) => state.courseBuilder.blocks);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );
  const dispatch = useAppDispatch();
  
  const findContainer = (id: string) => {
    if (id in blocks) {
      return id;
    }
    
    return Object.keys(blocks).find((key) => blocks[key].includes(id));
  };
  
  const handleDragEnd = (event) => {
    const { active, over } = event;
    const { id } = active;
    const isBuilderTempate = BUILDER_TEMPLATE_IDS.includes(id);
    
    const { id: overId } = over;
    
    if (!overId) {
      setOverId(null);
      return null;
    }
    
    const overContainer = findContainer(overId);
    
    if (overId === 'addButton') {
      dispatch(addBlock({
        id: v4(),
        init: {
          id: v4(),
          data: {
            ...BUILDER_TEMPLATES_DATA_TO_ADD[id],
          },
        },
      }));
      setOverId(null);
      return;
    }
    
    const overIndex = blocks[overContainer].indexOf(overId);
    if (isBuilderTempate && overId) {
      const itemId = v4();

      const itemToAdd = {
        id: itemId,
        data: {
          ...BUILDER_TEMPLATES_DATA_TO_ADD[id],
        },
      };
      dispatch(addItemToBlock({ containerId: overContainer, itemId }));
      dispatch(addCourseItem(itemToAdd));
    }
    
    if (!isBuilderTempate && overId) {
      const activeContainer = findContainer(id);
      
      const activeIndex = blocks[activeContainer].indexOf(active.id);
      
      if (activeIndex !== overIndex) {
        const movedBlocks = {
          ...blocks,
          [overContainer]: arrayMove(
            blocks[overContainer],
            activeIndex,
            overIndex,
          ),
        };
        
        dispatch(setBlocks(movedBlocks));
      }
    }
    setOverId(null);
    setActiveId(null);
    
    return null;
  };
  
  const handleDragStart = (event) => {
    const { active } = event;
    const { id } = active;
    const isBuilderTemplate = BUILDER_TEMPLATE_IDS.includes(id);
    setActiveId(id);
    if (isBuilderTemplate) {
      setIsTemplateDragging(true);
    } else {
      setIsTemplateDragging(false);
    }
  };
  
  const handleDragOver = (event) => {
    const { active, over, draggingRect } = event;
    const { id } = active;
    
    if (!over) {
      setOverId(null);
      return null;
    }
    
    const { id: overId } = over;
    
    const overContainer = findContainer(overId);
    const isBuilderTemplate = BUILDER_TEMPLATE_IDS.includes(id);
    
    if (isBuilderTemplate) {
      setOverId(overContainer);
    }
    
    const activeContainer = findContainer(id);
    if (
      !activeContainer
      || !overContainer
      || activeContainer === overContainer
    ) {
      return;
    }
    
    const activeItems = blocks[activeContainer];
    const overItems = blocks[overContainer];
    
    const activeIndex = activeItems.findIndex((item) => item === id);
    const overIndex = overItems.findIndex((item) => item === overId);
    
    let newIndex;
    if (overId in blocks) {
      newIndex = overItems.length + 1;
    } else {
      const isBelowLastItem = over
        && overIndex === overItems.length - 1
        && draggingRect?.offsetTop > over.rect.offsetTop + over.rect.height;
      
      const modifier = isBelowLastItem ? 1 : 0;
      
      newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
    }
    
    const res = {
      ...blocks,
      [activeContainer]: [
        ...blocks[activeContainer].filter((item) => item !== active.id),
      ],
      [overContainer]: overContainer ? [
        ...blocks[overContainer].slice(0, newIndex),
        blocks[activeContainer][activeIndex],
        ...blocks[overContainer].slice(newIndex, blocks[overContainer].length),
      ] : [...blocks[overContainer]],
    };
    
    dispatch(setBlocks(res));
  };
  
  const generateOverlay = () => {
    if (activeId) {
      const isBuilderTemplate = BUILDER_TEMPLATE_IDS.includes(activeId);
      
      if (isBuilderTemplate) {
        return <TemplateActiveItem id={activeId}/>;
      }
      return <CourseActiveTemplateItem id={activeId}/>;
    }
    
    return null;
  };
  
  const handleAddBlock = () => {
    dispatch(addBlock({
      id: v4(),
    }));
  };
  
  return (
    <div>
      <DndContext
        sensors={sensors}
        collisionDetection={pointerWithin}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <TemplateList/>
        
        <DragOverlay dropAnimation={isTemplateDragging ? null : undefined}>
          {generateOverlay()}
        </DragOverlay>
        
        {Object.keys(blocks).map((item) => {
          return (
            <CourseBlockForm
              key={item}
              items={blocks[item]}
              id={item}
              isOverMe={overId === item}
            />
          );
        })}
        
        <AddBlockButton addBlock={handleAddBlock}/>
      </DndContext>
    </div>
  );
};

export default CourseBuilderForm;
