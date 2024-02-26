import styled from '@emotion/styled'

export interface TitleCellProps {
    level: number
    bold?: boolean
}

export const HeaderCell = styled.th`
    width: 150px;
    padding: 0 10px 10px 10px;
    text-align: right;
`

export const Cell = styled.td`
    width: 150px;
    text-align: right;
    padding: 3px 0 3px 10px;
`

export const TitleCell = styled.td<TitleCellProps>`
    padding: 3px 3px 3px ${(props) => props.level * 40 + 3}px;
    ${(props) => (props.bold ? 'font-weight: bolder;' : '')}
`
