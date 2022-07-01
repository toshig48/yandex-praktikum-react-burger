import moment from 'moment';
import 'moment/locale/ru'
export const GetDateStringForOrdersList = (dateStr: string): string => {
    moment.locale('ru');
    const now = new Date();
    const date = new Date(dateStr);
    const days = Math.abs(Number(now) - Number(date)) / (3600 * 1000 * 24);
    let ret = "";
    if (days <= 1) {
        ret = "Сегодня";
    }
    else {
        if (days <= 2) {
            ret = "Вчера";
        }
        else {
            ret = `${days} дней назад`;
        }
    }
    //${moment(date).fromNow()}
    return `${ret}, ${moment(date).format('HH:mm')}`;
}