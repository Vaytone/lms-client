import React, { createContext, Dispatch, SetStateAction, useState } from 'react';
import { BUILDER_BLOCKS } from '@modules/courses/constants/builder';
import { useForm } from 'react-hook-form';
import { BlocksData, BuilderItems, CourseForm } from '@modules/courses/types/builder.types';
import { yupResolver } from '@hookform/resolvers/yup';
import { courseBaseSchema } from '@modules/courses/validation/course.validation';
import { v4 } from 'uuid';

interface BuilderContextType {
  addBlock: () => void,
  removeBlock: (id: string) => void,
  items: BuilderItems,
  setItems: Dispatch<SetStateAction<BuilderItems>>,
  blocksData: BlocksData[],
  handleChangeBlockData: (id: string, key: string, value: string) => void,
}
export const BuilderContext = createContext<BuilderContextType | null>(null);

interface BuilderContextProviderProps {
  children: React.ReactNode;
}

export const BuilderContextProvider: React.FC<BuilderContextProviderProps> = ({ children }) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<CourseForm>({
    mode: 'all',
    defaultValues: {
      title: '',
      description: '',
    },
    resolver: yupResolver(courseBaseSchema),
  });
  const [items, setItems] = useState<BuilderItems>({
    // componentList: [...BUILDER_BLOCKS],
  });
  const [blocksData, setBlocksData] = useState<BlocksData[]>([]);
  
  // const contextValue: MyContextType = {
  //   state,
  //   setState,
  // };
  
  const addBlock = () => {
    const id = v4();
    
    setItems((prev) => {
      return {
        ...prev,
        [id]: [],
      };
    });
    
    setBlocksData((prev) => {
      return [...prev, {
        id,
        title: '',
      }];
    });
  };
  
  const removeBlock = (id: string) => {
    setItems((prev) => {
      delete prev[id];
      
      return prev;
    });
    
    setBlocksData((prev) => prev.filter((item) => item.id !== id));
  };
  
  const handleChangeBlockData = (id: string, key: string, value: string) => {
    setBlocksData((prev) => prev.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          [key]: value,
        };
      }
      
      return item;
    }));
  };
  
  const contextValue: BuilderContextType = {
    removeBlock,
    addBlock,
    items,
    setItems,
    blocksData,
    handleChangeBlockData,
  };
  
  return (
    <BuilderContext.Provider value={contextValue}>
      {children}
    </BuilderContext.Provider>
  );
};
