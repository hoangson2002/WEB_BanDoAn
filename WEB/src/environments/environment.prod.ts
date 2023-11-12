export const environment = {
  production: true,
  apiBaseUrl: 'https://todacollectionapi.ksmart.vn/',
  signalrCallUrl: 'https://todacollectionsignalling.ksmart.vn/ConnectionHub',
  urlSocKet: 'https://todacollectionmonitor.ksmart.vn:6685/',
  urlFileGhiAm: 'https://todacollectionmonitor.ksmart.vn:6685/taighiam/',
  peerConnectionConfig: {
    iceServers: [
      { urls: "stun:stun.voipbuster.com" },
    ]
  },
};
