import React, { useCallback, useContext, useState } from 'react';
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import Column from '@modules/courses/components/Column/Column';
import ComponentsList from '@modules/courses/components/ComponentsList/ComponentsList';
import { BUILDER_BLOCKS, BUILDER_IDS, BuilderAreasEnum } from '@modules/courses/constants/builder';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { v4 } from 'uuid';
import BuilderItemActive from '@modules/courses/components/BuilderItemActive/BuilderItemActive';
import BlockActiveItem from '@modules/courses/components/BlockActiveItem/BlockActiveItem';
import { BuilderContext } from '@modules/courses/contexts/BuilderContext';
import AddBlockButton from '@modules/courses/components/AddBlockButton/AddBlockButton';
import { BuilderItem } from '@modules/courses/types/builder.types';

const initOverData = {
  containerId: null,
  index: null,
};

const CourseBuilder: React.FC = () => {
  const { items, setItems, addBlock } = useContext(BuilderContext);
  const [activeId, setActiveId] = useState();
  const [activeBlock, setActiveBlock] = useState(null);
  const [overData, setOverData] = useState(initOverData);
  
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );
  
  const findContainer = (id: string) => {
    if (id in items) {
      return id;
    }
    
    return Object.keys(items).find((key) => {
      if (!items[key]) {
        return undefined;
      }
      
      return items[key].map((item) => {
        return item.id;
      }).includes(id);
    });
  };
  
  const handleDragStart = (event) => {
    const { active } = event;
    const { id } = active;

    if (active?.data?.current?.sortable?.containerId === BuilderAreasEnum.ComponentList) {
      const activeBlock = BUILDER_BLOCKS.find((item) => item.id === id);
      setActiveBlock(activeBlock);
      
      if (active) {
        setActiveId(id);
      }
    } else {
      const itemWithContent = Object.keys(items).find((key) => {
        if (!items[key]) {
          return undefined;
        }

        return items[key].map((item) => item.id).includes(id);
      });

      const activeBlock = items[itemWithContent].find((item) => item.id === id);
      setActiveBlock(activeBlock);

      if (active) {
        setActiveId(id);
      }
    }
  };
  
  const handleDragOver = (event) => {
    const { active, over, draggingRect } = event;
    
    const { id } = active;
    
    if (!over) {
      return;
    }
    
    const { id: overId } = over;
    
    if (over) {
      const activeContainer = findContainer(id);
      const overContainer = findContainer(overId);
      
      setOverData((prev) => ({ ...prev, containerId: overContainer }));
      
      if (
        !activeContainer
        || !overContainer
        || activeContainer === overContainer
      ) {
        return;
      }
      
      const isBuilderBlock = BUILDER_IDS.includes(id);
      
      if (!isBuilderBlock) {
        setItems((prev) => {
          const activeItems = prev[activeContainer];
          const overItems = prev[overContainer];
          
          // Find the indexes for the items
          const activeIndex = activeItems.findIndex((item) => item.id === id);
          const overIndex = overItems.findIndex((item) => item.id === overId);
          
          let newIndex;
          if (overId in prev) {
            // We're at the root droppable of a container
            
            newIndex = overItems.length + 1;
          } else {
            const isBelowLastItem = over
              && overIndex === overItems.length - 1
              && draggingRect?.offsetTop > over.rect.offsetTop + over.rect.height;
            
            const modifier = isBelowLastItem ? 1 : 0;
            
            newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
          }
          
          const res = {
            ...prev,
            [activeContainer]: [
              ...prev[activeContainer].filter((item) => item.id !== active.id),
            ],
            [overContainer]: overContainer ? [
              ...prev[overContainer].slice(0, newIndex),
              items[activeContainer][activeIndex],
              ...prev[overContainer].slice(newIndex, prev[overContainer].length),
            ] : [...prev[overContainer]],
          };
          
          return res;
        });
      } else if (
        Object.keys(items).includes(over.id)
        && over.id !== BuilderAreasEnum.ComponentList && over.id !== active.data?.current?.sortable?.containerId
      ) {
        setOverData((prev) => {
          return {
            ...prev,
            containerId: over.id,
          };
        });
      } else if (
        !Object.keys(items).includes(over.id)
        && over?.data?.current?.sortable?.containerId
        && over.id !== BuilderAreasEnum.ComponentList
        && over?.data?.current?.sortable?.containerId !== active.data?.current?.sortable?.containerId
      ) {
        setOverData((prev) => {
          return {
            ...prev,
            containerId: over?.data?.current?.sortable?.containerId,
          };
        });
      } else if (
        over?.data?.current?.sortable?.containerId === active.data?.current?.sortable?.containerId
        || over.id === active.data?.current?.sortable?.containerId
      ) {
        setOverData((prev) => {
          return {
            ...prev,
            containerId: null,
          };
        });
      }
    }
    
    return null;
  };
  
  const resetDragData = () => {
    setActiveId(null);
    setActiveBlock(null);
    setOverData(initOverData);
  };
  
  const handleDragEnd = (event) => {
    const { active, over } = event;
    
    if (!over || !active) {
      resetDragData();
      return;
    }
    
    const { id } = active;
    const { id: overId } = over;
    
    const activeContainer = findContainer(id);
    const overContainer = findContainer(overId);
    const isBuilderBlock = BUILDER_IDS.includes(id);
    
    if (isBuilderBlock && overId === BuilderAreasEnum.AddButton) {
      const data = BUILDER_BLOCKS.find((item) => item.id === id).dataToAdd;
      const blockToAdd = {
        id: v4(),
        data,
      } as BuilderItem;
      addBlock(blockToAdd);
      
      resetDragData();
    }
    
    if (!isBuilderBlock && overId === BuilderAreasEnum.AddButton) {
      resetDragData();
      
      return;
    }
    
    if (!isBuilderBlock && !overContainer) {
      resetDragData();
      
      return;
    }
    
    if (!isBuilderBlock) {
      if (
        !activeContainer
        || !overContainer
      ) {
        resetDragData();
        return;
      }
    }
    
    if (!isBuilderBlock && overContainer === BuilderAreasEnum.ComponentList) {
      resetDragData();
      return;
    }
    
    if (isBuilderBlock && activeContainer === overContainer) {
      resetDragData();
      return;
    }
    
    if (isBuilderBlock) {
      const data = BUILDER_BLOCKS.find((item) => item.id === id).dataToAdd;
      const blockToAdd = {
        id: v4(),
        data,
      } as BuilderItem;
      
      setItems((items) => (
        {
          ...items,
          [overContainer]: [...items[overContainer], blockToAdd],
        }
      ));
    } else {
      const activeIndex = items[activeContainer].map((item) => item.id).indexOf(active.id);
      const overIndex = items[overContainer].map((item) => item.id).indexOf(overId);
      
      if (activeIndex !== overIndex) {
        setItems((items) => {
          const result = {
            ...items,
            [overContainer]: arrayMove(
              items[overContainer],
              activeIndex,
              overIndex,
            ),
          };
          
          return result;
        });
      }
    }
    
    resetDragData();
  };
  
  const getDragOverlayItem = useCallback(() => {
    const isInBuilderBlocks = BUILDER_BLOCKS.find((item) => {
      return item.id === activeId;
    });
    
    if (isInBuilderBlocks) {
      return <BuilderItemActive id={activeId}/>;
    }
    
    return <BlockActiveItem item={activeBlock}/>;
  }, [activeId]);
  
  return (
    <DndContext
      // announcements={defaultAnnouncements}
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      {Object.keys(items).filter((key) => key !== BuilderAreasEnum.ComponentList).map((item) => {
        return (
          <Column
            key={item}
            id={item}
            items={items[item]}
            activeId={activeId}
            isOverMe={overData.containerId === item}
            isBuilderActive={BUILDER_IDS.includes(activeId)}
          />
        );
      })}
      
      <AddBlockButton isBuilderActive={BUILDER_IDS.includes(activeId)} />
      
      <DragOverlay>
        {activeId ? getDragOverlayItem() : null}
      </DragOverlay>
      
      <ComponentsList items={BUILDER_BLOCKS}/>
    </DndContext>
  );
};

export default CourseBuilder;
