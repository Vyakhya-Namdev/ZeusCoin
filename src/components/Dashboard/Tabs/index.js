import React, { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import './styles.css';
import Grid from "../Grid";
import List from '../List';
import { useNavigate } from 'react-router-dom';

export default function TabsComponent({ coins }) {
  const [value, setValue] = useState('grid');
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: "#3a80e9",
      },
    },
  });

  const style = {
    color: "var(--primary-text)",
    fontSize: "1.2rem",
    textTransform: "capitalize",
  };

  return (
    <ThemeProvider theme={theme}>
      <TabContext value={value}>
        <TabList onChange={handleChange} variant="fullWidth">
          <Tab label="Grid" value="grid" sx={style} />
          <Tab label="List" value="list" sx={style} />
        </TabList>
        <TabPanel value="grid">
          <div className='grid-flex'>{coins.map((coin, i) => {
            return <Grid coin={coin} key={i} />
          })}</div>
        </TabPanel>
        <TabPanel value="list">
          <table className="list-table">
            <thead>
              <tr>
                <th className="desktop-td-mkt">Market Cap</th>
                <th className="mobile-td-mkt">Mkt Cap</th>
              </tr>
            </thead>
            <tbody>
              {coins.map((item, i) => (
                <List coin={item} key={i} navigate={navigate} />
              ))}
            </tbody>
          </table>
        </TabPanel>
      </TabContext>
    </ThemeProvider>
  );
}
