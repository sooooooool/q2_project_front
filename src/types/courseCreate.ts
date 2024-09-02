export interface DataItem {
  id: number;
  name: string;
}

export interface StackModalProps {
  visible: boolean;
  loading: boolean;
  data: DataItem[];
  total: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  onCancel: () => void;
  onSelect: (value: DataItem) => void;
}
