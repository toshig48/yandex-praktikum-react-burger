import PropTypes from 'prop-types';
export const INGREDIENT_BUN= {key:'bun', name:'Булки'};
export const INGREDIENT_SAUCE = {key:'sauce', name:'Соусы'};
export const INGREDIENT_MAIN= {key:'main', name:'Начинки'};
export const URL_API = "https://norma.nomoreparties.space/api";

export const burgerPropTypes = PropTypes.shape({
   _id: PropTypes.string.isRequired,
   name: PropTypes.string.isRequired,
   type: PropTypes.string.isRequired,
   proteins: PropTypes.number.isRequired,
   fat: PropTypes.number.isRequired,
   carbohydrates: PropTypes.number.isRequired,
   calories: PropTypes.number.isRequired,
   price: PropTypes.number.isRequired,
   image: PropTypes.string.isRequired,
   image_mobile: PropTypes.string.isRequired,
   image_large: PropTypes.string.isRequired,
 });