export const isPlatformConnected = (persona, platform) => {
    const connectedToken = persona?.authTokens?.find((token) => token.platform === platform);
    return connectedToken && isTokenValid(connectedToken?.expiry);
  };

export const isTokenValid = (date) => {
    const expiryDate = new Date(date);
    const currentDate = new Date();
    return expiryDate > currentDate;
  }