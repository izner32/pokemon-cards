import Head from 'next/head'
import Image from 'next/image'
import Layout from '../components/Layout'
import styles from '../styles/Home.module.css'
import "bootstrap/dist/css/bootstrap.min.css";

export default function Home({pokemonData}) { // function below is implicitly being passed to the component here, thus we can access pokemonData
  	console.log('this works1');
	return (
      	<Layout>
			<h5 className="p-3 bg-dark text-light text-center">I know the images are wrong, but ...</h5>
			<h1 className="text-center">Pokedex</h1>
			<div className ="container">
				{pokemonData.map( (x,index) => (
					<>
						{console.log(x.img)}
						<li className= "container list-unstyled" key={index}>
							<div className="card d-flex mb-3 justify-content-center align-items-center col-12 col-sm-6 col-md-4 col-lg-3 float-start">
								<img className="" src={x.img} alt={x.name} width={42} height={42}/>
								<p>{x.name}</p>
								<span>{index+1}</span>
							</div>
						</li>
					</>
				))}
			</div>
      	</Layout>
  	)
}

// this function runs before the component above gets rendered, and its return value is automaticalyl getting passed as a props in component above 
// fetching data before build time, if we were to input fetching inside the home, it would fetch data everytime that function component renders 
// fetching data before build time, if we were to input fetching inside the home, it would fetch data everytime that function component renders 
export async function getStaticProps() {
	/*
	1. fetch pokemon api, get name and image
	2. return name and image of each pokemon
	*/

	// fetching pokemon data thru the api 
	const pokemon = await fetch("https://pokeapi.co/api/v2/pokemon?limit=150");
	const data = await pokemon.json(); // returns an array of pokemon

	// grab the info for each pokemon and the index for each pokemon
	const pokedex = data.results.map( (arrVal, key) => {
		const paddedKey = (("00" + key+1).slice(-3)); // key+1 because the images starts with 1 instead of 0
		const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${paddedKey}.png`;

		return {
			name:arrVal.name,
			img:image
		}
	})

	return {
		props: {
			pokemonData:pokedex
		}
	}
	
}