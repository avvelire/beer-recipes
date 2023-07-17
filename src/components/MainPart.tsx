import React, { useEffect, useState } from 'react';
import BeerCard from './BeerCard';
import Skeleton from './Skeleton';
import { Beer, useStore } from '../zustand/store';

const findUniqueElements = (firstArray: any[], secondArray: any[], property: string): any[] => {
  return firstArray.filter(
    (element) => !secondArray.some((item) => item[property] === element[property]),
  );
};

const MainPart: React.FC = () => {
  const {
    beers,
    fetchBeers,
    status,
    page,
    setPage,
    visibleItems,
    setVisibleItems,
    selectedBeers,
    setSelectedBeers,
  } = useStore((state) => ({
    beers: state.beers,
    fetchBeers: state.fetchBeers,
    status: state.status,
    page: state.page,
    setPage: state.setPage,
    visibleItems: state.visibleItems,
    setVisibleItems: state.setVisibleItems,
    selectedBeers: state.selectedBeers,
    setSelectedBeers: state.setSelectedBeers,
  }));

  const [tempItems, setTempItems] = useState<Beer[]>([]);

  useEffect(() => {
    fetchBeers(page);
  }, [fetchBeers, page]);

  useEffect(() => {
    if (
      page > 1 &&
      tempItems.length > 0 &&
      tempItems[tempItems.length - 1].id !== beers[beers.length - 1].id
    ) {
      setVisibleItems([...tempItems, ...beers.slice(0, 5)]);
      setTempItems([]);
    } else if (page === 1) {
      setVisibleItems(beers.slice(0, 15));
    }
  }, [beers, page, setVisibleItems, tempItems]);

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const target = event.target as HTMLDivElement;

    if (window.innerHeight + target.scrollTop === target.offsetHeight) {
      return;
    }

    if (target.scrollHeight - Math.round(target.scrollTop) === target.clientHeight) {
      if (visibleItems[visibleItems.length - 1].id === beers[beers.length - 1].id) {
        const nextPage = page + 1;
        const tempArr = [...visibleItems.slice(5, 15)];

        setTempItems(tempArr);
        setPage(nextPage);
      } else {
        const mapBeer = beers.map((item) => item.id);
        const idx = mapBeer.indexOf(visibleItems[visibleItems.length - 1].id);
        const nextItems = beers.slice(idx + 1, idx + 6);
        visibleItems.splice(0, 5);
        visibleItems.push(...nextItems);

        setVisibleItems(visibleItems);
      }
    }
  };

  const deleteSelectedBeers = () => {
    const goodArr = findUniqueElements(visibleItems, selectedBeers, 'id');
    const indexOfLastEl = beers.indexOf(goodArr[goodArr.length - 1]);
    const arr = [...goodArr, ...beers.splice(indexOfLastEl + 1, selectedBeers.length)];
    setVisibleItems(arr);
    setSelectedBeers([]);
  };

  const items = visibleItems.map((item) => <BeerCard key={item.id} {...item} />);
  const skeletons = [...new Array(5)].map((_, index) => <Skeleton key={index} />);

  if (beers && beers.length < 1) {
    return null;
  }

  return (
    <div
      id="scrollableDiv"
      onScroll={handleScroll}
      style={{ overflowY: 'auto', maxHeight: '550px' }}
    >
      <div className="content" id="scrollableDiv">
        <div className="content__top">
          <h1>Recipes</h1>
          {selectedBeers.length > 0 ? <button onClick={deleteSelectedBeers}>Delete</button> : null}
        </div>
        <div className="content__main">{status === 'loading' ? skeletons : items}</div>
      </div>
    </div>
  );
};

export default MainPart;
