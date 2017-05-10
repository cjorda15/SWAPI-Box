import React, { Component } from 'react';
import './App.css';
import Header from './components/header/Header';
import CategorySelect from './components/categorySelect/CategorySelect';
import CategoryDisplay from './components/categoryDisplay/CategoryDisplay';
import AboutMovie from './components/aboutMovie/AboutMovie.js';
class App extends Component {
  constructor() {
    super()
    this.state = {
      data:"",
      favorites: [],
      category: [],
      categoryType: "",
      aboutMovie: "",
      activeButton:""
    }
  }

  componentWillMount(){
    let episode = Math.floor(Math.random() * (6))+1;
    console.log(people())
    console.log(planets)
    console.log(species())
    console.log(vehicle)

    fetch(`http://swapi.co/api/films/?/format=json`)
    .then( resp => resp.json() )
    .then( data => {
      this.setState({
        aboutMovie: [
          data.results[episode].title,
          data.results[episode].episode_id,
          data.results[episode].opening_crawl
        ]
      })
    }).catch( e => {
      console.log(e);
    })
  }

  selectFavorite(input){
    let tempFav  = this.state.favorites
    let position = tempFav.indexOf(input)
    position<=-1?
    tempFav.push(input):
    tempFav.splice(position,1)
    this.setState({favorites:tempFav})

  }

  selectCategory(input){
    let dataSource;
    this.setState({activeButton:input})
    if (typeof input === 'string') {
      dataSource = `http://swapi.co/api/${input}/?format=json`;
    } else if (typeof input === 'number') {
      dataSource = `http://swapi.co/api/films/${input}/?format=json`;
    }

    fetch(dataSource)
    .then( resp => resp.json() )
    .then( data => {
      this.setState({ category: data.results,
                      categoryType: input,
                      aboutMovie: this.state.aboutMovie })
    }).catch( e => {
      console.log(e);
    })


  }

  render() {
    return (
      <div className="App">

        <section className="left-side-screen">
          <aside className="aside">
             <AboutMovie
               movieSummary={ this.state.aboutMovie }
               selectCategory={ this.selectCategory.bind(this) }
              />
          </aside>
        </section>

        <section className="right-side-screen">
            <Header
              favorites={ this.state.favorites}
            />
          <div className="category-container">
            <CategorySelect
              activeButton={this.state.activeButton}
              selectCategory={ this.selectCategory.bind(this) }
            />
          </div>
            <CategoryDisplay
              favorites ={this.state.favorites}
              selectedFavorites={ this.selectFavorite.bind(this)}
              presentCategory={ this.state.category }
              typeCategory={ this.state.categoryType }
            />
        </section>

      </div>
    );
  }
}


export default App;
