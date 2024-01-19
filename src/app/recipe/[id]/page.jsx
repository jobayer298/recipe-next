const getData = async(params) =>{
  const response = await fetch(`https://recipe-server-wine.vercel.app/recipe/${params.id}`)
  return response.json();
}

const SingleRecipe = async({ params }) => {
  const data = await getData(params)
  console.log(data);
  return <div>{data.title}</div>;
};

export default SingleRecipe;
