import { JsonRpc } from 'eosjs';

const ENDPOINTS =
  process.env.REACT_APP_MAINNET === 'mainnet'
    ? [
        'https://wax.cryptolions.io',
        'https://api.waxsweden.org',
        'https://wax.greymass.com',
        'https://wax.pink.gg',
      ]
    : [
        'https://wax-testnet.eosphere.io',
        // https://testnet.waxsweden.org''
      ];
let rpc = new JsonRpc(ENDPOINTS[0], { fetch });

// const COLLECT_CONTRACT = 'collectwhale';
const ATOMIC_ASSETS_CONTRACT = 'atomicassets';
// const ATOMIC_PACKS_CONTRACT = 'atomicpacksx';

export const transferAction = ({ owner, from, to, asset_ids, memo }) => {
  return [
    {
      account: ATOMIC_ASSETS_CONTRACT,
      name: 'transfer',
      authorization: [
        {
          actor: owner,
          permission: 'active',
        },
      ],
      data: {
        from,
        to,
        asset_ids,
        memo,
      },
    },
  ];
};

//return isNewNetworkExist
const reinitializeRcp = () => {
  const nextEndpoint = ENDPOINTS[ENDPOINTS.indexOf(rpc.endpoint) + 1];

  if (!nextEndpoint) return null;

  rpc = new JsonRpc(nextEndpoint ? nextEndpoint : ENDPOINTS[0], { fetch });

  return !!nextEndpoint;
};

export const fetchRows = async ({
  contract,
  scope,
  table,
  limit,
  lowerBound = null,
  upperBound = null,
}) => {
  try {
    const config = {
      json: true,
      code: contract,
      scope,
      table,
      limit,
      lower_bound: lowerBound,
      upper_bound: upperBound,
    };

    if (!lowerBound) delete config['lower_bound'];

    if (!upperBound) delete config['upper_bound'];

    return await rpc.get_table_rows(config);
  } catch (e) {
    if (!e.message.includes('assertion failure')) {
      const isNewNetworkExist = reinitializeRcp();

      if (!isNewNetworkExist) throw new Error('NetworkError!');

      return await fetchRows({
        contract,
        scope,
        table,
        limit,
        lowerBound,
        upperBound,
      });
    } else {
      throw new Error(e.message);
    }
  }
};

export const getTableData = async ({ contract, scope, table }) => {
  const pageSize = 1000;
  let lowerBound = 0;
  let fetchMore = true;

  const assets = [];

  while (fetchMore) {
    // eslint-disable-next-line no-await-in-loop
    const { rows, more, next_key } = await fetchRows({
      contract,
      scope,
      table,
      limit: pageSize,
      lowerBound,
    });

    assets.push(...rows);

    if (more) lowerBound = next_key;
    else fetchMore = false;
  }

  return assets;
};

export const signTransaction = async ({
  activeUser,
  account,
  action,
  data,
}) => {
  await activeUser.signTransaction(
    {
      actions: [
        {
          account,
          name: action,
          authorization: [
            {
              actor: activeUser.accountName,
              permission: 'active',
            },
          ],
          data,
        },
      ],
    },
    {
      blocksBehind: 3,
      expireSeconds: 30,
    }
  );
};

export const signTransactions = async ({ activeUser, actions }) => {
  await activeUser.signTransaction(
    {
      actions: actions.map(({ account, action, data }) => {
        return {
          account,
          name: action,
          authorization: [
            {
              actor: activeUser.accountName,
              permission: 'active',
            },
          ],
          data,
        };
      }),
    },
    {
      blocksBehind: 3,
      expireSeconds: 30,
    }
  );
};
