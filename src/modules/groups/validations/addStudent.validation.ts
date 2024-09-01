import * as yup from 'yup';

export const addStudentSchema = yup.object({
  ids: yup.array()
    .of(yup.number().required())
    .min(1, 'Add at least one student'),
});
