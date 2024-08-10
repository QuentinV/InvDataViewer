import React from 'react';

interface IntrinsicValueGraphProps {
  areas?: { limit: number }[];
  value?: number;
  height?: number;
}

const colors = [ '#758B98', '#9CA9B3', '#E5D9CD', '#AB8886', '#8C5A58' ];

export const IntrinsicValueGraph: React.FC<IntrinsicValueGraphProps> = ({ areas, value, height = 120 }) => {
    if ( !areas || !value ) return null;

    const lastAreaValue = areas[areas.length-1].limit;
    const maxValue = value > lastAreaValue ? lastAreaValue : value;

    let prevX = 0;
    const valueX = value ? Number((maxValue * 100 / lastAreaValue).toFixed(2)) : 0;

    return (
    <svg width="100%" height={height} overflow="visible">
        {areas.map(({limit}, index) => {
            const v = Number((limit * 100 / lastAreaValue).toFixed(2));
            const w = (v - prevX) + '%';
            const x = prevX;
            prevX = v;
            return (
                <g key={index}>
                    <rect
                        key={index}
                        x={x+'%'}
                        y="0%"
                        width={w}
                        height={height-22}
                        fill={colors[index]}
                    />
                    { index < areas.length-1 && 
                    <svg viewBox={`0 0 20 12`} y={height-8} width="20" height="12" x={v+'%'} overflow="visible">
                        <text
                            x="-15"
                            y="0"
                            fill="black"
                            fontSize="12"
                        >
                        { limit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }
                        </text> 
                    </svg>
                    }
                </g>
            )
        })}
        {(value ?? null) !== null && (
            <svg viewBox={`0 0 20 ${height-22}`} y="0" width="20" height={height-22} x={valueX+'%'} overflow="visible">
                <rect x="-10" y="0" width="20" height="80" fill="#3A596B" />
                <polygon points="-10,80 10,80 0,98" fill="#3A596B" />
                <text x="15" y="5" fill="white" fontSize="13" transform='rotate(90)'>
                    {'$ ' + value?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </text>
            </svg>
        )}
    </svg>
    );
};