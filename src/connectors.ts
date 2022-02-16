import { ConnectorConfig, ConnectorInit } from './types'
import initFrame from './connectors/ConnectorFrame'
import initInjected from './connectors/ConnectorInjected'
import initProvided from './connectors/ConnectorProvided'
import initTorus from './connectors/ConnectorTorus'
import initWalletConnect from './connectors/ConnectorWalletConnect'

export function getConnectors(
  initsOrConfigs: { [key: string]: ConnectorInit | ConnectorConfig } = {}
) {
  const connectors: {
    [key: string]: [ConnectorInit, ConnectorConfig | null]
  } = {
    frame: [initFrame, null],
    injected: [initInjected, null],
    provided: [initProvided, null],
    torus: [initTorus, null],
    walletconnect: [initWalletConnect, null],
  }

  for (const [id, initOrConfig] of Object.entries(initsOrConfigs)) {
    // If initOrConfig is a function, it is an initializer.
    if (typeof initOrConfig === 'function') {
      connectors[id] = [initOrConfig as ConnectorInit, null]
      continue
    }

    // Otherwise it is a config
    if (connectors[id]) {
      connectors[id][1] = initOrConfig as ConnectorConfig
    }
  }

  return connectors
}
