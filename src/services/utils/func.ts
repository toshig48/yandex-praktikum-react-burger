import moment from 'moment';
import 'moment/locale/ru'
import { Status } from '../constant';
import { TBurger, TBurgerGroupById } from '../types';
export const getDateStringForOrdersList = (date: Date): string => {
    moment.locale('ru');
    const now = new Date();
    const todayMoment = moment({
        year: now.getFullYear(),
        month: now.getMonth(),
        day: now.getDate()
    });
    const dateMoment = moment({
        year: date.getFullYear(),
        month: date.getMonth(),
        day: date.getDate()
    });
    const days = todayMoment.diff(dateMoment, 'days');
    let ret = "";
    if (days < 1) {
        ret = "Сегодня";
    }
    else {
        if (days < 2) {
            ret = "Вчера";
        }
        else {
            ret = `${Math.round(days)} ${getNoun(days, 'день', 'дня', 'дней')} назад`;
        }
    }
    return `${ret}, ${moment(date).format('HH:mm')}`;
}

function getNoun(number: number, one: string, two: string, five: string) {
    let n = Math.abs(number);
    n %= 100;
    if (n >= 5 && n <= 20) {
        return five;
    }
    n %= 10;
    if (n === 1) {
        return one;
    }
    if (n >= 2 && n <= 4) {
        return two;
    }
    return five;
}

export function getStatus(value: string): string {
    switch (value) {
        case Status.DONE:
            {
                return "Выполнен"
            }
        case Status.PENDING:
            {
                return "Готовиться"
            }
        case Status.CREATE:
            {
                return "Создан"
            }
        case Status.CANSEL:
            {
                return "Отменён"
            }
        default:
            {
                return value;
            }
    }
}

export function groupIngredientsById(array: Array<TBurger>): Array<TBurgerGroupById> {
    return array.reduce((result: Array<TBurgerGroupById>, currentValue: any) => {
        let index = result.findIndex(x => x.item === currentValue);

        if (index > -1) {
            result[index].count++;
        }
        else {
            result.push({ count: 1, item: currentValue });
        }
        return result;
    }, []);
};