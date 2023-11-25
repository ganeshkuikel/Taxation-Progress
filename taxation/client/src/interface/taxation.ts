interface Step {
  key: number;
  value: string;
}

export interface IProgressData {
  id: number;
  step: string;
  total_steps: number;
  progress: number;
  steps: Step[];
}
