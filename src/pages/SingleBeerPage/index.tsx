/* eslint-disable array-callback-return */
import React, { useEffect, useState } from 'react';
import styles from './singleBeer.module.scss';
import { useParams } from 'react-router-dom';
import { Beer } from '../../zustand/store';

const crateTableFromArr = (arr: any[], arr2: any[]) => {
  const formedLayout: JSX.Element[] = [];
  arr.map((item, i) => {
    arr2.map((el, idx) => {
      if (i === idx) {
        formedLayout.push(
          <tr key={i}>
            <td>{`${item.name} - ${item.amount.value} ${item.amount.unit}`}</td>
            <td>{`${el.name} - ${el.amount.value} ${el.amount.unit}`}</td>
          </tr>,
        );
      }
    });
  });
  return formedLayout;
};

const SingleBeer: React.FC = () => {
  const { beerId } = useParams();
  const [beer, setBeer] = useState<Beer>();

  useEffect(() => {
    fetch(`https://api.punkapi.com/v2/beers/${beerId}`)
      .then((response) => response.json())
      .then((data) => setBeer(data[0]));
  }, [beerId]);

  if (!beer) {
    return null;
  }

  const {
    name,
    image_url: img,
    abv,
    first_brewed: brewed,
    ingredients,
    description,
    contributed_by,
    brewers_tips,
  } = beer as Beer;

  const { malt, hops } = ingredients;

  return (
    <div className={styles.content}>
      <div>
        <img className={styles.img} height={500} width={300} src={img} alt="beerLogo" />
      </div>
      <div className={styles.info}>
        <h1>{name}</h1>
        <p> {description}</p>
        <ul>
          <li>
            <p>Contributed by</p>
            <div></div>
            <b>{contributed_by}</b>
          </li>
          <li>
            <p>Brewed</p>
            <div></div>
            <b>{brewed}</b>
          </li>
          <li>
            <p>Alcohol by volume</p>
            <div></div>
            <b>{abv}%</b>
          </li>
          <li>
            <p>Yeast</p>
            <div></div>
            <b>{ingredients.yeast}</b>
          </li>
        </ul>
        <h2>Ingredients</h2>
        <table>
          <tbody>
            <tr>
              <th id="malt">Malt</th>
              <th>Hops</th>
            </tr>
            {crateTableFromArr(malt, hops)}
          </tbody>
        </table>
        <h2>Brewers tips</h2>
        <p>{brewers_tips}</p>
      </div>
    </div>
  );
};

export default SingleBeer;
