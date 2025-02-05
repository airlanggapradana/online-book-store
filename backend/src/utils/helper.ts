interface JWTPayload {
  id: string;
  email: string;
  username: string;
  role: string;
  iat: number;
  exp: number;
}

interface ValidationResult {
  valid: boolean;
  payload?: JWTPayload;
  error?: string;
}

/**
 * Validates only the expiration of a JWT token without checking the signature
 * @param token JWT token to validate
 * @returns ValidationResult indicating if the token is expired and the decoded payload
 */
export function validateTokenExpiration(token: string): ValidationResult {
  try {
    // Get the payload part of the token (second part)
    const [, payloadBase64] = token.split(".");

    if (!payloadBase64) {
      return {
        valid: false,
        error: "Invalid token format",
      };
    }

    // Decode the payload
    const payload: JWTPayload = JSON.parse(
      Buffer.from(payloadBase64, "base64url").toString()
    );

    // Check if token has expired
    const currentTimestamp = Math.floor(Date.now() / 1000);

    if (payload.exp && payload.exp < currentTimestamp) {
      return {
        valid: false,
        payload,
        error: "Token has expired",
      };
    }

    return {
      valid: true,
      payload,
    };
  } catch (error) {
    return {
      valid: false,
      error: error instanceof Error ? error.message : "Failed to decode token",
    };
  }
}
