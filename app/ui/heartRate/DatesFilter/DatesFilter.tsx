import styles from "./DatesFilter.module.css";

import { FormLabel, TextField } from "@mui/material";
import { DatesFilterProps } from "./DatesFilter.types";

const DatesFilter: React.FC<DatesFilterProps> = ({startDate, endDate, onStartDateChange, onEndDateChange }) => {
    
    const handleStartDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const date = event.target.value ? new Date(event.target.value) : null;
        onStartDateChange(date);
    };

    const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const date = event.target.value ? new Date(event.target.value) : null;
        onEndDateChange(date);
    };

    return (
        <div className={styles.form}>
            <div>
                <FormLabel>Start date</FormLabel>
                <TextField
                    type="date"
                    value={startDate ? startDate.toISOString().split("T")[0] : ""}
                    onChange={handleStartDateChange}
                    className={styles.datePicker}
                />
            </div>
            <div>
                <FormLabel>End date</FormLabel>
                <TextField
                    type="date"
                    value={endDate ? endDate.toISOString().split("T")[0] : ""}
                    onChange={handleEndDateChange}
                    className={styles.datePicker}
                />
            </div>
        </div>
    );
};

export { DatesFilter };
