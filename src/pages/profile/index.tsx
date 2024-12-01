import { useState, useEffect } from 'react';
import { get, ref } from 'firebase/database';
import useAuthStore from '../../store/Auth';
import { database } from '../../../firebase.config';
import { UserData } from '../../types/UserData';
import './profile.css';

function UserProfile() {
    const { user, isLoading, error } = useAuthStore();

    const [userData, setUserData] = useState<UserData | null>(null);
    const [economyData, setEconomyData] = useState<{
        lux: { 
            sentiment: number;
            volatility: number;
            initialSupply: number;
            currentSupply: number;
            weight: number;
        }
        nox: { 
            sentiment: number;
            volatility: number;
            initialSupply: number;
            currentSupply: number;
            weight: number;
        }
        vc: {
            sentiment: number;
            volatility: number;
            initialSupply: number;
            currentSupply: number;
            weight: number;
        }
    } | null>(null);

    const getSentimentEmoji = (sentiment: number) => {
        if (sentiment > 0.5) {
            return '😊';
        } else if (sentiment < 0.5) {
            return '☹️';
        } else {
            return '😐';
        }
    };

    const getSentimentColor = (sentiment: number) => {
        if (sentiment > 0.5) {
            return 'green';
        } else if (sentiment < 0.5) {
            return 'red';
        } else {
            return 'gray';
        }
    };

    const userRef = ref(database, 'users/' + user?.uid);
    const bankRef = ref(database, 'banks/' + user?.uid);
    const levelRef = ref(database, 'levels/' + user?.uid);
    const economyRef = ref(database, 'economy');

    useEffect(() => {
        const getUserData = async () => {
            const userSnapshot = await get(userRef);
            const bankSnapshot = await get(bankRef);
            const levelSnapshot = await get(levelRef);

            setUserData({
                username: userSnapshot.val()?.username,
                xp: levelSnapshot.val()?.xp,
                lux: bankSnapshot.val()?.lux,
                nox: bankSnapshot.val()?.nox,
            });
        };

        const getEconomyData = async () => {
            const economySnapshot = await get(economyRef);
            setEconomyData(economySnapshot.val());
        };

        if (user) {
            getUserData();
            getEconomyData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    if (!user) return <p>Please sign in.</p>;

    interface CurrencyData {
        sentiment: number;
        volatility: number;
        weight: number;
        currentSupply: number;
        initialSupply: number;
    }

    const calculateDynamicWeight = (currencyData: CurrencyData): number => {
        const sentimentFactor = currencyData.sentiment * 3;
        const volatilityFactor = currencyData.volatility * 2;
        const supplyRatio = currencyData.currentSupply / currencyData.initialSupply;
        const baseWeight = currencyData.weight * 10;

        const dynamicWeight = sentimentFactor + volatilityFactor - supplyRatio + baseWeight;

        const clampedDynamicWeight = Math.max(0.01, dynamicWeight);

        return clampedDynamicWeight;
    };

    const calculateSupplyRatio = (currencyData: CurrencyData) => {
        return (currencyData.currentSupply / currencyData.initialSupply).toFixed(2);
    };

    const calculateVCPrice = (currency: string) => {
        if (!economyData) return 'Loading...';

        const targetCurrency = currency === 'lux' ? economyData.lux : economyData.nox;

        if (!targetCurrency) return 'Loading...';

        const targetDynamicWeight = calculateDynamicWeight(targetCurrency);
        const vcDynamicWeight = calculateDynamicWeight(economyData.vc);

        const pricePerVC = (vcDynamicWeight / targetDynamicWeight).toFixed(2);

        return `${pricePerVC} VC`;
    };

    if (!userData || !economyData) return null;

    const lux = economyData?.lux;
    const nox = economyData?.nox;

    return (
        <div className="user-profile">
            <div className="user-info">
                <div className="profile-picture">
                    <img src={'https://ui-avatars.com/api/?name=John+Doeyy'} alt="Profile Picture" />
                    <button className="edit-button">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 1    
 1. 
github.com
MIT
github.com
 8-8 8 3.58 8 8-3.58 8-8 8zM12 15l4.59-4.58L17.54 10l-4.59-4.58L12 10.41z" />
                        </svg>
                    </button>
                </div>
                <h2>{userData?.username}</h2>
                <p>XP: {userData?.xp}</p>
                <div className="currency-details">
                    <p>Lux: {userData?.lux}</p>
                </div>
                <div className="currency-details">
                    <p>Nox: {userData?.nox}</p>
                </div>
            </div>
            <div className="currency-market">
                <h2>Currency Market</h2>
                <div className="currency-card">
                    <h3>Lux</h3>
                    <p>{calculateVCPrice('lux')}</p>
                    <div className="sentiment-indicator">
                        <span style={{ color: getSentimentColor(lux!.sentiment) }}>{getSentimentEmoji(lux!.sentiment)}</span>
                        <p>Sentiment: {lux!.sentiment}</p>
                    </div>
                    <div className="supply-indicator">
                        <p>Supply Ratio: {calculateSupplyRatio(lux)}</p>
                        <progress value={lux.currentSupply} max={lux.initialSupply}></progress>
                    </div>
                </div>
                <div className="currency-card">
                    <h3>Nox</h3>
                    <p>{calculateVCPrice('nox')}</p>
                    <div className="sentiment-indicator">
                        <span style={{ color: getSentimentColor(nox!.sentiment) }}>{getSentimentEmoji(nox!.sentiment)}</span>
                        <p>Sentiment: {nox!.sentiment}</p>
                    </div>
                    <div className="supply-indicator">
                        <p>Supply Ratio: {calculateSupplyRatio(nox)}</p>
                        <progress value={nox.currentSupply} max={nox.initialSupply}></progress>
                    </div>
                </div>
                {process.env.NODE_ENV === 'development' && ( // Display only in development mode
                    <div className="debug-info">
                        <h2>Debug Information</h2>
                        <pre>{JSON.stringify(economyData, null, 2)}</pre>
                    </div>
                )}
            </div>
        </div>
    );
}

export default UserProfile;