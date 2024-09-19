export interface DataItem {
  id: number;
  Spot_Name: string;
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

export interface SpotDetail {
  id: number;
  Spot_Name: string;
  Lat: number;
  Lng: number;
  F_Spot_Location: number;
}