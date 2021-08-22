import React, { useContext } from 'react';
import RecipeAppContext from '../context/RecipeAppContext';

function RenderFoodVideo() {
  const { meal } = useContext(RecipeAppContext);
  const urlLink = meal.strYoutube;
  const youtubeVideoId = urlLink && urlLink.split('v=', 2)[1];
  const embeddedLink = `https://www.youtube.com/embed/${youtubeVideoId}`;
  const allowed = 'accelerometer; clipboard-write; encrypted-media; picture-in-picture';

  return (
    <div>
      <p className="recipe-details-title">Vídeo</p>
      <iframe
        data-testid="video"
        className="recipe-details-video"
        title={ meal.strMeal }
        src={ embeddedLink }
        width="360"
        height="180"
        frameBorder="0"
        allow={ allowed }
        allowFullScreen
      >
        {meal.strMeal}
      </iframe>
    </div>
  );
}

export default RenderFoodVideo;
