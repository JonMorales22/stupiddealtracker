interface SavingsData {
    source: string,
    title: string,
    description: string,
    price: PriceData
}

interface PriceData {
    originalPrice: number,
    newPrice: number,
    savings: number
}