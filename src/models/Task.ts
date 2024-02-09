import _mockData from '../../MOCK_DATA.json';
export type Task = {
  id: string;
  title: string;
  description: string | null;
  completed: boolean;
};

const mockData: [Task] = _mockData as [Task];

export {mockData};
