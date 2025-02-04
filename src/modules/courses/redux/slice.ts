import { createSlice } from '@reduxjs/toolkit';
import { CourseBuilderState } from '@modules/courses/redux/types';
import { saveCourseBuilderData } from '@modules/courses/helper/builder.helper';

const initialState: CourseBuilderState = {
  main: {
    title: '',
    description: '',
  },
  isSaveCompleted: false,
  blocksInfo: {},
  blocksInfoErrors: {},
  blocks: {},
  items: {},
  errors: {},
  validationTrigger: 0,
};

export const courseBuilderSlice = createSlice({
  name: 'courseBuilder',
  initialState,
  reducers: {
    setMainInfo: (state, { payload }) => {
      state.main[payload.key] = payload.value;
      
      if (state.isSaveCompleted) {
        saveCourseBuilderData(state);
      }
    },
    triggerCourseValidation: (state) => {
      state.validationTrigger += 1;
    },
    addBlock: (state, { payload }) => {
      state.blocksInfo = {
        ...state.blocksInfo,
        [payload.id]: {
          title: '',
        },
      };
      
      state.blocks = {
        ...state.blocks,
        [payload.id]: payload.init ? [payload.init.id] : [],
      };
      
      if (payload.init) {
        state.items = {
          ...state.items,
          [payload.init.id]: payload.init,
        };
      }
      
      if (state.isSaveCompleted) {
        saveCourseBuilderData(state);
      }
    },
    setBlocksInfo: (state, { payload }) => {
      state.blocksInfo[payload.id] = {
        ...state.blocksInfo[payload.id],
        [payload.key]: payload.value,
      };
      
      if (state.isSaveCompleted) {
        saveCourseBuilderData(state);
      }
    },
    setBlocksInfoErrors: (state, { payload }) => {
      state.blocksInfoErrors = {
        ...state.blocksInfoErrors,
        [payload.id]: payload.result,
      };
    },
    removeCourseBlock: (state, { payload }) => {
      state.blocks[payload].forEach((item) => {
        delete state.items[item];
      });
      
      delete state.blocks[payload];
      delete state.errors[payload];
      delete state.blocksInfo[payload];
      
      if (state.isSaveCompleted) {
        saveCourseBuilderData(state);
      }
    },
    removeCourseItem: (state, { payload }) => {
      state.blocks = {
        ...state.blocks,
        [payload.containerId]: [...state.blocks[payload.containerId].filter((item) => item !== payload.id)],
      };
      
      if (state.blocks[payload.containerId][payload.id]) {
        delete state.blocks[payload.containerId][payload.id];
      }
      
      if (state.items[payload.id]) {
        delete state.items[payload.id];
      }
      
      if (state.errors?.[payload.containerId]?.[payload.id]) {
        delete state.errors[payload.containerId][payload.id];
      }
      
      if (state.isSaveCompleted) {
        saveCourseBuilderData(state);
      }
    },
    setBlocks: (state, { payload }) => {
      state.blocks = payload;
      
      if (state.isSaveCompleted) {
        saveCourseBuilderData(state);
      }
    },
    addItemToBlock: (state, { payload }) => {
      state.blocks = {
        ...state.blocks,
        [payload.containerId]: [...state.blocks[payload.containerId], payload.itemId],
      };
      
      if (state.isSaveCompleted) {
        saveCourseBuilderData(state);
      }
    },
    addCourseItem: (state, { payload }) => {
      state.items = {
        ...state.items,
        [payload.id]: payload,
      };
      
      if (state.isSaveCompleted) {
        saveCourseBuilderData(state);
      }
    },
    changeCourseItem: (state, { payload }) => {
      state.items[payload.id].data[payload.key] = payload.value;
      
      if (state.isSaveCompleted) {
        saveCourseBuilderData(state);
      }
    },
    setSavedCourseData: (state, { payload }) => {
      state.items = payload.items;
      state.blocks = payload.blocks;
      state.main = payload.main;
      
      if (payload.blocksInfo) {
        state.blocksInfo = payload.blocksInfo;
      }
    },
    setErrors: (state, { payload }) => {
      const containerId = Object.keys(state.blocks).find((key) => {
        if (!state.blocks[key]) {
          return undefined;
        }
        
        return state.blocks[key].map((item) => {
          return item;
        }).includes(payload.id);
      });
      
      state.errors = {
        ...state.errors,
        [containerId]: {
          ...state.errors[containerId],
          [payload.id]: payload.result,
        },
      };
    },
    triggerCourseSaveComplete: (state) => {
      state.isSaveCompleted = true;
    },
  },
  extraReducers: {},
});

export const {
  setMainInfo,
  addCourseItem,
  changeCourseItem,
  setErrors,
  addBlock,
  addItemToBlock,
  setBlocks,
  triggerCourseValidation,
  setSavedCourseData,
  removeCourseBlock,
  removeCourseItem,
  setBlocksInfo,
  setBlocksInfoErrors,
  triggerCourseSaveComplete,
} = courseBuilderSlice.actions;
