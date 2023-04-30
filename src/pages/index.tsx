import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AssetInfo, { AssetInfoProps } from '../components/AssetsInfo';
import AssetChart, { AssetChartData } from '../components/AssetChart';

const IndexPage = () => {
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;


  const [assetData, setAssetData] = useState<AssetInfoProps | null>(null);
  const [historicalData, setHistoricalData] = useState<AssetChartData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=MSFT&apikey=${API_KEY}`
        );

        const assetInfo = response.data['Global Quote'];

        const formattedAssetData: AssetInfoProps = {
          name: 'Microsoft Corporation', // Füge hier den passenden Vermögenswert-Namen ein
          symbol: assetInfo['01. symbol'],
          price: parseFloat(assetInfo['05. price']),
          volume: parseInt(assetInfo['06. volume']),
          marketCap: parseFloat(assetInfo['07. marketCap']),
        };

        setAssetData(formattedAssetData);
      } catch (error) {
        console.error('Fehler beim Abrufen der Vermögenswertinformationen:', error);
      }
    };

    const fetchHistoricalData = async () => {
      try {
        const symbol = 'MSFT';

        const historicalResponse = await axios.get(
          `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${symbol}&outputsize=compact&apikey=${API_KEY}`
        );
        const historicalData = historicalResponse.data['Time Series (Daily)'];

        const formattedData: AssetChartData[] = Object.entries(historicalData).map(([date, data]: [string, any]) => {
          return {
            date: date,
            price: parseFloat(data['5. adjusted close']),
          };
        });

        setHistoricalData(formattedData.slice(0, 30)); // Nur die letzten 30 Tage verwenden
      } catch (error) {
        console.error('Fehler beim Abrufen der historischen Preisdaten:', error);
      }
    };

    fetchData();
    fetchHistoricalData();
  }, []);

  return (
    <div>
      {assetData ? (
        <AssetInfo
          name={assetData.name}
          symbol={assetData.symbol}
          price={assetData.price}
          volume={assetData.volume}
          marketCap={assetData.marketCap}
        />
      ) : (
        <p>Loading...</p>
      )}

      {historicalData.length ? (
        <AssetChart data={historicalData} />
      ) : (
        <p>Loading historical data...</p>
      )}
    </div>
  );
};

export default IndexPage;
