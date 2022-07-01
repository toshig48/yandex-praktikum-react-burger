type TIngregient = {
    key: string;
    name: string;
}
export const INGREDIENT_BUN: TIngregient = { key: 'bun', name: 'Булки' };
export const INGREDIENT_SAUCE: TIngregient = { key: 'sauce', name: 'Соусы' };
export const INGREDIENT_MAIN: TIngregient = { key: 'main', name: 'Начинки' };
export const URL_API: string = "https://norma.nomoreparties.space/api";
export const URL_WS: string = "wss://norma.nomoreparties.space/orders";
export const FLAG_INGRIDIENT_SHOW_MODAL: string = "flagIngridientShowModal";