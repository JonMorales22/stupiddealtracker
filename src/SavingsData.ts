interface SavingsData {
    title: string,
    description: string,
    price: PriceData
}

interface PriceData {
    originalPrice: number,
    newPrice: number,
    savings: number
}