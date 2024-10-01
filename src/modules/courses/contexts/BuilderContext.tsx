import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { FieldErrors, useForm, UseFormRegister } from 'react-hook-form';
import { BlocksData, BuilderItem, BuilderItems, CourseData, CourseForm } from '@modules/courses/types/builder.types';
import { yupResolver } from '@hookform/resolvers/yup';
import { courseBaseSchema } from '@modules/courses/validation/course.validation';
import { v4 } from 'uuid';
import { BUILDER_SAVE_DATA_KEY } from '@modules/courses/constants/builder';
import { Outlet } from 'react-router-dom';

interface BuilderContextType {
  addBlock: (blockToAdd?: BuilderItem) => void,
  removeBlock: (id: string) => void,
  items: BuilderItems,
  setItems: Dispatch<SetStateAction<BuilderItems>>,
  blocksData: BlocksData[],
  handleChangeBlockData: (id: string, key: string, value: string) => void,
  handleChangeItemsData: (id: string, key: string, value: string) => void,
  handleSubmit: () => void,
  register: UseFormRegister<CourseForm>,
  errors: FieldErrors<CourseForm>,
  removeItem: (id: string) => void,
  validationTrigger: number,
  handleItemsError: (id: string, validationResult: boolean) => void,
  getCourseData: () => CourseData,
}
export const BuilderContext = createContext<BuilderContextType | null>(null);

interface BuilderContextProviderProps {
  children: React.ReactNode;
}

export const BuilderContextProvider: React.FC<BuilderContextProviderProps> = () => {
  const {
    handleSubmit,
    register,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CourseForm>({
    mode: 'all',
    defaultValues: {
      title: '',
      description: '',
    },
    resolver: yupResolver(courseBaseSchema),
  });
  const [items, setItems] = useState<BuilderItems>({});
  const [itemsError, setItemsError] = useState({});
  const [blocksData, setBlocksData] = useState<BlocksData[]>([]);
  const [isSaved, setSaved] = useState(false);
  const formTitle = watch('title');
  const isFirstRender = useRef(true);
  const formDescription = watch('description');
  const [validationTrigger, setValidationTrigger] = useState(0);
  
  useEffect(() => {
    const saveData = localStorage.getItem(BUILDER_SAVE_DATA_KEY);
    if (saveData) {
      const data = JSON.parse(saveData);
      
      setValue('title', data.form.title);
      setValue('description', data.form.description);
      setItems(() => data.items);
      setBlocksData(() => data.blocksData);
    }
    setSaved(true);
  }, []);
  
  const initValidationTrigger = () => {
    setValidationTrigger((prev) => prev + 1);
  };
  
  useEffect(() => {
    if (!isFirstRender.current && isSaved) {
      const dataToSave = {
        form: {
          title: formTitle,
          description: formDescription,
        },
        items,
        blocksData,
      };
      
      localStorage.setItem(BUILDER_SAVE_DATA_KEY, JSON.stringify(dataToSave));
    } else {
      isFirstRender.current = false;
    }
  }, [items, blocksData, formTitle, formDescription, isSaved, isFirstRender.current]);
  
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
  
  const handleItemsError = (id: string, validationResult: boolean) => {
    const containerId = findContainer(id);
    setItemsError((prev) => {
      return {
        ...prev,
        [containerId]: {
          ...prev[containerId],
          [id]: validationResult,
        },
      };
    });
  };
  
  useEffect(() => {
    console.log(itemsError, 'ITEMS ERROR');
  }, [itemsError]);
  
  const onSubmit = (data: CourseForm) => {
    let isErrorInItems = false;
    
    Object.keys(itemsError)
      .forEach((item) => {
        if (Object.values(itemsError[item]).includes(false)) isErrorInItems = true;
      });

    initValidationTrigger();
    
    if (isErrorInItems) {
      throw new Error('Validation error');
    }
    
    const dataToSend = {
      form: {
        title: formTitle,
        description: formDescription,
      },
      content: {
        blocks: blocksData.map((item) => {
          return {
            ...item,
            items: items[item.id],
          };
        }),
      },
    };
    
    return dataToSend;
  };
  
  const getCourseData = useCallback((): CourseData => {
    return {
      form: {
        title: formTitle,
        description: formDescription,
      },
      blocks: blocksData.map((item) => {
        return {
          ...item,
          items: items[item.id],
        };
      }),
    };
  }, [blocksData, items, formTitle, formDescription]);
  
  const addBlock = (itemToAdd: BuilderItem | undefined = undefined) => {
    const id = v4();
    
    setItems((prev) => {
      return {
        ...prev,
        [id]: itemToAdd ? [itemToAdd] : [],
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
    
    setItemsError((prev) => {
      const newState = { ...prev };
      delete newState[id];
      return newState;
    });
    
    setBlocksData((prev) => prev.filter((item) => item.id !== id));
  };
  
  const removeItem = (id: string) => {
    const containerId = findContainer(id);
    
    if (containerId) {
      setItemsError((prev) => {
        const newState = { ...prev };
        delete newState[containerId][id];
        return newState;
      });
      
      setItems((prev) => ({
        ...prev,
        [containerId]: prev[containerId].filter((item) => item.id !== id),
      }));
    }
  };
  
  const handleChangeItemsData = (id: string, key: string, value: string) => {
    const containerId = Object.keys(items).find((key) => {
      if (!items[key]) {
        return undefined;
      }
      
      return items[key].map((item) => {
        return item.id;
      }).includes(id);
    });
    
    setItems((prev) => ({
      ...prev,
      [containerId]: prev[containerId].map((item) => {
        if (item.id === id) {
          return {
            ...item,
            data: {
              ...item.data,
              [key]: value,
            },
          } as BuilderItem;
        }
        
        return item;
      }),
    }));
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
  
  const contextValue: BuilderContextType = useMemo(() => {
    return {
      removeBlock,
      addBlock,
      items,
      setItems,
      blocksData,
      handleChangeBlockData,
      handleChangeItemsData,
      handleSubmit: handleSubmit(onSubmit),
      register,
      errors,
      removeItem,
      validationTrigger,
      handleItemsError,
      getCourseData,
    };
  }, [
    removeBlock,
    addBlock,
    items,
    setItems,
    blocksData,
    handleChangeBlockData,
    handleChangeItemsData,
    handleSubmit,
    register,
    errors,
    removeItem,
    validationTrigger,
    handleItemsError,
    getCourseData,
  ]);
  
  return (
    <BuilderContext.Provider value={contextValue}>
      {/*{children}*/}
      <Outlet/>
    </BuilderContext.Provider>
  );
};
