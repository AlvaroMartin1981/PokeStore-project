const ObtenerPokemon = async ()=>{
try {
    const response = await fetch ('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0')
    const data = await response.json()
    console.log(data)

} catch (error) {
    console.log(error)

}}
ObtenerPokemon()