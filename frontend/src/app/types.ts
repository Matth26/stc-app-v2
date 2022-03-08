import { Schema } from 'mongoose';

export interface Step {
  _id?: Schema.Types.ObjectId;
  date: Date;
  text: string;
}

export interface StepForm {
  date: Date;
  text: string;
}

export interface Chart {
  _id: Schema.Types.ObjectId;
  name: string;
  goal: string;
  current: string;
  steps: Step[];
}

export interface ChartForm {
  name: string;
  goal: string;
  current: string;
  steps: StepForm[];
}
