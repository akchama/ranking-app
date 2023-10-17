import React from 'react';

const RankingGrid = ({ items, imgArr, drag, allowDrop, drop }) => {
    const cellCollections = {
        top: [],
        middle: [],
        bottom: [],
        worst: []
    };

    function pushCellMarkupToArr(cellCollection, rankNum, rowLabel) {
        if (rankNum > 0) {
            const item = items.find(o => o.ranking === rankNum);
            cellCollection.push(<div key={`cell-${rankNum}`} id={`rank-${rankNum}`} className="rank-cell">
                {item && <img id={`item-${item.id}`} src={imgArr.find(o => o.id === item.imageId)?.image} draggable="true" onDragStart={drag} />}
            </div>);
        } else {
            cellCollection.push(<div key={`label-${rowLabel}`} className="row-label"><h4>{rowLabel}</h4></div>);
        }
    }

    function createCellsForRow(rowNum) {
        const rankStart = (rowNum - 1) * 4 + 1;
        const labels = ["Top Tier", "Middle Tier", "Bottom Tier", "Worst Tier"];
        const keys = ["top", "middle", "bottom", "worst"];

        pushCellMarkupToArr(cellCollections[keys[rowNum - 1]], 0, labels[rowNum - 1]);

        for (let i = 0; i < 4; i++) {
            pushCellMarkupToArr(cellCollections[keys[rowNum - 1]], rankStart + i);
        }
    }

    function createRankingGrid() {
        for (let i = 1; i <= 4; i++) {
            createCellsForRow(i);
        }
    }

    createRankingGrid();

    return (
        <div className="rankings">
            <div data-row-num="1" className="rank-row top-tier" onDrop={drop} onDragOver={allowDrop}>{cellCollections.top}</div>
            <div data-row-num="2" className="rank-row middle-tier" onDrop={drop} onDragOver={allowDrop}>{cellCollections.middle}</div>
            <div data-row-num="3" className="rank-row bottom-tier" onDrop={drop} onDragOver={allowDrop}>{cellCollections.bottom}</div>
            <div data-row-num="4" className="rank-row worst-tier" onDrop={drop} onDragOver={allowDrop}>{cellCollections.worst}</div>
        </div>
    );
}
export default RankingGrid;
