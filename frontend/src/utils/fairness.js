/**
 * Generate a cryptographic seed for game fairness
 */
export const generateGameSeed = () => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 15);
  const seed = `${timestamp}-${random}`;
  
  // Simple hash function (in production, use a proper crypto library)
  return btoa(seed).substring(0, 32);
};

/**
 * Verify game result using the seed
 */
export const verifyGameResult = (seed, options) => {
  // Convert seed to numeric value
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    const char = seed.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  
  // Use absolute value and modulo to select from options
  const index = Math.abs(hash) % options.length;
  return options[index];
};

/**
 * Validate that a game result matches the seed
 */
export const validateGameResult = (seed, result, options) => {
  const expectedResult = verifyGameResult(seed, options);
  return expectedResult === result;
};