import React from 'react'
import ReactLoading from 'react-loading'

const Loading = ({ type, color }) => (
    <div
        style={{
            display: 'flex',
            justifyContent: 'center',
            position: 'absolute',
            left: '49%',
            top: '20%',
        }}
    >
        <ReactLoading
            type={'spinningBubbles'}
            color={'black"'}
            height={67}
            width={50}
        />
    </div>
)

export default Loading
