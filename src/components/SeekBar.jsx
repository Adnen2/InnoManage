import React from 'react'

const ProgressBar = ({ value }) => (
    <div style={{ display: 'flex', alignItems: 'center' }}>
        <div
            style={{
                width: '100%',
                backgroundColor: '#ddd',
                height: '10px',
                marginRight: '8px',
                borderRadius: '5px',
            }}
        >
            <div
                style={{
                    width: `${value}%`,
                    backgroundColor: '#3f51b5',
                    height: '100%',
                    borderRadius: '5px',
                }}
            ></div>
        </div>
        {`${value}%`}
    </div>
);

export default ProgressBar;
