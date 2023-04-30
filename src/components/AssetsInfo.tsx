import React from 'react';

interface AssetInfoProps {
  name: string;
  symbol: string;
  price: number;
  volume: number;
  marketCap: number;
}

const AssetInfo: React.FC<AssetInfoProps> = ({ name, symbol, price, volume, marketCap }) => {
  return (
    <div className="asset-info">
      <h2>{name} ({symbol})</h2>
      <p>Preis: ${price.toFixed(2)}</p>
      <p>Handelsvolumen: ${volume.toLocaleString()}</p>
      <p>Marktkapitalisierung: ${marketCap.toLocaleString()}</p>
    </div>
  );
};

export default AssetInfo;
