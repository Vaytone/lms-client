import React, { useCallback, useEffect, useState } from 'react';
import {
  defaultAnnouncements,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  rectIntersection,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import Column from '@modules/courses/components/Column/Column';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import ComponentsList from '@modules/courses/components/ComponentsList/ComponentsList';
import CourseBuilderControls from '@modules/courses/components/CourseBuilderControls/CourseBuilderControls';
import {
  BUILDER_BLOCKS,
  BUILDER_BLOCKS_TO_ADD,
  BUILDER_IDS,
  COMPONENTS_LIST,
} from '@modules/courses/constants/builder.constants';
import BuilderItemActive from '@modules/courses/components/BuilderItemActive/BuilderItemActive';
import {
  restrictToWindowEdges,
} from '@dnd-kit/modifiers';
import { log } from 'node:util';
import { v4 } from 'uuid';
import BlockActiveItem from '@modules/courses/components/BlockActiveItem/BlockActiveItem';
import styles from './BuilderTemplate.module.scss';

function getRandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateRandomText() {
  const subjects = ['Кіт', 'Людина', 'Птах', 'Робот', 'Дерево'];
  const verbs = ['біжить', 'стрибає', 'літає', 'думає', 'грається'];
  const objects = ['по полю', 'на даху', 'в лісі', 'під водою', 'на вулиці'];
  const phrases = [];
  
  const sentenceCount = Math.floor(Math.random() * 2) + 3; // 3-4 речення
  
  for (let i = 0; i < sentenceCount; i++) {
    const subject = getRandomElement(subjects);
    const verb = getRandomElement(verbs);
    const object = getRandomElement(objects);
    const sentence = `${subject} ${verb} ${object}.`;
    phrases.push(sentence);
  }
  
  return phrases.join(' ');
}

const initOverData = {
  containerId: null,
  index: null,
};

const BuilderTemplate: React.FC = () => {
  const [items, setItems] = useState({
    componentList: [...BUILDER_BLOCKS],
    container1: [],
    container2: [],
  });
  const [activeId, setActiveId] = useState();
  const [activeBlock, setActiveBlock] = useState(null);
  const [overData, setOverData] = useState(initOverData);
  
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );
  
  function findContainer(id) {
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
  }
  
  const handleDragStart = (event) => {
    const { active } = event;
    const { id } = active;

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
  };
  
  const handleDragOver = (event) => {
    // console.log(event);
    const { active, over, draggingRect } = event;
    
    if (over) {
      if (Object.keys(items).includes(over.id) && over.id !== COMPONENTS_LIST && over.id !== active.data?.current?.sortable?.containerId) {
        setOverData((prev) => {
          return {
            ...prev,
            containerId: over.id,
          };
        });
      } else if (
        !Object.keys(items).includes(over.id)
        && over?.data?.current?.sortable?.containerId
        && over.id !== COMPONENTS_LIST
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
  
  const handleDragEnd = (event) => {
    const { active, over } = event;
    
    if (!over || !active) return;
    
    const { id } = active;
    const { id: overId } = over;
    
    const activeContainer = findContainer(id);
    const overContainer = findContainer(overId);
    const isBuilderBlock = BUILDER_IDS.includes(id);

    if (
      !activeContainer
      || !overContainer
    ) {
      return;
    }
    
    if (!isBuilderBlock && overContainer === 'componentList') {
      return;
    }
    
    if (isBuilderBlock && activeContainer === overContainer) {
      return;
    }
    
    const activeIndex = items[activeContainer].map((item) => item.id).indexOf(active.id);
    const overIndex = items[overContainer].map((item) => item.id).indexOf(overId);

    if (isBuilderBlock) {
      const blockToAdd = {
        id: v4(),
        data: {
          text: generateRandomText(),
        },
      };

      setItems((items) => (
        {
          ...items,
          [overContainer]: [...items[overContainer], blockToAdd],
        }
      ));
    } else if (activeIndex !== overIndex) {
      console.log(items[activeContainer][activeIndex]);
      setItems((items) => ({
        ...items,
        // [overContainer]: arrayMove(
        //   items[overContainer],
        //   activeIndex,
        //   overIndex,
        // ),
      }));
    }
    
    setActiveId(null);
    setActiveBlock(null);
    setOverData(initOverData);
  };
  
  console.log(items);
  
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
    <div className={styles.PageHolder}>
      <DndContext
        announcements={defaultAnnouncements}
        sensors={sensors}
        // collisionDetection={rectIntersection}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <CourseBuilderControls/>
        <div className={styles.PageWrapper}>
          <div className={styles.Content}>
            <Column id="container1" items={items.container1} isOverMe={overData.containerId === 'container1'} activeId={activeId}/>
            <Column id="container2" items={items.container2} isOverMe={overData.containerId === 'container2'} activeId={activeId}/>
            {/*<Column id="container3" items={items.container3} overData={overData}/>*/}
          </div>
          <DragOverlay>
            {activeId ? getDragOverlayItem() : null}
          </DragOverlay>
          <ComponentsList items={items.componentList}/>
        </div>
      </DndContext>
    </div>
  );
};

export default BuilderTemplate;
