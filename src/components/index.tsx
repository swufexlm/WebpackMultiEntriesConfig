import * as React from 'react';
import  Com1 from './com1';

Com1['1'] = 1;

const styles = require('./but.less');

export default class But extends React.PureComponent {
    render() {
        return (
            <div
                className={styles.btn}
                style={{ height: '100px', width: '100px' }}
            />
        );
    }
}
