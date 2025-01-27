/**
 * @description Converts an IP address from string format to an integer.
 * @param {Object} options - The options object.
 * @param {string} options.ip - The IP address in dot-decimal notation (e.g., "192.168.0.1").
 * @returns {number} The integer representation of the IP address.
 */
export const ipToInt = ({ ip }) => {
  return ip.split(".").reduce((acc, octet) => (acc << 8) + parseInt(octet, 10), 0)
}

/**
 * @description Checks if an IP address is within a specified range.
 * @param {Object} options - The options object.
 * @param {string} options.ip - The IP address to check in dot-decimal notation.
 * @param {string} options.rangeStart - The start of the IP range in dot-decimal notation.
 * @param {string} options.rangeEnd - The end of the IP range in dot-decimal notation.
 * @returns {boolean} `true` if the IP is within the range, `false` otherwise.
 */
export const isIpInRange = ({ ip, rangeStart, rangeEnd }) => {
  const ipInt = ipToInt({ ip })
  const startInt = ipToInt({ ip: rangeStart })
  const endInt = ipToInt({ ip: rangeEnd })

  return ipInt >= startInt && ipInt <= endInt
}
