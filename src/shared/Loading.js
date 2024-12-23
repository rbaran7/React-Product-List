import React from "react";
import CircularProgress from '@mui/material/CircularProgress';
import '../styles/shared/displayUtils.css';

const Loading = () => {
    return (
        <div className="center-screen">
            <CircularProgress size={90} />
        </div>
    );
};

export default Loading;