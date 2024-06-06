import React from 'react'
import { TestsViewer } from './TestsViewer'
import { ConfigEditor } from '../ConfigEditor'

export const RulesConfig: React.FC = () => {
    return (
        <>
            <ConfigEditor endpoint='config/fundamentals/rules' />
            <TestsViewer />
        </>
    )
}
