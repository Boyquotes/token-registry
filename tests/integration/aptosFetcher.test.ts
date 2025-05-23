import AptosFetcher from '../../src/fetchers/aptos';

describe('aptosFetcher', () => {
  const rpc = process.env.APTOS_RPC;
  if (!rpc) throw new Error('APTOS_RPC env is missing');

  let fetcher: AptosFetcher;

  beforeEach(() => {
    fetcher = new AptosFetcher(rpc);
  });

  it('should return null if address is valid but not a token', async () => {
    const tokenInfo1 = await fetcher.fetch(
      '0xada35ada7e43e2ee1c39633ffccec38b76ce702b4efc2e60b50f63fbe4f710d5::apetos_token::ApetosCoin'
    );
    expect(tokenInfo1).toBe(null);

    const tokenInfo2 = await fetcher.fetch(
      '0x2ebb2ccac5e027a87fa0e2e5f656a3a4238d6a48d93ec9b610d570fc0aa0df13'
    );
    expect(tokenInfo2).toBe(null);
  });

  it('should return APT token', async () => {
    const address = '0x00001::aptos_coin::AptosCoin';
    const tokenInfo = await fetcher.fetch(address);
    expect(tokenInfo).not.toBeNull();
    expect(tokenInfo?.symbol).toBe('APT');
    expect(tokenInfo?.chainId).toBe(1);
    expect(tokenInfo?.decimals).toBe(8);
  });

  it('should return APE token', async () => {
    const address =
      '0xada35ada7e43e2ee1c39633ffccec38b76ce702b4efc2e60b50f63fbe4f710d8::apetos_token::ApetosCoin';
    const tokenInfo = await fetcher.fetch(address);
    expect(tokenInfo).not.toBeNull();
    expect(tokenInfo?.symbol).toBe('APE');
    expect(tokenInfo?.chainId).toBe(1);
    expect(tokenInfo?.decimals).toBe(8);
  });

  it('should return wUSDC token', async () => {
    const address =
      '0xf22bede237a07e121b56d91a491eb7bcdfd1f5907926a9e58338f964a01b17fa::asset::USDC';
    const tokenInfo = await fetcher.fetch(address);
    expect(tokenInfo).not.toBeNull();
    expect(tokenInfo?.logoURI).not.toBeUndefined();
    expect(tokenInfo?.symbol).toBe('zUSDC');
    expect(tokenInfo?.chainId).toBe(1);
    expect(tokenInfo?.decimals).toBe(6);
  });

  it('should return CELL token', async () => {
    const address =
      '0x2ebb2ccac5e027a87fa0e2e5f656a3a4238d6a48d93ec9b610d570fc0aa0df12';
    const tokenInfo = await fetcher.fetch(address);
    expect(tokenInfo).not.toBeNull();
    expect(tokenInfo?.symbol).toBe('CELL');
    expect(tokenInfo?.chainId).toBe(1);
    expect(tokenInfo?.decimals).toBe(8);
  });

  it('should return MEE token', async () => {
    const address =
      '0xe9c192ff55cffab3963c695cff6dbf9dad6aff2bb5ac19a6415cad26a81860d9::mee_coin::MeeCoin';
    const tokenInfo = await fetcher.fetch(address);
    expect(tokenInfo).not.toBeNull();
    expect(tokenInfo?.logoURI).not.toBeUndefined();
    expect(tokenInfo?.symbol).toBe('MEE');
    expect(tokenInfo?.chainId).toBe(1);
    expect(tokenInfo?.decimals).toBe(6);
  });
});
