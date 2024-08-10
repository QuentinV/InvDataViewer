import React from 'react';

interface IntrinsicValueGraphProps {
  areas?: number[];
  value?: number;
  height?: number;
}

const colors = [ '#758B98', '#9CA9B3', '#E5D9CD', '#AB8886', '#8C5A58' ];
const defaultAreas = [ 20, 40, 60, 80, 100 ];

export const IntrinsicValueGraph: React.FC<IntrinsicValueGraphProps> = ({ areas, value, height = 120 }) => {
    const myAreas = areas || defaultAreas;
    const lastAreaValue = myAreas[myAreas.length-1];
    const maxValue = !value ? null : value > lastAreaValue ? lastAreaValue : value;
    const valueX = maxValue ? Number((maxValue * 100 / lastAreaValue).toFixed(2)) : undefined;
   
    let prevX = 0;
    return (
    <svg width="100%" height={height} overflow="visible">
        {myAreas.map((limit, index) => {
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
                    { !!areas && index < myAreas.length-1 && 
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
        {!!areas && (valueX ?? null) !== null && (
            <svg viewBox={`0 0 20 ${height-22}`} y="0" width="20" height={height-22} x={valueX+'%'} overflow="visible">
                <rect x="-10" y="0" width="20" height="80" fill="#3A596B" />
                <polygon points="-10,80 10,80 0,98" fill="#3A596B" />
                <text x="15" y="5" fill="white" fontSize="13" transform='rotate(90)'>
                    {'$ ' + value?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </text>
            </svg>
        )}
        {!areas && 
            (<g>
                <rect x="0" y="0" width="100%" height={height-22} fill="#BBB" fillOpacity="0.6" />
                <svg viewBox={`0 0 1 ${height-22}`} y="5%" width="80" height={height-22} x="50%" overflow="visible">
                    <svg fill="#FFF" width="80" height="80" viewBox="0 0 554.2 554.199" x="-80">
                    <g>
                        <path d="M538.5,386.199L356.5,70.8c-16.4-28.4-46.7-45.9-79.501-45.9c-32.8,0-63.1,17.5-79.5,45.9L12.3,391.6
                            c-16.4,28.4-16.4,63.4,0,91.8C28.7,511.8,59,529.3,91.8,529.3H462.2c0.101,0,0.2,0,0.2,0c50.7,0,91.8-41.101,91.8-91.8
                            C554.2,418.5,548.4,400.8,538.5,386.199z M316.3,416.899c0,21.7-16.7,38.3-39.2,38.3s-39.2-16.6-39.2-38.3V416
                            c0-21.601,16.7-38.301,39.2-38.301S316.3,394.3,316.3,416V416.899z M317.2,158.7L297.8,328.1c-1.3,12.2-9.4,19.8-20.7,19.8
                            s-19.4-7.7-20.7-19.8L237,158.6c-1.3-13.1,5.801-23,18-23H299.1C311.3,135.7,318.5,145.6,317.2,158.7z"/>
                    </g>
                    </svg>
                </svg>
            </g>)
        }
    </svg>
    );
};