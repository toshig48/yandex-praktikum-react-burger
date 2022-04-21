import PropTypes from 'prop-types';
export const bun= {key:'bun', name:'Булки'};
export const sauce = {key:'sauce', name:'Соусы'};
export const main= {key:'main', name:'Начинки'};
export const urlApi = "https://norma.nomoreparties.space/api/ingredients";

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