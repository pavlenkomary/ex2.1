import { useMemo } from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  WalletModalProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";
import "@solana/wallet-adapter-react-ui/styles.css";
import BuyLongButton from "../components/buy-long-button"; // Assuming this button is relevant for the Futures page
import ChartComponent from "../components/fut-chart";
import InfoBox from "../components/fut-info"; // Assuming this component might contain some additional information

function FuturesPage() {
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  const wallets = useMemo(
    () => [
      // Define specific/custom wallets here if necessary
    ],
    [network]
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          {/* Header with wallet button and documentation link */}
          <div style={{
            height: '60px',
            width: '100%',
            textAlign: 'right',
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}>
            <WalletMultiButton />
            <a
              href="https://ex2-0.gitbook.io/ex2.0-docs"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                marginLeft: '10px',
                padding: '10px 15px',
                backgroundColor: '#007BFF',
                color: 'white',
                borderRadius: '5px',
                textDecoration: 'none',
                fontWeight: 'bold',
              }}>
              Documentation
            </a>
          </div>

          <div style={{ height: '10px' }}></div>

          {/* Futures Information Box */}
          <div style={{
            border: '2px solid #ccc',
            borderRadius: '10px',
            padding: '20px',
            backgroundColor: '#0e1a1e',
            width: '100%', // Use full width
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(6, 1fr)',
              gap: '10px',
              width: '100%',
              marginBottom: '10px',
            }}>
              {/* Column Headers */}
              <div style={{ color: '#fff', fontWeight: 'bold', textAlign: 'center' }}>GPUZ4</div>
              <div style={{ color: '#fff', fontWeight: 'bold', textAlign: 'center' }}>Mark</div>
              <div style={{ color: '#fff', fontWeight: 'bold', textAlign: 'center' }}>Oracle</div>
              <div style={{ color: '#fff', fontWeight: 'bold', textAlign: 'center' }}>24h Change</div>
              <div style={{ color: '#fff', fontWeight: 'bold', textAlign: 'center' }}>24h Volume</div>
              <div style={{ color: '#fff', fontWeight: 'bold', textAlign: 'center' }}>Open Interest</div>
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(6, 1fr)',
              gap: '10px',
              width: '100%',
            }}>
              {/* Corresponding Values */}
              <div style={{ color: '#fff', textAlign: 'center' }}> </div>
              <div style={{ color: '#fff', textAlign: 'center' }}>25.00</div>
              <div style={{ color: '#fff', textAlign: 'center' }}>-1.1 / -0.05%</div>
              <div style={{ color: '#fff', textAlign: 'center' }}>$71,854,880.67</div>
              <div style={{ color: '#fff', textAlign: 'center' }}>$219,985,215.56</div>
              <div style={{ color: '#fff', textAlign: 'center' }}>0.0013%</div>
            </div>
          </div>

          <div style={{ height: '10px' }}></div>

          {/* Chart Component */}
          <ChartComponent />

          {/* Buy Long Button (if applicable for Futures) */}
          <div style={{ marginTop: '20px', textAlign: 'center' }}>
            <BuyLongButton />
          </div>
          
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default FuturesPage;

