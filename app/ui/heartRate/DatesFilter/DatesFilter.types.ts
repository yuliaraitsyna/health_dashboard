export interface DatesFilterProps {
    startDate: Date | null;
    endDate: Date | null;
    onStartDateChange: (startDate: Date | null) => void;
    onEndDateChange: (endDate: Date | null) => void;
}
