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
import {
  BlocksData, BuilderBlockType,
  BuilderFile,
  BuilderItem,
  BuilderItems,
  CourseData,
  CourseForm,
} from '@modules/courses/types/builder.types';
import { yupResolver } from '@hookform/resolvers/yup';
import { courseBaseSchema } from '@modules/courses/validation/course.validation';
import { v4 } from 'uuid';
import { BUILDER_IMAGES_KEY, BUILDER_SAVE_DATA_KEY } from '@modules/courses/constants/builder';
import { Outlet } from 'react-router-dom';
import { deleteFilesByItemIds, openBuilderDatabase } from '@modules/courses/helper/builder.helper';

interface BuilderContextType {
  addBlock: (blockToAdd?: BuilderItem) => void,
  removeBlock: (id: string) => void,
  items: BuilderItems,
  setItems: Dispatch<SetStateAction<BuilderItems>>,
  setFiles: Dispatch<SetStateAction<BuilderFile[]>>
  files: BuilderFile[],
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
  iDb: IDBDatabase,
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
  const [validationTrigger, setValidationTrigger] = useState(0);
  const [files, setFiles] = useState<BuilderFile[]>([]);
  const [iDb, setIDb] = useState<IDBDatabase | null>(null);
  const formTitle = watch('title');
  const isFirstRender = useRef(true);
  const formDescription = watch('description');
  
  useEffect(() => {
    openBuilderDatabase().then((db) => {
      const transaction = db.transaction(BUILDER_IMAGES_KEY, 'readonly');
      const store = transaction.objectStore(BUILDER_IMAGES_KEY);
      const request = store.getAll();

      request.onsuccess = () => {
        setFiles(request.result as BuilderFile[]);
      };

      setIDb(db);
    }).catch(() => {
      // console.error('IndexedDB error:', error);
    })
      .finally(() => {
        const saveData = localStorage.getItem(BUILDER_SAVE_DATA_KEY);
        if (saveData) {
          const data = JSON.parse(saveData);
          setValue('title', data.form.title);
          setValue('description', data.form.description);
          setItems(() => data.items);
          setBlocksData(() => data.blocksData);
        }
        setSaved(true);
      });
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
      
      const prevSavedData = localStorage.getItem(BUILDER_SAVE_DATA_KEY);
      if (prevSavedData !== JSON.stringify(dataToSave)) {
        localStorage.setItem(BUILDER_SAVE_DATA_KEY, JSON.stringify(dataToSave));
      }
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
  
  const removeBlock = async (id: string) => {
    const itemsWithImagesInBlock = items[id]
      .filter((item) => item.data.type === BuilderBlockType.Image && item.data.fileId)
      .map((item) => item.id);
    
    if (itemsWithImagesInBlock && iDb) {
      await deleteFilesByItemIds(itemsWithImagesInBlock, iDb);
    }
    
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
      const itemToDelete = items[containerId].find((item) => item.id === id);
      
      if (itemToDelete.data.type === BuilderBlockType.Image && itemToDelete.data.fileId) {
        if (iDb) {
          const transaction = iDb.transaction(BUILDER_IMAGES_KEY, 'readwrite');
          const store = transaction.objectStore(BUILDER_IMAGES_KEY);
          
          const deleteRequest = store.index('itemId').openCursor(IDBKeyRange.only(id));
          
          deleteRequest.onsuccess = (event: Event) => {
            const cursor = (event.target as IDBRequest<IDBCursorWithValue>).result;
            if (cursor) {
              store.delete(cursor.primaryKey);
              cursor.continue();
            }
          };
        }
      }
      
      setItemsError((prev) => {
        const newState = { ...prev };
       
        if (newState?.[containerId]?.[id]) {
          delete newState[containerId][id];
        }
        
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
      setFiles,
      files,
      iDb,
    };
  }, [
    iDb,
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
    setFiles,
    files,
  ]);
  
  return (
    <BuilderContext.Provider value={contextValue}>
      {/*{children}*/}
      <Outlet/>
    </BuilderContext.Provider>
  );
};
