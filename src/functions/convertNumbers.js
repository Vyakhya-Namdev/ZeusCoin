export const coinObject = (setState, data) => {
  setState({
    id: data.id,
    symbol: data.symbol,
    name: data.name,
    image: data.image?.large || data.image, // normalize image
    current_price: data.market_data?.current_price?.usd || 'N/A',
    market_cap: data.market_data?.market_cap?.usd || 'N/A',
    total_volume: data.market_data?.total_volume?.usd || 'N/A',
    price_change_percentage_24h: data.market_data?.price_change_percentage_24h || 0,
    desc: data.description?.en || 'No description available.',
  });
};