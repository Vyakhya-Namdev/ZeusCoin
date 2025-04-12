import { useState } from 'react';
import { Link } from "react-router-dom"
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { IconButton } from '@mui/material';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';

export default function SwipeableTemporaryDrawer() {
    const [open, setOpen] = useState(false);
    return (
      <div>
        <IconButton onClick={() => setOpen(true)}>
            <MenuRoundedIcon className='link' />
        </IconButton>
        <SwipeableDrawer
          anchor={"left"}
          open={open}
          onClose={() => setOpen(false)}
        >
          <div className="drawer-div">
            <Link to="/">
                <p className='link'>Home</p>
            </Link>
            <Link to="/watchlist">
                <p className='link'>WatchList</p>
            </Link>
            <Link to="/compare">
                <p className='link'>Compare</p>
            </Link>
            <Link to="/dashboard">
                <p className='link'>Dashboard</p>
            </Link>
          </div>
        </SwipeableDrawer>
      </div>
    );
 }
