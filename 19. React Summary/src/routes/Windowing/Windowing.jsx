import { List } from 'react-window';
import classes from './Windowing.module.css'

const BIG_LIST = Array.from({ length: 10000 }, (_, index) => ({
    id: index,
    name: `Product №${index + 1}`,
    description: `Product description №${index + 1}.`,
}));

const ITEM_HEIGHT = 50;

const Row = ({ index, style, bigList }) => {
    const item = bigList[index];

    const className = index % 2 === 0
        ? classes.listItemEven
        : classes.listItemOdd;

    return (
        <div style={style} className={className}>
            <span style={{ fontWeight: 'bold' }}>{item.name}</span>
            <span style={{ color: '#666', marginLeft: '10px' }}>{item.description}</span>
        </div >
    );
};

export function Windowing() {
    return (
        <div style={{ padding: '20px', maxWidth: '700px', margin: '0 auto' }}>
            <h1>Virtualized List (10,000 elements)</h1>
            <p>
                No more than 20-30 elements are rendered in the DOM at a time,
                which ensures high performance.
            </p>

            <div style={{ height: '500px' }}>
                <List
                    rowComponent={Row}
                    rowCount={BIG_LIST.length}
                    rowHeight={ITEM_HEIGHT}
                    rowProps={{ bigList: BIG_LIST }}
                />
            </div>
        </div>
    );
}
