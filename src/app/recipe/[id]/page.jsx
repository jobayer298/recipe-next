import React from 'react';
import data from "../../../../public/data/data.json";

const SingleRecipe = ({params}) => {
    const singleData = data.recipe.find(
      (item) => item.id == parseInt(params.id)
    );
    return (
        <div>
            recipe {singleData.title}
        </div>
    );
};

export default SingleRecipe;