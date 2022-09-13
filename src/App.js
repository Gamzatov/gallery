import React from 'react';
import './index.scss';
import { Collection } from './Collection';

const categories = [
  { "name": "Все" },
  { "name": "Море" },
  { "name": "Горы" },
  { "name": "Архитектура" },
  { "name": "Города" }
];

function App() {
  const [categoryId, setCategoryId] = React.useState(0);
  const [page, setPage] = React.useState(1);
  const [isLoading, setIsLoading] = React.useState(true);
  const [searchValue, setSearchValue] = React.useState('');
  const [collections, setCollections] = React.useState([]);

  React.useEffect(() => {
    setIsLoading(true);
    const category = categoryId ? `category=${categoryId}` : ''
    
    fetch(`https://6320334e9f82827dcf271256.mockapi.io/photos?page=${page}&limit=3&${category}`)
    .then((res) => res.json())
    .then((json) => {
      setCollections(json)
    }).catch((err) => {
      console.warn(err);
      alert('ошибка при получении данных');
    }).finally(() => {
      setIsLoading(false);
    })

  }, [categoryId, page])
  return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
          {categories.map((el, index) => <li onClick={() => setCategoryId(index)} className={categoryId === index ? 'active' : ''} key={el.name}>{el.name}</li>)}
        </ul>
        <input onChange={(e) => setSearchValue(e.target.value)} className="search-input" placeholder="Поиск по названию" />
      </div>
      <div className="content">
        {isLoading ? (<h2> Идет загрузка...</h2>) :
          collections.filter(obj => {
            return obj.name.toLowerCase().includes(searchValue.toLocaleLowerCase())
          }).map((obj, index) => (
            <Collection
              key={index}
              name={obj.name}
              images={obj.photos}
            />
          ))
        }

      </div>
      <ul className="pagination">
        {[...Array(5)].map((_, i) => (
          <li onClick={() => setPage(i + 1)} className={page === i + 1 ? 'active' : ''}>{i + 1}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
