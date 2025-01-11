interface TotalPrice {
    price: number, 
    discount: number, 
    isInstallment: boolean, 
    months: number 
}

const totalPrice = ({ price, discount, isInstallment, months }: TotalPrice): number => {
    /*
        функция, рассчитывающая стоимость с учетом скидки и рассрочки 
        на заданное количество месяцев;
    */
    if (price < 0 || (discount < 0 && discount > 100) || months < 0) return -1 

    const discountPrice = price * (1 - discount / 100)
    if (!isInstallment) return discountPrice
    return discountPrice / months
};

const price = totalPrice({ 
    price: 100000, 
    discount: 25, 
    isInstallment: true, 
    months: 12 
} as TotalPrice);

console.log(price); // 6250