import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useLocation, useParams, useSearchParams} from "react-router-dom";
import './nav.css'


function Nav(props) {
  let events;
  let eventsP = useSelector(state => state.projects.city);
  let eventsE = useSelector(state => state.events.eventsType);
  let eventsC = useSelector(state => state.competitions.city);
  let categoiesP = useSelector(state => state.projects.categories);
  let categoiesE = useSelector(state => state.events.categories);
  let categoiesC = useSelector(state => state.competitions.categories);


  const [searchParams, setSearchParams] = useSearchParams()
  let location = useLocation()
  var categoies

  if(location.pathname.split('/')[1] == "competition") {
    categoies = categoiesC
    events = eventsC
  }else if(location.pathname.split('/')[1] == "project") {
    categoies = categoiesP
    events = eventsP
  }else if(location.pathname.split('/')[1] == "event") {
    categoies = categoiesE
    events = eventsE
  }

  function handlerSubmit(e) {
    e.preventDefault()
    setSearchParams({category:e.target.category.value, event:e.target.event.value})
  }

  let eventList = events.map(event => {
    return(
      <li key={event.id} > <input  type={'radio'} name={'event'}   value={event.id}/><a>{event.name}</a></li>
    )
  })

  let categorieList = categoies.map(category => {
    return(
      <li key={category.id}> <input  name={'category'} type={'radio'} value={category.id}/><a>{category.name}</a></li>
    )
  })

  return (
    <form className="aside" onSubmit={handlerSubmit}>
      <div className="filter">
        <button onClick={() => console.log(location.pathname)}>location</button>
        <h1 className="filter__name">По категориям</h1>
        <ul className="filter__item">
          {categorieList}
        </ul>
      </div>
      <div className="filter">
        <h1 className="filter__name">По типу</h1>
        <ul className="filter__item">
          {eventList}
        </ul>
      </div>
      <div className="filter">
        <h1 className="filter__name">Город</h1>
        <ul className="filter__item">
          <li><a href="#">Алматы</a></li>
          <li><a href="#">Нур-Султан</a></li>
          <li><a href="#">Шымкент</a></li>
          <li><a href="#">Павлодар</a></li>
          <li><a href="#">Караганда</a></li>
        </ul>
      </div>
      <div className="filter">
        <input className={'submit'} type={'submit'} value={"Поиск"}/>
      </div>
    </form>
  );
}

export default Nav;
