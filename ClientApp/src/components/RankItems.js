import React, { useEffect, useState } from 'react';
import RankingGrid from "./RankingGrid";
import ItemCollection from "./ItemCollection";

const RankItems = ({ items, setItems, dataType, imgArr, localStorageKey }) => {
    const [reload, setReload] = useState(false);

    function Reload() {
        setReload(true);
    }

    function drag(ev) {
        ev.dataTransfer.setData("text", ev.target.id);
    }

    function allowDrop(ev) {
        ev.preventDefault();
    }

    function drop(ev) {
        ev.preventDefault();
        const targetElm = ev.target.closest(".rank-row");  // Ensure you get the row even if dropped on an image or cell within the row
        if (!targetElm) {
            return false;
        }

        const itemId = parseInt(ev.dataTransfer.getData("text").substring(5));
        const rowNum = targetElm.getAttribute('data-row-num');
        handleDropOnRow(rowNum, itemId);
    }

    function handleDropOnRow(rowNum, draggedItemId) {
        const startRank = (rowNum - 1) * 4 + 1;
        const targetRank = findLeftMostAvailableRank(startRank);
        if (targetRank !== null) {
            const updatedItems = items.map(item => {
                if (item.id === draggedItemId) {
                    return { ...item, ranking: targetRank };
                }
                return item;
            });
            setItems(updatedItems);
        }
    }

    function findLeftMostAvailableRank(tierStartRank) {
        for (let i = tierStartRank; i < tierStartRank + 4; i++) {
            if (!items.some(item => item.ranking === i)) {
                return i;
            }
        }
        return null;
    }

    useEffect(() => {
        if (items == null) {
            getDataFromApi();
        }
    }, [dataType]);

    function getDataFromApi() {
        fetch(`item/${dataType}`)
            .then(results => results.json())
            .then(data => setItems(data))
    }

    useEffect(() => {
        if (items !== null) {
            localStorage.setItem(localStorageKey, JSON.stringify(items));
        }
        setReload(false);
    }, [items]);

    useEffect(() => {
        if (reload === true) {
            getDataFromApi();
        }
    }, [reload]);

    return (
        items !== null ?
            <main>
                <RankingGrid items={items} imgArr={imgArr} drag={drag} allowDrop={allowDrop} drop={drop} />
                <ItemCollection items={items} drag={drag} imgArr={imgArr} />
                <button onClick={Reload} className="reload" style={{ "marginTop": "10px" }}>
                    <span className="text">Reload</span>
                </button>
            </main>
            : <main>Loading...</main>
    );
}
export default RankItems;
