import crypto from 'crypto';

/**
 * Hashes a password using the scrypt algorithm.
 * 
 * @param password The password to hash.
 * @return A promise that resolves to the hashed password.
 * @see https://nodejs.org/api/crypto.html#crypto_crypto_scryptsync_password_salt_keylen_options
 * @example  hashPassword('myPassword').then(console.log);
 *           Output => 3c8019f5790ec745560e1cca1b111e9e$fc5e783fbe034f89915461a478b0292e731b5363b8c876ac1e8a848abc0883a8
 */
export async function hashPassword(password: string): Promise<string> {
  // randomBytes generates a salt for us
  const salt = crypto.randomBytes(16).toString('hex');
  const hashedPassword = crypto.scryptSync(password, salt, 64).toString('hex');
  return [salt, hashedPassword].join('$');
}

/**
 * Verifies a password using the scrypt algorithm.
 *
 * @param password The passwrold to verify.
 * @param hashedPassword The hashed password to compare against.
 * @return A promise that resolves to true if the password matches, false otherwise.
 * @see https://nodejs.org/api/crypto.html#crypto_crypto_scryptsync_password_salt_keylen_options
 * @example const storedPasswordHash = '3c8019f5790ec745560e1cca1b111e9e$fc5e783fbe034f89915461a478b0292e731b5363b8c876ac1e8a848abc0883a8';
 *          verifyPassword('myPassword', storedPasswordHash).then(match => {
 *              console.log(match ? 'Password is correct' : 'Password is incorrect');
 *          });
 */
export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  const [salt, originalHash] = hashedPassword.split('$');
  const hash = crypto.scryptSync(password, salt, 64).toString('hex');
  return hash === originalHash;
}
