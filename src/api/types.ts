import { Units } from '../features/initialState';

export interface ChartProps {
  hourly: any;
  dataTime: string[];
  units?: Units;
}
