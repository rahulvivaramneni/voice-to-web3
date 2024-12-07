import { useAccount } from "wagmi";
import { FundButton, getOnrampBuyUrl } from "@coinbase/onchainkit/fund";
import { WalletDefault } from "@coinbase/onchainkit/wallet";

export function AddFunds() {
  const projectId = "eeaa2500-ba9b-4ffd-9fdb-70635b7da166";
  const { address } = useAccount();

  const onrampBuyUrl = getOnrampBuyUrl({
    projectId,
    addresses: { [address]: ["base"] },
    assets: ["USDC"],
    presetFiatAmount: 20,
    fiatCurrency: "USD",
  });

  return (
    <>
      {address ? <FundButton fundingUrl={onrampBuyUrl} /> : <WalletDefault />}
    </>
  );
}
