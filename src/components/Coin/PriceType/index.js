import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import './styles.css';

export default function TogglePriceType({ priceType, handlePriceTypeChange }) {
    return (
        <div className='toggle-prices'>
            <ToggleButtonGroup
                value={priceType}
                exclusive
                onChange={handlePriceTypeChange}
                sx={{
                    "&.Mui-selected": {
                        color: "#3a80e9 !important",
                    },
                    borderColor: "#3a80e9 !important",
                    border: "unset !important",
                    "& .MuiToggleButtonGroup-grouped": {
                        border: "1px solid !important",
                        borderColor: "unset",
                        color: "#3a80e9",
                    },
                    "& .MuiToggleButton-root.Mui-selected": {
                        color: "#3a80e9 !important",
                        backgroundColor: "rgba(58, 128, 233, 0.1) !important",
                    },
                }}
            >
                <ToggleButton value="prices" className='toggle-btn'>Price</ToggleButton>
                <ToggleButton value="market_caps" className='toggle-btn'>Market Cap</ToggleButton>
                <ToggleButton value="total_volumes" className='toggle-btn'>Total Volume</ToggleButton>
            </ToggleButtonGroup>
        </div>
    );
}
